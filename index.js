const config = require('./config')

if (config.slackUrl === '') {
  console.err('Slack URL is not defined in config.js')
}
