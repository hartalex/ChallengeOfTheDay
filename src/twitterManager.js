const Twitter = require('twit')

module.exports = function (consumerKey, consumerSecret, accessToken, accessTokenSecret) {
  return {
    TwitterPost: function (theme) {
      return new Promise(
        function (resolve, reject) {
          var twitterData = {
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
            access_token: accessToken,
            access_token_secret: accessTokenSecret
          }
          console.log(twitterData)
          var client = new Twitter(twitterData)
          client.post('statuses/update', {status: 'Today\'s theme is ' + theme + '\n#artdailies'}, function (error, tweet, response) {
            if (error) {
              reject(new Error('Error: ' + JSON.stringify(error) + ' response: ' + JSON.stringify(response) + ' tweet: ' + JSON.stringify(tweet)))
            } else {
              resolve(theme)
            }
          })
        })
    }
  }
}
