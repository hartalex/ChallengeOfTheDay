jest.unmock('isomorphic-fetch')
import slackManager from './slackManager.js'
import config from './config.js'

/*
 * @group integration
 */
describe('Integration Test Suite', () => {
  describe('#SlackManager(url)', () => {
    const theme = 'Testy McTestFace'
    it('slackPost Success', async () => {
      const slack = slackManager(config.slackUrl)
      const response = await slack.slackPost(theme)
      expect(response).toBe(theme)
    })

    it('slackPost Throws an Error', async () => {
      const slack = slackManager('bad url')

      return expect(slack.slackPost(theme)).rejects.toThrowError(
        'only absolute urls are supported'
      )
    })
    it('slackPost bad dns', async () => {
      const slack = slackManager('https://fake.hartcode.com')

      return expect(slack.slackPost(theme)).rejects.toThrowError(
        'request to https://fake.hartcode.com failed, reason: getaddrinfo ENOTFOUND fake.hartcode.com fake.hartcode.com:443'
      )
    })
    it('slackPost timesout', async () => {
      const slack = slackManager('https://api.hartcode.com')

      return expect(slack.slackPost(theme)).rejects.toThrowError(
        'network timeout at: https://api.hartcode.com'
      )
    })
  })
})
