var assert = require('assert')
const themeManager = require('../src/themeManager')

describe('Test Suite', function () {
  describe('#ThemeManager()', function () {
    it('Fail', function () {
      return themeManager.then(function (theme) {
        assert.fail('should not have returned a theme')
      }).catch(function (error) {
        assert.equal(error.message, 'Could not find a theme')
      })
    })
  })
})
