import app from './src/app'
jest.mock('./src/app')

/*
 * @group unit
 */
describe('Test Suite', () => {
  describe('#Index()', () => {
    it('Success', async () => {
      require('./index.js')
      expect(app).toHaveBeenCalled()
    })
  })
})
