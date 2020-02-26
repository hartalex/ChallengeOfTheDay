jest.mock('twit')
import twit from 'twit'
import twitterManager from './twitterManager.js'
const twitter = twitterManager('', '', '', '')

/*
 * @group unit
 */
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
        'Error: {"level":"\\u001b[31merror\\u001b[39m"} response: "Mock Response" tweet: "Mock Tweet"'
      )
    })
  })
})
