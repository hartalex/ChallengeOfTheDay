const config = require('./config')
const themes = require('./src/themes')
const adjectives = require('./src/adjectives')
const themeManager = require('./src/themeManager')(config.themeTimeout)
const historyManager = require('./src/historyManager')(
  config.historyFile,
  config.historyMax
)
const slackManager = require('./src/slackManager')(config.slackUrl)

const twitterManager = require('./src/twitterManager')(
  config.twitter.consumerKey,
  config.twitter.consumerSecret,
  config.twitter.accessToken,
  config.twitter.accessTokenSecret
)

if (config.slackUrl === '') {
  console.error('Slack URL is not defined in config.js')
  process.exit(1)
}
historyManager
  .loadHistory()
  .then(function(history) {
    // Choose a theme
    themeManager
      .chooseTheme(adjectives, themes, history)
      .then(slackManager.slackPost)
      .then(twitterManager.twitterPost)
      .then(function(theme) {
        // Update and save history
        historyManager
          .addHistory(theme, history)
          .then(historyManager.saveHistory(history))
      })
      .catch(function(error) {
        throw error
      })
  })
  .catch(function(error) {
    // Handle errors
    console.error(error)
    process.exit(1)
  })
