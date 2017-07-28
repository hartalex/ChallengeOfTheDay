var assert = require('assert')
const themes = require('../src/themes')
const themeManager = require('../src/themeManager')

describe('Test Suite', function () {
  describe('#ThemeManager()', function () {
    it('Fail', function () {
      return themeManager([]).then(function (theme) {
        assert.fail('should not have returned a theme')
      }).catch(function (error) {
        assert.equal(error.message, 'themes.js array is empty')
      })
    })

    it('Success', function () {
      return themeManager(themes).then(function (theme) {
        assert.notEqual(theme, '')
      })
    })
  })
})
