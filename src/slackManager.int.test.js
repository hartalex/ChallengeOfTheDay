jest.unmock('isomorphic-fetch')
import { slackPost } from './slackManager.js'
import config from './config.js'

/*
 * @group integration
 */
describe('Integration Test Suite', () => {
  describe('#SlackManager(url)', () => {
    const theme = 'Testy McTestFace'
    it('slackPost Success', async () => {
      const response = await slackPost(config.slackUrl, theme)
      expect(response).toBe(theme)
    })

    it('slackPost Throws an Error', async () =>
      expect(slackPost('a bad url', theme)).rejects.toThrowError(
        'only absolute urls are supported'
      ))
    it('slackPost bad dns', async () =>
      expect(
        slackPost('https://fake.hartcode.com', theme)
      ).rejects.toThrowError(
        'request to https://fake.hartcode.com failed, reason: getaddrinfo ENOTFOUND fake.hartcode.com fake.hartcode.com:443'
      ))
    it('slackPost timesout', async () =>
      expect(slackPost('https://api.hartcode.com', theme)).rejects.toThrowError(
        'network timeout at: https://api.hartcode.com'
      ))
  })
})
