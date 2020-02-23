#!/bin/bash
set -o nounset
set -o errexit
set -o pipefail
export slackUrl="slackUrl"
export twitterConsumerKey="ckey"
export twitterConsumerSecret="csec"
export twitterAccessToken="at"
export twitterAccessTokenSecret="atsec"
npm run lint
npm run coverage
npx codeclimate-test-reporter < coverage/lcov.info
