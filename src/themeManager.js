import logger from 'winston'
/**
 * Builds a theme manager object.
 *
 * @class ThemeManager
 * @param {number} timeoutMax - The max amount of times to try to generate a unique theme.
 */
export default function(timeoutMax) {
  return {
    /**
     * Creates a theme string using the list of adjectives and themes, and the provided history.
     *
     * @memberof ThemeManager
     * @instance
     * @param {Array.<string>} adjectives - A list of adjectives.
     * @param {Array.<string>} themes - A list of themes.
     * @param {Array.<string>} history - A list of themes created previously. Used to weed out duplicates.
     * @returns {string} - The generated theme string.
     */
    chooseTheme: function(adjectives, themes, history = []) {
      logger.debug('Choosing theme')
      const randomTheme = this.getRandomTheme.bind(this)

      return new Promise(function(resolve, reject) {
        if (!Array.isArray(adjectives)) {
          reject(new Error('adjectives parameter is not an array'))
        } else if (adjectives.length === 0) {
          reject(new Error('adjectives parameter array is empty'))
        } else if (!Array.isArray(themes)) {
          reject(new Error('themes parameter is not an array'))
        } else if (themes.length === 0) {
          reject(new Error('themes parameter array is empty'))
        } else if (history.length >= themes.length) {
          reject(
            new Error(
              'History parameter array is greater than or equal to themes parameter array.\n No New Themes Will Be Found'
            )
          )
        } else {
          let timeoutIndex = 0
          let chosenTheme = randomTheme(adjectives, themes)

          // Loop has a timeout just incase of a bug
          while (
            history.indexOf(chosenTheme) !== -1 &&
            timeoutIndex++ < timeoutMax
          ) {
            chosenTheme = randomTheme(adjectives, themes)
          }

          if (timeoutIndex >= timeoutMax) {
            // Should never happen
            reject(new Error('Theme Chooser Timed out'))
          } else {
            logger.debug('Theme Chooser Done')
            resolve(chosenTheme)
          }
        }
      })
    },
    /**
     * Creates a theme by combining a random adjective and a random theme.
     *
     * @memberof ThemeManager
     * @instance
     * @access private
     * @param {Array} adjectives - An array of string adjectives.
     * @param {Array} themes - An array of string themes.
     * @returns {string} - The theme created by combining a random adjective and a random theme.
     */
    getRandomTheme: function(adjectives, themes) {
      const adjrandomNumber = Math.random() * adjectives.length
      const adjindex = Math.floor(adjrandomNumber)
      const randomNumber = Math.random() * themes.length
      const index = Math.floor(randomNumber)
      const ucAdjective = this.jsUcfirst(adjectives[adjindex])
      const ucTheme = this.jsUcfirst(themes[index])

      return `${ucAdjective} ${ucTheme}`
    },
    /**
     * Transforms the passed in string and makes the first character uppercase.
     *
     * @memberof ThemeManager
     * @instance
     * @access private
     * @param {string} string - The string to transform.
     * @returns {string} - The passed in string with the first character changed to uppercase.
     */
    jsUcfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
