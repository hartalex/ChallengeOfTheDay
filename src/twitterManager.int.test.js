jest.unmock('twit')
import { twitterPost } from './twitterManager.js'
import config from './config.js'

/*
 * @group integration
 */
describe('Integration Test Suite', () => {
  describe('#TwitterManager(url)', () => {
    const theme = 'Testy McTestFace'
    it('twitterPost Success', async () => {
      const response = await twitterPost(theme, config.twitter)
      expect(response).toBe(theme)
    })
  })
})
