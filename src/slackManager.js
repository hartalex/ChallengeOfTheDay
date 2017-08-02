const request = require('request')
module.exports = function (slackUrl) {
  return {
    SlackPost: function (theme) {
      return new Promise(
        function (resolve, reject) {
          var slackData = {'text': 'Today\'s challenge theme is *' + theme + '*\n<!here|here> https://www.pinterest.com/search/pins/?q=' + theme}
          request({
            url: slackUrl,
            method: 'POST',
            json: true,
            body: slackData
          }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              // Sending to Slack was successful
              resolve(theme)
            } else {
              // Sending to Slack failed
              reject(new Error('Error: ' + error + ' statusCode: ' + response.statusCode + ' body: ' + body))
            }
          })
        })
    }
  }
}
