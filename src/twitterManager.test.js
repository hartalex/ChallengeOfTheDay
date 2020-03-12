jest.mock('twit')
import twit from 'twit'
import { twitterPost } from './twitterManager.js'
import config from './config.js'
/*
 * @group unit
 */
describe('test suite', () => {
  describe('twitterManager()', () => {
    it('twitterPost Success', async () => {
      const theme = 'Testy McTestFace'
      const response = await twitterPost(theme, config.twitter)
      expect(response).toBe(theme)
    })
    it('twitterPost Failure', async () => {
      const theme = 'Testy McTestFace'
      const innerObject = twit()
      innerObject.post.mockImplementationOnce((_api, _object, callback) => {
        callback(new Error('Mock Error'), 'Mock Tweet', 'Mock Response')
      })

      await expect(twitterPost(theme, config.twitter)).rejects.toThrow(
        'Mock Error'
      )
    })
  })
})
