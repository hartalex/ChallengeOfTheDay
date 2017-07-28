var assert = require('assert')
const themes = require('../src/themes')
const themeManager = require('../src/themeManager')

describe('Test Suite', function () {
  describe('#ThemeManager()', function () {
    it('Fail - Empty Array', function () {
      return themeManager([]).then(function (theme) {
        assert.fail('should not have returned a theme')
      }).catch(function (error) {
        assert.equal(error.message, 'themes parameter array is empty')
      })
    })

    it('Fail - Not an Array', function () {
      return themeManager('').then(function (theme) {
        assert.fail('should not have returned a theme')
      }).catch(function (error) {
        assert.equal(error.message, 'themes parameter is not an array')
      })
    })

    it('Success', function () {
      return themeManager(themes).then(function (theme) {
        assert.notEqual(theme, '')
        console.log(theme)
      })
    })
  })
})
