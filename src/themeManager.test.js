const assert = require('assert')
const themes = require('../src/themes')
const adjectives = require('../src/adjectives')
import { chooseTheme, __RewireAPI__ } from '../src/themeManager'

/*
 * @group unit
 */
describe('Test Suite', function() {
  describe('#ThemeManager()', function() {
    it('Fail - Empty Array', function() {
      return chooseTheme({ adjectives: [], themes: [] }, null, 2)
        .then(function() {
          assert.fail('should not have returned a theme')
        })
        .catch(function(error) {
          assert.equal(error.message, 'adjectives parameter array is empty')
        })
    })

    it('Fail - Adjectives Not an Array', function() {
      return chooseTheme({ adjectives: '', themes: '' }, null, 2)
        .then(function() {
          assert.fail('should not have returned a theme')
        })
        .catch(function(error) {
          assert.equal(error.message, 'adjectives parameter is not an array')
        })
    })

    it('Fail - Empty Array', function() {
      return chooseTheme({ adjectives: ['adj'], themes: [] }, null, 2)
        .then(function() {
          assert.fail('should not have returned a theme')
        })
        .catch(function(error) {
          assert.equal(error.message, 'themes parameter array is empty')
        })
    })

    it('Fail - Themes Not an Array', function() {
      return chooseTheme({ adjectives: ['adj'], themes: '' }, null, 2)
        .then(function() {
          assert.fail('should not have returned a theme')
        })
        .catch(function(error) {
          assert.equal(error.message, 'themes parameter is not an array')
        })
    })

    it('Fail - History Too Full', function() {
      return chooseTheme({ adjectives: ['adj'], themes: ['test'] }, ['test'], 2)
        .then(function() {
          assert.fail('should not have returned a theme')
        })
        .catch(function(error) {
          assert.equal(
            error.message,
            'History parameter array is greater than or equal to themes parameter array.\n No New Themes Will Be Found'
          )
        })
    })

    it('Success', function() {
      return chooseTheme({ adjectives, themes }).then(function(theme) {
        assert.notEqual(theme, '')
      })
    })

    it('Success where theme manager has to retry because of a history collision', function() {
      const history = ['Testy McTestFace']
      try {
        __RewireAPI__.__Rewire__(
          'getRandomTheme',
          jest
            .fn()
            .mockReturnValueOnce('Testy McTestFace')
            .mockReturnValue('New McTestFace')
        )

        return chooseTheme({ adjectives, themes }, history).then(function(
          theme
        ) {
          expect(theme).toBe('New McTestFace')
        })
      } finally {
        __RewireAPI__.__ResetDependency__('getRandomTheme')
      }
    })

    it('Failure where theme manager times out because of too many history collisions', function() {
      const history = ['Testy McTestFace']
      try {
        __RewireAPI__.__Rewire__(
          'getRandomTheme',
          jest.fn().mockReturnValue('Testy McTestFace')
        )

        return chooseTheme({ adjectives, themes }, history)
          .then(function() {
            assert.fail('should not have returned a theme')
          })
          .catch(function(error) {
            assert.equal(error.message, 'Theme Chooser Timed out')
          })
      } finally {
        __RewireAPI__.__ResetDependency__('getRandomTheme')
      }
    })
  })
})
