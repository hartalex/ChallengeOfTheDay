import themes from '../src/themes'
import adjectives from '../src/adjectives'
import { chooseTheme, __RewireAPI__ } from '../src/themeManager'

/*
 * @group unit
 */
describe('Test Suite', () => {
  describe('#ThemeManager()', () => {
    it('Fail - Empty Array', () =>
      expect(
        chooseTheme({ adjectives: [], themes: [] }, null, 2)
      ).rejects.toThrowError('adjectives parameter array is empty'))

    it('Fail - Adjectives Not an Array', () =>
      expect(
        chooseTheme({ adjectives: '', themes: '' }, null, 2)
      ).rejects.toThrowError('adjectives parameter is not an array'))

    it('Fail - Empty Array', () =>
      expect(
        chooseTheme({ adjectives: ['adj'], themes: [] }, null, 2)
      ).rejects.toThrowError('themes parameter array is empty'))

    it('Fail - Themes Not an Array', () =>
      expect(
        chooseTheme({ adjectives: ['adj'], themes: '' }, null, 2)
      ).rejects.toThrowError('themes parameter is not an array'))

    it('Fail - History Too Full', () =>
      expect(
        chooseTheme({ adjectives: ['adj'], themes: ['test'] }, ['test'], 2)
      ).rejects.toThrowError(
        'History parameter array is greater than or equal to themes parameter array.\n No New Themes Will Be Found'
      ))

    it('Success', () =>
      expect(chooseTheme({ adjectives, themes })).resolves.toBeDefined())

    it('Success where theme manager has to retry because of a history collision', () => {
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

    it('Failure where theme manager times out because of too many history collisions', () => {
      const history = ['Testy McTestFace']
      try {
        __RewireAPI__.__Rewire__(
          'getRandomTheme',
          jest.fn().mockReturnValue('Testy McTestFace')
        )

        return expect(
          chooseTheme({ adjectives, themes }, history)
        ).rejects.toThrowError('Theme Chooser Timed out')
      } finally {
        __RewireAPI__.__ResetDependency__('getRandomTheme')
      }
    })
  })
})
