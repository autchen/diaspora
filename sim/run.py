
import argparse
import json
import os
import networkx as nx
import simulator as sm
import random as rd

def load_clusters(file_name):
    """Load the partition graph generated by Gephi"""
    graph = nx.read_graphml(file_name)
    return graph

def simulate(params, sim):
    volume = []
    latency = []
    rank = []
    good = []

    # start simulation
    criterion = params['criterion']
    method = params['method']
    cycles = int(params['pass'])
    for i in range(cycles):
        rslt = sim.one_cycle(method, criterion)
        volume.append(rslt['volume'])
        latency.append(rslt['latency'])
        if rslt['rank'] is not None:
            rank.append(rslt['rank'])
        good.append(rslt['good'])
        if i % 1000 == 0:
            print str(i) + '/' + str(cycles)

    # store the result
    result = {'volume': sum(volume) / len(volume), \
              'latency': sum(latency) / len(latency), \
              'rank': sum(rank) / len(rank),
              'good': sum(good) / len(good)}

    return result

def run_a_point(params, sim, cache, important):
    sim.enableTopPod(important)
    sim.resetCache(cache)

    # random seed
    rd.seed(12345679)
    print "Start simulation at cache = " + str(cache) + ' pods = ' \
            + str(important)
    results = simulate(params, sim)

    return results

def main(params):
    # load graph and build pod model
    print "Load clustered graph ..."
    graph = load_clusters(params['graphml'])
    print "Build pods ..."
    sim = sm.Simulator(graph, 10)

    cache_sizes = params['cache']
    st = cache_sizes.split(',')
    if len(st) == 1:
        cache_sizes = [int(st[0])]
    elif len(st) == 3:
        cache_sizes = range(int(st[0]), int(st[1]), int(st[2]))
    else:
        print "usage --cache START,END,STEP"
        exit()

    important_pods = params['important']
    st = important_pods.split(',')
    if len(st) == 1:
        important_pods = [int(st[0])]
    elif len(st) == 3:
        important_pods = range(int(st[0]), int(st[1]), int(st[2]))
    else:
        print "usage --important START,END,STEP"
        exit()

    results = []
    for imp in important_pods:
        for size in cache_sizes:
            result = run_a_point(params, sim, size, imp)
            results.append(result)

    output = {'params': params, 'cache_sizes': cache_sizes, \
              'important_pods': important_pods, 'results': results}

    # # output the results
    outpath = os.path.join(params['output'] + '_' + params['method'] + '_' + \
                           params['cache'] + '_' + params['important'] + '_' + \
                           params['criterion'] + '_' + str(len(graph.nodes())) \
                           + '.json')
    json.dump(output, open(outpath, 'w'))

if __name__ == '__main__':
    ps = argparse.ArgumentParser()
    ps.add_argument('-g', '--graphml', dest = 'graphml', \
                    default = 'data/diaspora/facebook-clustered.graphml', \
                    help = 'input clustered graphml path')
    ps.add_argument('-m', '--method', dest = 'method', \
                    default = 'vanila', help = 'score calculation method')
    ps.add_argument('-c', '--criterion', dest = 'criterion', \
                    default = 'common_friend', \
                    help = 'common_friend/enfluence')
    ps.add_argument('-x', '--cache', dest = 'cache', \
                    default = '20', help = 'size of pod local cache')
    ps.add_argument('-i', '--important', dest = 'important', \
                    default = '0', help = 'consider only important pods')
    ps.add_argument('-p', '--pass', dest = 'pass', \
                    default = '3', \
                    help = 'number of simulation passes')
    ps.add_argument('-o', '--output', dest = 'output', \
                    default = 'data/diaspora/output', \
                    help = 'output file prefix')
    args = ps.parse_args()
    params = vars(args)
    print json.dumps(params, indent = 4)
    main(params)
