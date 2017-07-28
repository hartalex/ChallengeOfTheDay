const config = require('./config')

if (config.slackUrl === '') {
  console.log('Slack URL is not defined in config.js')
}
