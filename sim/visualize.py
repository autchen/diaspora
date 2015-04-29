
import matplotlib
matplotlib.use('PDF')                                                            
import matplotlib.pyplot as plt                                                  
from matplotlib.backends.backend_pdf import PdfPages                             

import argparse
import json
import glob
import os

def visualize_params(path, target):
    # output pdf file
    outpath = os.path.join(path + target + '.pdf')
    pp = PdfPages(outpath)
    print outpath

    # iterate all json output
    for ff in list(glob.glob(path + '*.json')):
        record = json.loads(open(ff, 'r').read())

        # assume the evaluated variable has multiple values
        if len(record[target]) <= 1:
            continue
        print 'processing file ' + ff
        results = record['results']
        data = {}

        # append data to the arraries
        for result in results:
            for name in result:
                data.setdefault(name, [])
                data[name].append(result[name])
        num_figures = len(data)

        # draw the lines
        for i, name in enumerate(data):
            plt.figure(i + 1)
            plt.hold(True)
            plt.plot(record[target], data[name], \
                    label = record['params']['method'] + ',' + \
                    record['params']['criterion'], linewidth = 2)

    # save figures
    for i in range(num_figures):
        plt.figure(i + 1)
        plt.grid()
        plt.legend(loc = 'best')
        plt.xlabel(target)
        plt.ylabel(data.keys()[i])
        plt.savefig(pp, format = 'pdf')
    pp.close()

def visualize_network(path):
    # output pdf file
    outpath = os.path.join(path + 'network.pdf')
    pp = PdfPages(outpath)
    print outpath

    mdata = {}

    # iterate all json output
    for ff in list(glob.glob(path + '*.json')):
        record = json.loads(open(ff, 'r').read())
        if len(record['cache_sizes']) > 1 or len(record['important_pods']) > 1:
            continue
        print 'processing file ' + ff

        # assume the naming convention
        net_size = int(ff.split('.')[0].split('_')[-1])
        label = record['params']['method'] + ',' + \
                record['params']['criterion']
        mdata.setdefault(label, ([], {}))
        data = mdata[label]

        result = record['results'][0]
        for name in result:
            data[1].setdefault(name, [])
            data[1][name].append(result[name])
        data[0].append(net_size)
        num_figures = len(data[1])

    # for each configuration
    for label in mdata:
        xxx = mdata[label][0]
        data = mdata[label][1]

        # sort the network size
        perm = sorted(xrange(len(xxx)), key = lambda x: xxx[x])
        xxx = [xxx[x] for x in perm]

        # draw the lines
        for i, name in enumerate(data):
            data[name] = [data[name][x] for x in perm]
            plt.figure(i + 1)
            plt.hold(True)
            plt.plot(xxx, data[name], label = label, linewidth = 2)

    # save figures
    for i in range(num_figures):
        plt.figure(i + 1)
        plt.grid()
        plt.legend(loc = 'best')
        plt.xlabel('network sizes')
        plt.ylabel(data.keys()[i])
        plt.savefig(pp, format = 'pdf')
    pp.close()

def main(params):
    if params['eval'] == 'network':
        visualize_network(params['path'])
    else:
        visualize_params(params['path'], params['eval'])

if __name__ == '__main__':
    ps = argparse.ArgumentParser()
    ps.add_argument('-e', '--eval', dest = 'eval', \
                    default = 'cache_sizes', \
                    help = 'which variable for the x-axis')
    ps.add_argument('-p', '--path', dest = 'path', \
                    default = 'data/diaspora/', \
                    help = 'path for read and write files')
    args = ps.parse_args()
    params = vars(args)
    print json.dumps(params, indent = 4)
    main(params)

