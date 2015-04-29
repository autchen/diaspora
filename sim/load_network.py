
import argparse
import json
import networkx as nx
import matplotlib.pyplot as plt

def save_graph(graph, file_name):
    """draw the graph to see what it looks like"""

    plt.figure(num = None, figsize = (20, 20), dpi = 80)
    plt.axis('off')
    fig = plt.figure(1)
    pos = nx.spring_layout(graph)
    nx.draw_networkx_nodes(graph, pos)
    nx.draw_networkx_edges(graph, pos)
    cut = 1.0
    xmax = cut * max(xx for xx, yy in pos.values())
    ymax = cut * max(yy for xx, yy in pos.values())
    plt.xlim(0, xmax)
    plt.ylim(0, ymax)
    plt.savefig(file_name, bbox_inches = 'tight')
    del fig

def load_network(dataset):
    """Load the data file into a networkx object"""

    graph = nx.Graph()
    data = open(dataset, 'r')
    for line in data:
        # assumption on file format: src_node \t dest_node \t whatever ... \n
        st = line.split('\t')
        n1, n2 = int(st[0]), int(st[1])
        graph.add_node(n1)
        graph.add_node(n2)
        graph.add_edge(n1, n2)

    # remove the node with few neighbors
    d = params['degree']
    graph.remove_nodes_from([node for node in graph.nodes() \
                            if nx.degree(graph, node) < d])

    # second filter removing the orphans
    graph.remove_nodes_from([node for node in graph.nodes() \
                            if nx.degree(graph, node) == 0])

    # outsource the community detection to Gephi
    # https://gephi.github.io/
    nx.write_graphml(graph, params['graphml'])

def main(params):
    load_network(params['dataset'])

if __name__ == '__main__':
    ps = argparse.ArgumentParser()
    ps.add_argument('-d', '--dataset', dest = 'dataset', \
                    default = 'data/diaspora/facebook-links-short.txt', \
                    help = 'path to dataset file')
    ps.add_argument('-x', '--graphml', dest = 'graphml', \
                    default = 'data/diaspora/facebook.graphml', \
                    help = 'output graphml path')
    ps.add_argument('-g', '--degree', dest = 'degree', default = 5, \
                    help = 'threshold that remove nodes with few friends')
    args = ps.parse_args()
    params = vars(args)
    print json.dumps(params, indent = 4)
    main(params)
