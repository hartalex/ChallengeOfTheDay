import logger from 'winston'
import config from './config.js'
import themes from './themes.js'
import adjectives from './adjectives.js'
import { chooseTheme } from './themeManager.js'
import { HistoryManager } from './historyManager.js'
import { slackPost } from './slackManager.js'
import { twitterPost } from './twitterManager.js'
import { configureLogger } from './logger.js'

/**
 * The entry point of the application.
 *
 * @returns {undefined}
 */
export default async function () {
  try {
    configureLogger()
    const historyManager = new HistoryManager(
      config.historyFile,
      config.historyMax
    )
    const history = await historyManager.loadHistory()
    const theme = await chooseTheme(
      { adjectives, themes },
      history,
      config.themeTimeout
    )
    logger.info(`Chosen theme is ${theme}`)
    await slackPost(config.slackUrl, theme)
    await twitterPost(theme, config.twitter)
    await historyManager.addHistory(theme)
    await historyManager.saveHistory()
    logger.debug('Done')
  } catch (error) {
    logger.error(error.message)
  }
}
