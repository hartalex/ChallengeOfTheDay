const request = require('request')
module.exports = function(slackUrl) {
  return {
    slackPost: function(theme) {
      return new Promise(function(resolve, reject) {
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
              console.log('SlackPost Done')
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
