import logger from 'winston'
import config from 'config'
import themes from './themes'
import adjectives from './adjectives'
import { chooseTheme } from './themeManager'
import { HistoryManager } from './historyManager'
import { slackPost } from './slackManager'
import { twitterPost } from './twitterManager'
import { configureLogger } from './logger.js'

/**
 * The entry point of the application.
 *
 * @returns {undefined}
 */
export default async function() {
  try {
    configureLogger()
    const historyFile = config.get('config.historyFile')
    const historyMax = config.get('historyMax')
    const twitter = config.get('twitter')
    const slackUrl = config.get('slackUrl')
    const themeTimeout = config.get('themeTimeout')
    const historyManager = new HistoryManager(historyFile, historyMax)
    const history = await historyManager.loadHistory()
    const theme = await chooseTheme(
      { adjectives, themes },
      history,
      themeTimeout
    )
    logger.info(`Chosen theme is ${theme}`)
    await slackPost(slackUrl, theme)
    await twitterPost(theme, twitter)
    await historyManager.addHistory(theme)
    await historyManager.saveHistory()
    logger.debug('Done')
  } catch (error) {
    logger.error(error)
  }
}
