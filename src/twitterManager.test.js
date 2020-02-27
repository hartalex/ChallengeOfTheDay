jest.mock('twit')
import twit from 'twit'
import { twitterPost } from './twitterManager.js'
import config from 'config'
/*
 * @group unit
 */
describe('Test Suite', () => {
  describe('#TwitterManager()', () => {
    const twitter = config.get('twitter')
    it('twitterPost Success', async () => {
      const theme = 'Testy McTestFace'
      const response = await twitterPost(theme, twitter)
      expect(response).toBe(theme)
    })
    it('twitterPost Failure', async () => {
      const theme = 'Testy McTestFace'
      const innerObject = twit()
      innerObject.post.mockImplementationOnce((_api, _object, callback) => {
        callback(new Error('Mock Error'), 'Mock Tweet', 'Mock Response')
      })

      return expect(twitterPost(theme, twitter)).rejects.toThrowError(
        'Mock Error'
      )
    })
  })
})
