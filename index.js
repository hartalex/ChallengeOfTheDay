const config = require('./config')
const themes = require('./src/themes')
const adjectives = require('./src/adjectives')
const themeManager = require('./src/themeManager')(config.themeTimeout)
const historyManager = require('./src/historyManager')(config.historyFile, config.historyMax)
const slackManager = require('./src/slackManager')(config.slackUrl)

const twitterManager = require('./src/twitterManager')(
  config.twitter.consumerKey, config.twitter.consumerSecret,
  config.twitter.accessToken, config.twitter.accessTokenSecret)

if (config.slackUrl === '') {
  console.error('Slack URL is not defined in config.js')
  process.exit(1)
}
historyManager.LoadHistory().then(function (history) {
  // Choose a theme
  themeManager.chooseTheme(adjectives, themes, history)
    .then(slackManager.SlackPost)
    .then(twitterManager.TwitterPost)
    .then(function (theme) {
    // Update and save history
      historyManager.AddHistory(theme, history).then(historyManager.SaveHistory(history))
    })
}).catch(function (error) {
  // handle errors
  console.error(error)
  process.exit(1)
})
