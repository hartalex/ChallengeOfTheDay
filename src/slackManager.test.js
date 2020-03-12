jest.mock('isomorphic-fetch')
import fetch from 'isomorphic-fetch'
import { slackPost } from './slackManager.js'

/*
 * @group unit
 */
describe('test suite', () => {
  describe('slackmanager(url)', () => {
    const url = 'a fake url'
    const theme = 'Testy McTestFace'
    it('slackpost success', async () => {
      const response = await slackPost(url, theme)
      expect(response).toBe(theme)
    })
    it('slackPost throws an error', async () => {
      fetch.mockImplementationOnce(() => {
        throw new Error('Mock Error')
      })

      await expect(slackPost(url, theme)).rejects.toThrow('Mock Error')
    })
    it('slackpost returns an bad statuscode', async () => {
      fetch.mockImplementationOnce(() => ({
        status: 500,
        statusText: 'Mock Error'
      }))

      await expect(slackPost(url, theme)).rejects.toThrow('Mock Error')
    })
    it('slackpost failure due to a missing slack url', async () =>
      expect(slackPost(null, theme)).rejects.toThrow(
        'Slack URL is not defined in config.js'
      ))
    it('slackpost failure due to an empty slack url', async () =>
      expect(slackPost('', theme)).rejects.toThrow(
        'Slack URL is not defined in config.js'
      ))
  })
})
