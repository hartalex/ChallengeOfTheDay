jest.mock('request')
import request from 'request'
import slackManager from './slackManager.js'
describe('Test Suite', () => {
  describe('#SlackManager(url)', () => {
    const slack = slackManager('a fake url')
    it('slackPost Success', async () => {
      const theme = 'Testy McTestFace'
      const response = await slack.slackPost(theme)
      expect(response).toBe(theme)
    })
    it('slackPost Failure with a response', async () => {
      const theme = 'Testy McTestFace'
      request.mockImplementationOnce((_object, callback) => {
        callback(new Error('Mock Error'), { statusCode: 200 }, 'mock body')
      })

      return expect(slack.slackPost(theme)).rejects.toThrowError(
        'Error: Error: Mock Error statusCode: 200 body: mock body'
      )
    })
    it('slackPost Failure without a response', async () => {
      const theme = 'Testy McTestFace'
      request.mockImplementationOnce((_object, callback) => {
        callback(new Error('Mock Error'), null, 'mock body')
      })

      return expect(slack.slackPost(theme)).rejects.toThrowError(
        'Error: Error: Mock Error body: mock body'
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
