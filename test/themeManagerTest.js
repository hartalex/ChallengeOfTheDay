var assert = require('assert')
const themes = require('../src/themes')
const themeManager = require('../src/themeManager')(10)

describe('Test Suite', function () {
  describe('#ThemeManager()', function () {
    it('Fail - Empty Array', function () {
      return themeManager.chooseTheme([]).then(function (theme) {
        assert.fail('should not have returned a theme')
      }).catch(function (error) {
        assert.equal(error.message, 'themes parameter array is empty')
      })
    })

    it('Fail - Themes Not an Array', function () {
      return themeManager.chooseTheme('').then(function (theme) {
        assert.fail('should not have returned a theme')
      }).catch(function (error) {
        assert.equal(error.message, 'themes parameter is not an array')
      })
    })

    it('Fail - History Too Full', function () {
      return themeManager.chooseTheme(['test'], ['test']).then(function (theme) {
        assert.fail('should not have returned a theme')
      }).catch(function (error) {
        assert.equal(error.message, 'History parameter array is greater than or equal to themes parameter array.\n No New Themes Will Be Found')
      })
    })

    it('Success', function () {
      return themeManager.chooseTheme(themes).then(function (theme) {
        assert.notEqual(theme, '')
        console.log(theme)
      })
    })
  })
})
