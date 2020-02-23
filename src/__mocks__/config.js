module.exports = {
  slackUrl: '',
  twitter: {
    consumerKey: process.env.twitterConsumerKey,
    consumerSecret: process.env.twitterConsumerSecret,
    accessToken: process.env.twitterAccessToken,
    accessTokenSecret: process.env.twitterAccessTokenSecret
  },
  themeTimeout: 50,
  historyFile: 'history.json',
  historyMax: 90
}
