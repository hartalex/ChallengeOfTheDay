const request = require('request')
const config = require('./config')
const themes = require('./src/themes')
const themeManager = require('./src/themeManager')

if (config.slackUrl === '') {
  console.error('Slack URL is not defined in config.js')
  process.exit(1)
}

themeManager(themes).then(function (theme) {
  var slackData = {'text': 'Today\'s challenge theme is *' + theme + '*\n<!here|here>'}
  request({
    url: config.slackUrl,
    method: 'POST',
    json: true,
    body: slackData
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body)
    } else {
      throw new Error('Error: ' + error + ' statusCode: ' + response.statusCode + ' body: ' + body)
    }
  })
}).catch(function (error) {
  console.error(error)
  process.exit(1)
})

// 1. Get The Theme of the Day
//   On failure notify someone.
// 2. Post Theme in Slack
//   On failure notify someone.
