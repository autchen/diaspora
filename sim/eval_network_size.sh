
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered0.graphml -m vanila -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/shorter
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered.graphml -m vanila -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/short
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered1.graphml -m vanila -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/medium
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered2.graphml -m vanila -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/long

~/Python27/bin/python run.py -g data/diaspora/facebook-clustered0.graphml -m LRU -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/shorter
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered.graphml -m LRU  -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/short
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered1.graphml -m LRU -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/medium
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered2.graphml -m LRU -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/long

~/Python27/bin/python run.py -g data/diaspora/facebook-clustered0.graphml -m popularity -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/shorter
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered.graphml -m popularity  -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/short
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered1.graphml -m popularity -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/medium
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered2.graphml -m popularity -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/long

~/Python27/bin/python run.py -g data/diaspora/facebook-clustered0.graphml -m podpopularity -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/shorter
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered.graphml -m podpopularity  -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/short
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered1.graphml -m podpopularity -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/medium
~/Python27/bin/python run.py -g data/diaspora/facebook-clustered2.graphml -m podpopularity -x 200 -i 5 -c common_friend -p 10000 -o data/diaspora/long
