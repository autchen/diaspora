
import heapq as hq

class Cache:
    """cache that accept diversified scoring factor"""
    def __init__(self, size):
        self.size = size
        self.bank = {}
        self.heap = []
        self.scores = {}

    def cached(self, item):
        if item in self.bank:
            return True
        return False

    def update(self, item, score):
        if item in self.bank:
            self.bank[item][0] = score
        elif len(self.bank) < self.size:
            self.bank[item] = [score, item]
            hq.heappush(self.heap, self.bank[item])
        elif score >= self.heap[0][0]:
            s, i = hq.heappop(self.heap)
            self.bank.pop(i)
            self.bank[item] = [score, item]
            hq.heappush(self.heap, self.bank[item])
        self.scores[item] = score

    def score(self, item):
        if item in self.scores:
            return self.scores[item]
        return None





        
