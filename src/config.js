module.exports = {
  historyFile: 'history.json',
  historyMax: 90,
  slackUrl: process.env.slackUrl,
  themeTimeout: 50,
  twitter: {
    accessToken: process.env.twitterAccessToken,
    accessTokenSecret: process.env.twitterAccessTokenSecret,
    consumerKey: process.env.twitterConsumerKey,
    consumerSecret: process.env.twitterConsumerSecret
  }
}
