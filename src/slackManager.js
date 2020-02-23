import logger from 'winston'
const request = require('request')
module.exports = function(slackUrl) {
  if (typeof slackUrl === 'undefined' || slackUrl === '') {
    throw new Error('Slack URL is not defined in config.js')
  }

  return {
    slackPost: function(theme) {
      return new Promise(function(resolve, reject) {
        logger.debug('Slack Post')
        const slackData = {
          text:
            "Today's challenge theme is *" +
            theme +
            '*\nNeed Inspiration? https://www.pinterest.com/search/pins/?q=' +
            encodeURIComponent(theme)
        }
        request(
          {
            url: slackUrl,
            method: 'POST',
            json: true,
            body: slackData
          },
          function(error, response, body) {
            if (!error && response && response.statusCode === 200) {
              logger.debug('SlackPost Done')
              // Sending to Slack was successful
              resolve(theme)
            } else if (response) {
              // Sending to Slack failed
              reject(
                new Error(
                  'Error: ' +
                    error +
                    ' statusCode: ' +
                    response.statusCode +
                    ' body: ' +
                    body
                )
              )
            } else {
              reject(new Error('Error: ' + error + ' body: ' + body))
            }
          }
        )
      })
    }
  }
}
