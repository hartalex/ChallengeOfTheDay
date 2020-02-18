jest.mock('twit')
jest.mock('fs')
jest.mock('request')

describe('Test Suite', () => {
  describe('#Index()', () => {
    it('Success', async () => {
      require('./index.js')
    })

    it('Failure slackUrl is missing', async () => {
      config.slackUrl = ''
      require('./index.js')
    })
  })
})
