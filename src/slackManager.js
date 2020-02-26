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
        body: JSON.stringify(slackData),
        timeout: 3000
      })

      logger.debug(`Response Code: ${JSON.stringify(response.status, null, 2)}`)
      logger.debug(
        `Response Status: ${JSON.stringify(response.statusText, null, 2)}`
      )
      logger.debug(`Response Body: ${response.body}`)

      if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText)
        error.response = response
        throw error
      }

      // Sending to Slack was successful
      logger.debug('SlackPost Done')

      return theme
    }
  }
}
