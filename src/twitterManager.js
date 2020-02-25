import logger from 'winston'
const Twitter = require('twit')

/**
 * Builds a twitter manager object.
 *
 * @class TwitterManager
 * @param {string} consumerKey - The twitter api consumer key.
 * @param {string} consumerSecret - The twitter api consumer secret.
 * @param {string} accessToken - The twitter api access token.
 * @param {string} accessTokenSecret - The twitter api access token secret.
 */
module.exports = function(
  consumerKey,
  consumerSecret,
  accessToken,
  accessTokenSecret
) {
  return {
    /**
     * Posts a twitter message to the accout with the given credentials.
     *
     * @memberof TwitterManager
     * @instance
     * @param {string} theme - The theme to send to twitter in message.
     * @returns {string} - The given theme string.
     */
    twitterPost: function(theme) {
      return new Promise(function(resolve, reject) {
        logger.debug('Twitter Post')
        const twitterData = {
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
          access_token: accessToken,
          access_token_secret: accessTokenSecret
        }

        const client = new Twitter(twitterData)
        client.post(
          'statuses/update',
          { status: "Today's theme is " + theme + '\n#artdailies' },
          function(error, tweet, response) {
            if (error) {
              logger.error(error)
              reject(
                new Error(
                  'Error: ' +
                    JSON.stringify(error) +
                    ' response: ' +
                    JSON.stringify(response) +
                    ' tweet: ' +
                    JSON.stringify(tweet)
                )
              )
            } else {
              logger.debug('TwitterPost Done')
              resolve(theme)
            }
          }
        )
      })
    }
  }
}
