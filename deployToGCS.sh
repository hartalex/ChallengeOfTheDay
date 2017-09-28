#!/bin/bash

if [[ $TRAVIS_BRANCH == 'prod' ]]; then
  openssl aes-256-cbc -K $encrypted_0d5a066bcda1_key -iv $encrypted_0d5a066bcda1_iv -in client-secret.json.enc -out client-secret.json -d;
  if [ ! -d ${HOME}/google-cloud-sdk ]; then
    rm -rf $HOME/google-cloud-sdk;
    export CLOUDSDK_CORE_DISABLE_PROMPTS=1;
    curl https://sdk.cloud.google.com | bash;
  fi;
  gcloud auth activate-service-account --key-file client-secret.json;
  docker build -t gcr.io/hartonline-cloud/challenge_of_the_day:$TRAVIS_BRANCH-$TRAVIS_TAG-$TRAVIS_COMMIT .;
  gcloud docker -- push gcr.io/hartonline-cloud/challenge_of_the_day:$TRAVIS_BRANCH-$TRAVIS_TAG-$TRAVIS_COMMIT;
else
  echo "Branch not allowed to push to cloud repo"
fi
