
import networkx as nx
import json
import random as rd
import cache

NODES = 0
DISTS = 1
CACHE = 2

class Simulator:
    """Simulator that coordinate distributed system simulation"""
    def __init__(self, graph, cache):
        self.graph = graph
        self.pods = {}
        self.build_pods(cache)
        self.methods = {"vanila": self.vanila_update, "LRU": self.lru_update, \
                        "popularity": self.popularity_update,
                        "podpopularity": self.podpopularity_update}
        self.criterion = {"common_friend": self.cm_score, \
                          "enfluence": self.ef_score}
        self.latency = 0
        self.volume = 0
        self.cycle = 0
        self.update = self.vanila_update
        self.score = self.cm_score
        self.recommend = self.just_recommend
        self.toppod = 0

    def enableTopPod(self, op):
        """docstring for enableTopPod"""
        if op == 0:
            self.recommend = self.just_recommend
        else:
            self.recommend = self.toppod_recommend
            self.toppod = op

    def resetCache(self, size):
        for pod in self.pods.values():
            pod[CACHE] = cache.Cache(size)

    def build_pods(self, size):
        """build the pods from graph modularity classes"""

        G = self.graph
        pods = self.pods

        # build pods and assign nodes to them
        for node in G.nodes():
            pod = G.node[node]['Modularity Class']
            pods.setdefault(pod, [set(), {}, None])
            pods[pod][NODES].add(node)

        # assign inter-pod distances based on association
        for pod1 in pods.values():
            for pod2 in pods:
                pod1[DISTS][pod2] = self.calc_distance(pod1, pods[pod2])

        # pod local cache
        for pod in pods.values():
            pod[CACHE] = cache.Cache(size)


    def calc_distance(self, pod1, pod2):
        """emulate the distance between two pods, the higher proportion of """
        """users have connection to each other, the smaller the distance"""
        
        cnt = 0
        for node in pod1[NODES]:
            for nn in pod2[NODES]:
                if self.graph.has_edge(node, nn):
                    cnt += 1
                    break
        # in case no connection
        if cnt == 0:
            return 100.0
        prop = 1.0 * cnt / len(pod1[NODES])

        cnt = 0
        for node in pod2[NODES]:
            for nn in pod1[NODES]:
                if self.graph.has_edge(node, nn):
                    cnt += 1
                    break
        prop += 1.0 * cnt / len(pod2[NODES])

        return min(2.0 / prop, 100.0)

    def find_rank(self, rslt, node):
        if node not in rslt:
            return 0
        return rslt.index(node) + 1

    def one_cycle(self, method, criterion):
        """Perform one cycle of friend recommendation simulation"""

        G = self.graph
        pods = self.pods

        # select a random edge to remove
        edge = rd.choice(G.edges())
        sel = rd.randint(0, 1)
        src, dst = edge[sel], edge[sel ^ 1]
        G.remove_edge(src, dst)

        # recommendation
        self.volume = 0
        self.latency = 0
        self.update = self.methods[method]
        self.score = self.criterion[criterion]
        rslt = self.recommend(src)
        
        # account the performance
        good = 0.0
        rank1 = self.find_rank(rslt, dst)
        if rank1 > 0 and rank1 < 100:
            good += 0.5

        # recommend again reversely
        rslt = self.recommend(dst)
        rank2 = self.find_rank(rslt, src)
        if rank2 > 0 and rank2 < 100:
            good += 0.5

        if rank1 > 0 and rank2 > 0:
            rank = 1.0 * (rank1 + rank2) / 2
        else:
            rank = None

        # restore the edge
        G.add_edge(src, dst)

        self.cycle += 1
        return {"rank": rank, "volume": (1.0 * self.volume / 2), \
                "latency": (self.latency / 2), "good": good}

    def get_friends(self, pod, friend):
        ffl = self.graph.neighbors(friend)
        fp = self.graph.node[friend]["Modularity Class"]
        if fp == pod:
            return ffl
        latency = self.pods[pod][DISTS][fp] * 10
        latency = rd.gauss(latency, latency * 0.3)
        self.latency = max(self.latency, latency)
        self.volume += len(ffl)
        return ffl

    def just_recommend(self, src):
        """baseline recommendation method"""
        
        G = self.graph
        pod = G.node[src]['Modularity Class']
        pode = self.pods[pod]
        fl = G.neighbors(src)
        rslt = {}

        # iterate the friends
        for friend in fl:
            # if already in the cache
            if pode[CACHE].cached(friend):
                ffl = G.neighbors(friend)
            # not cached or local
            else:
                ffl = self.get_friends(pod, friend)
            for fr in ffl:
                if G.has_edge(src, fr) is False:
                    rslt.setdefault(fr, 0.0)
                    rslt[fr] += self.score(len(ffl))
            # update the cache if remote
            if pod != G.node[friend]['Modularity Class']:
                self.update(pod, friend)

        # sort the recommendations
        rslt = sorted(rslt.keys(), key = lambda x: rslt[x])
        return rslt

    def toppod_recommend(self, src):
        """only consider important pods"""
        
        G = self.graph
        pod = G.node[src]['Modularity Class']
        pode = self.pods[pod]
        fl = G.neighbors(src)
        rslt = {}

        # sort the friends based on their pod distance
        fl = sorted(fl, key = \
                lambda x: pode[DISTS][G.node[x]['Modularity Class']])
        podcnt = set()

        # iterate the friends
        for friend in fl:
            # if already in the cache
            if pode[CACHE].cached(friend):
                ffl = G.neighbors(friend)
            # not cached or local
            else:
                ffl = self.get_friends(pod, friend)
            for fr in ffl:
                if G.has_edge(src, fr) is False:
                    rslt.setdefault(fr, 0.0)
                    rslt[fr] += self.score(len(ffl))
            # update the cache if remote
            if pod != G.node[friend]['Modularity Class']:
                self.update(pod, friend)

            # increment the podcnt
            podcnt.add(G.node[friend]['Modularity Class'])
            if len(podcnt) > self.toppod:
                break

        # sort the recommendations
        rslt = sorted(rslt.keys(), key = lambda x: rslt[x])
        return rslt

    def vanila_update(self, pod, friend):
        pass

    def lru_update(self, pod, friend):
        self.pods[pod][CACHE].update(friend, self.cycle)

    def popularity_update(self, pod, friend):
        pode = self.pods[pod]
        ss = pode[CACHE].score(friend)
        if ss is None:
            ss = 0
            for node in pode[NODES]:
                if self.graph.has_edge(node, friend):
                    ss += 1
        pode[CACHE].update(friend, ss)

    def podpopularity_update(self, pod, friend):
        pode = self.pods[pod]
        ss = pode[CACHE].score(friend)
        if ss is None:
            ss = 0
            for node in pode[NODES]:
                if G.has_edge(node, friend):
                    ss += 1
            fp = self.graph.node[friend]["Modularity Class"]
            ss = (1.0 * ss / len(pode[NODES])) * (1.0 / pode[DISTS][fp])
        pode[CACHE].update(friend, ss)

    def cm_score(self, lenffl):
        return 1.0

    def ef_score(self, lenffl):
        return 1.0 / lenffl

