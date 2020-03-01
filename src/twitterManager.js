import logger from 'winston'
import Twitter from 'twit'

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
  const response = await promisifyClientPost(client, theme)
  logger.debug(`twit response is: ${JSON.stringify(response)}`)

  return theme
}

/**
 * Wraps the twit post callback function in a promise.
 *
 * @param {object} client - The twitter client object built by Twit.
 * @param {string} theme - The theme to send to twitter in message.
 * @returns {{data:object,response:object}} - The data and response objects returned from twit.
 */
async function promisifyClientPost(client, theme) {
  return new Promise((resolve, reject) => {
    client.post(
      'statuses/update',
      {
        status: `Today's theme is ${theme} \n#artdailies`
      },
      (err, data, response) => {
        if (err) {
          reject(err)
        } else {
          resolve({ data, response })
        }
      }
    )
  })
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
