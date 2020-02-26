import logger from 'winston'
import fetch from 'isomorphic-fetch'
/**
 * Builds a slack manager object.
 *
 * @class SlackManager
 * @param {string} slackUrl - The slack api url to post messages to.
 */
module.exports = function(slackUrl) {
  if (typeof slackUrl === 'undefined' || slackUrl === '') {
    throw new Error('Slack URL is not defined in config.js')
  }

  return {
    /**
     * Posts a slack message to the given slackUrl.
     *
     * @memberof SlackManager
     * @instance
     * @param {string} theme - The theme to send to slack in message.
     * @returns {string} - The given theme string.
     */
    slackPost: async function(theme) {
      logger.debug('Slack Post')
      const slackData = {
        text:
          "Today's challenge theme is *" +
          theme +
          '*\nNeed Inspiration? https://www.pinterest.com/search/pins/?q=' +
          encodeURIComponent(theme)
      }
      const response = await fetch(slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackData)
      })

      if (response && response.statusCode === 200) {
        logger.debug('SlackPost Done')
        // Sending to Slack was successful

        return theme
      }

      if (response && response.statusCode && response.body) {
        throw new Error(
          `statusCode: ${response.statusCode} body: ${response.body}`
        )
      }
      // Sending to Slack failed
      throw new Error('Unknown Error')
    }
  }
}
