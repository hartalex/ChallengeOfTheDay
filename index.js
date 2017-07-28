const config = require('./config')
const themeManager = require('./src/themeManager')

if (config.slackUrl === '') {
  console.error('Slack URL is not defined in config.js')
  process.exit(1)
}

themeManager.then(function (data) {
  console.log('Todays Theme is ' + data)
}).catch(function (error) {
  console.error(error)
  process.exit(1)
})

// 1. Get The Theme of the Day
//   On failure notify someone.
// 2. Post Theme in Slack
//   On failure notify someone.
