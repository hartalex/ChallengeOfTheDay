#!/bin/bash
set -o nounset
set -o errexit
set -o pipefail
npm run lint
npm run coverage
npx codeclimate-test-reporter < coverage/lcov.info
