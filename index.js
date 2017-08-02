const request = require('request')
const config = require('./config')
const themes = require('./src/themes')
const themeManager = require('./src/themeManager')

if (config.slackUrl === '') {
  console.error('Slack URL is not defined in config.js')
  process.exit(1)
}

// Choose a theme
themeManager(themes).then(function (theme) {
  // Now that we have a theme, send it to slack
  var slackData = {'text': 'Today\'s challenge theme is *' + theme + '*\n<!here|here> https://www.pinterest.com/search/pins/?q=' + theme}
  request({
    url: config.slackUrl,
    method: 'POST',
    json: true,
    body: slackData
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // Sending to Slack was successful
      console.log(body)
    } else {
      // Sending to Slack failed
      throw new Error('Error: ' + error + ' statusCode: ' + response.statusCode + ' body: ' + body)
    }
  })
}).catch(function (error) {
  // handle errors
  console.error(error)
  process.exit(1)
})
