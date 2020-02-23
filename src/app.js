import logger from 'winston'
import config from './config'
import themes from './themes'
import adjectives from './adjectives'
import themeManagerDep from './themeManager'
import historyManagerDep from './historyManager'
import slackManagerDep from './slackManager'
import twitterManagerDep from './twitterManager'

// Configure Logging
logger.configure({
  level: 'debug',
  format: logger.format.simple(),
  transports: [new logger.transports.Console()]
})

/**
 * The entry point of the application.
 *
 * @returns {undefined}
 */
export default async function() {
  try {
    const slackManager = slackManagerDep(config.slackUrl)
    const themeManager = themeManagerDep(config.themeTimeout)
    const historyManager = historyManagerDep(
      config.historyFile,
      config.historyMax
    )
    const twitterManager = twitterManagerDep(
      config.twitter.consumerKey,
      config.twitter.consumerSecret,
      config.twitter.accessToken,
      config.twitter.accessTokenSecret
    )
    const history = await historyManager.loadHistory()
    // Choose a theme
    const theme = await themeManager.chooseTheme(adjectives, themes, history)
    logger.info(`Chosen theme is ${theme}`)
    // Post to Slack
    await slackManager.slackPost(theme)
    // Post to Twitter
    await twitterManager.twitterPost(theme)
    // Update and save history
    await historyManager.addHistory(theme, history)
    await historyManager.saveHistory(history)
    logger.debug('Done')
  } catch (error) {
    logger.error(error)
  }
}
