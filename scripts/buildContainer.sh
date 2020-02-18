#!/bin/bash
set -o nounset
set -o errexit
set -o pipefail
npm run build
docker build --build-arg COMMIT=$TRAVIS_COMMIT -t gcr.io/hartonline-cloud/challenge-of-the-day:$TRAVIS_COMMIT .;
gcloud docker -- push gcr.io/hartonline-cloud/challenge-of-the-day:$TRAVIS_COMMIT;
