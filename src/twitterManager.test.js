jest.mock('twit')
import twit from 'twit'
import twitterManager from './twitterManager.js'
const twitter = twitterManager('', '', '', '')
describe('Test Suite', () => {
  describe('#TwitterManager()', () => {
    it('twitterPost Success', async () => {
      const theme = 'Testy McTestFace'
      const response = await twitter.twitterPost(theme)
      expect(response).toBe(theme)
    })
    it('twitterPost Failure', async () => {
      const theme = 'Testy McTestFace'
      const innerObject = twit()
      innerObject.post.mockImplementationOnce((_api, _object, callback) => {
        callback(new Error('Mock Error'), 'Mock Tweet', 'Mock Response')
      })

      return expect(twitter.twitterPost(theme)).rejects.toThrowError(
        'Error: {} response: "Mock Response" tweet: "Mock Tweet"'
      )
    })
  })
})