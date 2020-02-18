jest.mock('request')
import request from 'request'
import slackManager from './slackManager.js'
const slack = slackManager('a fake url')
describe('Test Suite', () => {
  describe('#SlackManager()', () => {
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
})
