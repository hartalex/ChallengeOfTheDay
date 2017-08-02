const config = require('./config')
const themes = require('./src/themes')
const themeManager = require('./src/themeManager')
const historyManager = require('./src/historyManager')(config.historyFile, config.historyMax)
const slackManager = require('./src/slackManager')(config.slackUrl)

if (config.slackUrl === '') {
  console.error('Slack URL is not defined in config.js')
  process.exit(1)
}
historyManager.LoadHistory().then(function (history) {
  // Choose a theme
  themeManager(themes, history).then(
    // Post the theme to slack
    slackManager.SlackPost
  ).then(function (theme) {
    // Update and save history
    historyManager.AddHistory(theme, history).then(historyManager.SaveHistory(history))
  })
}).catch(function (error) {
  // handle errors
  console.error(error)
  process.exit(1)
})
