import logger from 'winston'
import fetch from 'isomorphic-fetch'

const httpResponseOk = 200
const httpResponseRedirect = 300
/**
 * Posts a slack message to the given slackUrl.
 *
 * @param {string} slackUrl - The slack api url to post messages to.
 * @param {string} theme - The theme to send to slack in message.
 * @returns {string} - The given theme string.
 */
export async function slackPost(slackUrl, theme) {
  logger.debug('Slack Post')
  if (typeof slackUrl === 'undefined' || slackUrl === '' || slackUrl === null) {
    throw new Error('Slack URL is not defined in config.js')
  }
  const response = await fetch(slackUrl, {
    body: JSON.stringify(createSlackMessageData(theme)),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    timeout: 15000
  })

  validateFetch(response)

  // Sending to Slack was successful
  logger.debug('SlackPost Done')

  return theme
}

/**
 * Creates a slack message data object to send to Slacks Api.
 *
 * @param {string} theme - A string inserted into the slack message.
 * @returns {{text:string}} - A slack message data object.
 */
function createSlackMessageData(theme) {
  return {
    text: `Today's challenge theme is *${theme}*\nNeed Inspiration? https://www.pinterest.com/search/pins/?q=${encodeURIComponent(
      theme
    )}`
  }
}

/**
 * Validates a fetch response.
 *
 * @param {object} response - Response object of a fetch call.
 * @returns {undefined}
 */
function validateFetch(response) {
  if (
    response.status < httpResponseOk ||
    response.status >= httpResponseRedirect
  ) {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
