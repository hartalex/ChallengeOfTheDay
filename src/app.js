const config = require('./config')
const themes = require('./themes')
const adjectives = require('./adjectives')
const themeManager = require('./themeManager')(config.themeTimeout)
const historyManager = require('./historyManager')(
  config.historyFile,
  config.historyMax
)
const slackManager = require('./slackManager')(config.slackUrl)

const twitterManager = require('./twitterManager')(
  config.twitter.consumerKey,
  config.twitter.consumerSecret,
  config.twitter.accessToken,
  config.twitter.accessTokenSecret
)

module.exports = async function() {
  if (config.slackUrl === '') {
    console.error('Slack URL is not defined in config.js')
    process.exit(1)
  }
  await historyManager
    .loadHistory()
    .then(function(history) {
      // Choose a theme
      themeManager
        .chooseTheme(adjectives, themes, history)
        .then(slackManager.slackPost)
        .then(twitterManager.twitterPost)
        .then(function(theme) {
          return new Promise(function(resolve) {
            console.log(`Chosen theme is ${theme}`)
            // Update and save history
            historyManager
              .addHistory(theme, history)
              .then(historyManager.saveHistory(history))
              .then(() => {
                console.log('Done')
                resolve()
              })
          })
        })
        .catch(function(error) {
          console.error(error)
          throw error
        })
    })
    .catch(function(error) {
      // Handle errors
      console.error(error)
      process.exit(1)
    })
}
