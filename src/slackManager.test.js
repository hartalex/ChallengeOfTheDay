jest.mock('isomorphic-fetch')
import fetch from 'isomorphic-fetch'
import { slackPost } from './slackManager.js'

/*
 * @group unit
 */
describe('Test Suite', () => {
  describe('#SlackManager(url)', () => {
    const url = 'a fake url'
    const theme = 'Testy McTestFace'
    it('slackPost Success', async () => {
      const response = await slackPost(url, theme)
      expect(response).toBe(theme)
    })
    it('slackPost Throws an Error', async () => {
      fetch.mockImplementationOnce(() => {
        throw new Error('Mock Error')
      })

      return expect(slackPost(url, theme)).rejects.toThrowError('Mock Error')
    })
    it('slackPost returns an bad statusCode', async () => {
      fetch.mockImplementationOnce(() => ({
        status: 500,
        statusText: 'Mock Error'
      }))

      return expect(slackPost(url, theme)).rejects.toThrowError('Mock Error')
    })
    it('slackPost failure due to a missing slack url', async () =>
      expect(slackPost(null, theme)).rejects.toThrowError(
        'Slack URL is not defined in config.js'
      ))
    it('slackPost failure due to an empty slack url', async () =>
      expect(slackPost('', theme)).rejects.toThrowError(
        'Slack URL is not defined in config.js'
      ))
  })
})
