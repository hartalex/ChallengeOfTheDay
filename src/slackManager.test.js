jest.mock('isomorphic-fetch')
import fetch from 'isomorphic-fetch'
import slackManager from './slackManager.js'
describe('Test Suite', () => {
  describe('#SlackManager(url)', () => {
    const slack = slackManager('a fake url')
    it('slackPost Success', async () => {
      const theme = 'Testy McTestFace'
      const response = await slack.slackPost(theme)
      expect(response).toBe(theme)
    })
    it('slackPost Throws an Error', async () => {
      const theme = 'Testy McTestFace'
      fetch.mockImplementationOnce(() => {
        throw new Error('Mock Error')
      })

      return expect(slack.slackPost(theme)).rejects.toThrowError('Mock Error')
    })
    it('slackPost returns an bad statusCode', async () => {
      const theme = 'Testy McTestFace'
      fetch.mockImplementationOnce(() => ({
        statusCode: 500,
        body: 'Mock Error'
      }))

      return expect(slack.slackPost(theme)).rejects.toThrowError(
        'statusCode: 500 body: Mock Error'
      )
    })
    it('slackPost returns an empty response object', async () => {
      const theme = 'Testy McTestFace'
      fetch.mockImplementationOnce(() => ({}))

      return expect(slack.slackPost(theme)).rejects.toThrowError(
        'Unknown Error'
      )
    })
  })
  describe('#SlackManager("invalid")', () => {
    it('Creation failure due to a missing slack url', async () => {
      expect(() => {
        slackManager()
      }).toThrowError('Slack URL is not defined in config.js')
    })
    it('Creation failure due to an empty slack url', async () => {
      expect(() => {
        slackManager('')
      }).toThrowError('Slack URL is not defined in config.js')
    })
  })
})
