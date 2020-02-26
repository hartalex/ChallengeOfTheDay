import logger from 'winston'
import config from './config'
import themes from './themes'
import adjectives from './adjectives'
import themeManagerDep from './themeManager'
import historyManagerDep from './historyManager'
import { slackPost } from './slackManager'
import twitterManagerDep from './twitterManager'
import { configureLogger } from './logger.js'

/**
 * The entry point of the application.
 *
 * @returns {undefined}
 */
export default async function() {
  try {
    configureLogger()
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
    await slackPost(config.slackUrl, theme)
    // Post to Twitter
    await twitterManager.twitterPost(theme)
    // Update and save history
    await historyManager.addHistory(theme)
    await historyManager.saveHistory()
    logger.debug('Done')
  } catch (error) {
    logger.error(error)
  }
}
