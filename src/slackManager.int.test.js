jest.unmock('isomorphic-fetch')
import { slackPost } from './slackManager.js'
import config from './config.js'

/*
 * @group integration
 */
describe('integration test suite', () => {
  describe('slackmanager(url)', () => {
    const theme = 'Testy McTestFace'
    it('slackpost success', async () => {
      const response = await slackPost(config.slackUrl, theme)
      expect(response).toBe(theme)
    })

    it('slackpost throws an error', async () =>
      expect(slackPost('a bad url', theme)).rejects.toThrow(
        'only absolute urls are supported'
      ))
    it('slackpost bad dns', async () =>
      expect(slackPost('https://fake.hartcode.com', theme)).rejects.toThrow(
        'request to https://fake.hartcode.com failed, reason: getaddrinfo ENOTFOUND fake.hartcode.com fake.hartcode.com:443'
      ))
    it('slackpost timesout', async () =>
      expect(slackPost('https://api.hartcode.com', theme)).rejects.toThrow(
        'network timeout at: https://api.hartcode.com'
      ))
  })
})
