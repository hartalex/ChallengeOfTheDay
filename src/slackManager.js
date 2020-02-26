import logger from 'winston'
import fetch from 'isomorphic-fetch'

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
