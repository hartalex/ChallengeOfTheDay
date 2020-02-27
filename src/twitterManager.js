import logger from 'winston'
import { promisify } from 'util'
const Twitter = require('twit')

/**
 * Posts a twitter message to the account with the given credentials.
 *
 * @param {string} theme - The theme to send to twitter in message.
 * @param {object} config - Configuration object.
 * @param {string} config.consumerKey - The twitter api consumer key.
 * @param {string} config.consumerSecret - The twitter api consumer secret.
 * @param {string} config.accessToken - The twitter api access token.
 * @param {string} config.accessTokenSecret - The twitter api access token secret.
 * @returns {string} - The given theme string.
 */
export async function twitterPost(theme, config) {
  logger.debug('Twitter Post')
  const client = new Twitter(mapConfig2TwitConfig(config))
  const clientPost = promisify(client.post)
  await clientPost('statuses/update', {
    status: "Today's theme is " + theme + '\n#artdailies'
  })

  return theme
}

/**
 * Converts our configuration options to twitter config object.
 *
 * @param {object} config - Configuration object.
 * @param {string} config.consumerKey - The twitter api consumer key.
 * @param {string} config.consumerSecret - The twitter api consumer secret.
 * @param {string} config.accessToken - The twitter api access token.
 * @param {string} config.accessTokenSecret - The twitter api access token secret.
 * @returns {{consumer_key: string, consumer_secret: string, access_token: string, access_token_secret:string}} - Twit configuration object.
 */
function mapConfig2TwitConfig(config) {
  /* eslint-disable camelcase */
  const {
    consumerKey: consumer_key,
    consumerSecret: consumer_secret,
    accessToken: access_token,
    accessTokenSecret: access_token_secret
  } = config

  return {
    access_token,
    access_token_secret,
    consumer_key,
    consumer_secret
  }
}
