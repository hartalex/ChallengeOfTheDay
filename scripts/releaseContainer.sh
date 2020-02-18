#!/bin/bash
set -o nounset
set -o errexit
set -o pipefail
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sed -i "s/(TRAVIS_COMMIT)/$TRAVIS_COMMIT/g" kube.conf.json
./kubectl apply -f kube.conf.json
