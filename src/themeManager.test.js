import themes from '../src/themes.js'
import adjectives from '../src/adjectives.js'
import { chooseTheme, __RewireAPI__ } from '../src/themeManager.js'

/*
 * @group unit
 */
describe('test suite', () => {
  describe('themeManager()', () => {
    it('fail - empty adjectives array', () =>
      expect(
        chooseTheme({ adjectives: [], themes: [] }, null, 2)
      ).rejects.toThrow('adjectives parameter array is empty'))

    it('fail - Adjectives Not an Array', () =>
      expect(
        chooseTheme({ adjectives: '', themes: '' }, null, 2)
      ).rejects.toThrow('adjectives parameter is not an array'))

    it('fail - empty themes array', () =>
      expect(
        chooseTheme({ adjectives: ['adj'], themes: [] }, null, 2)
      ).rejects.toThrow('themes parameter array is empty'))

    it('fail - themes not an array', () =>
      expect(
        chooseTheme({ adjectives: ['adj'], themes: '' }, null, 2)
      ).rejects.toThrow('themes parameter is not an array'))

    it('fail - history too full', () =>
      expect(
        chooseTheme({ adjectives: ['adj'], themes: ['test'] }, ['test'], 2)
      ).rejects.toThrow(
        'History parameter array is greater than or equal to themes parameter array.\n No New Themes Will Be Found'
      ))

    it('success', async () => {
      expect(await chooseTheme({ adjectives, themes })).toBeDefined()
    })

    it('success where theme manager has to retry because of a history collision', () => {
      const history = ['Testy McTestFace']
      try {
        __RewireAPI__.__Rewire__(
          'getRandomTheme',
          jest
            .fn()
            .mockReturnValueOnce('Testy McTestFace')
            .mockReturnValue('New McTestFace')
        )

        return chooseTheme({ adjectives, themes }, history).then(theme => {
          expect(theme).toBe('New McTestFace')
        })
      } finally {
        __RewireAPI__.__ResetDependency__('getRandomTheme')
      }
    })

    it('failure where theme manager times out because of too many history collisions', () => {
      const history = ['Testy McTestFace']
      try {
        __RewireAPI__.__Rewire__(
          'getRandomTheme',
          jest.fn().mockReturnValue('Testy McTestFace')
        )

        return expect(
          chooseTheme({ adjectives, themes }, history)
        ).rejects.toThrow('Theme Chooser Timed out')
      } finally {
        __RewireAPI__.__ResetDependency__('getRandomTheme')
      }
    })
  })
})
