var assert = require('assert')
describe('Test Suite', function () {
  describe('#SlackManager()', function () {
    it('url encode', function () {
      var theme = 'test test'
      assert.equal('https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(theme), 'https://www.pinterest.com/search/pins/?q=test%20test')
    })
  })
})
