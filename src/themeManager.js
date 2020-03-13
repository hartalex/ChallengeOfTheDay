import logger from 'winston'
const defaultTimeout = 50
const indexNotFound = -1
const incrementAmount = 1
const emptyArrayLength = 0
const indexOfFirstCharacter = 0
const indexOfSecondCharacter = 1
/**
 * Creates a theme string using the list of adjectives and themes, and the provided history.
 *
 * @param {object} inputs - An object of input arrays.
 * @param {Array.<string>} inputs.adjectives - A list of adjectives.
 * @param {Array.<string>} inputs.themes - A list of themes.
 * @param {Array.<string>} history - A list of themes created previously. Used to weed out duplicates.
 * @param {number} timeoutMax - The max amount of times to try to generate a unique theme.
 * @returns {string} - The generated theme string.
 */
export async function chooseTheme(
  inputs,
  history = [],
  timeoutMax = defaultTimeout
) {
  const { adjectives, themes } = inputs
  logger.debug('Choosing theme')
  validateParams(adjectives, themes, history)

  let timeoutIndex = 0
  let chosenTheme = getRandomTheme(adjectives, themes)

  while (
    history.indexOf(chosenTheme) !== indexNotFound &&
    timeoutIndex < timeoutMax
  ) {
    chosenTheme = getRandomTheme(adjectives, themes)
    timeoutIndex += incrementAmount
  }

  if (timeoutIndex >= timeoutMax) {
    // Should never happen
    throw new Error('Theme Chooser Timed out')
  }
  logger.debug('Theme Chooser Done')

  return chosenTheme
}

/**
 * Creates a theme by combining a random adjective and a random theme.
 *
 * @access private
 * @param {Array} adjectives - An array of string adjectives.
 * @param {Array} themes - An array of string themes.
 * @returns {string} - The theme created by combining a random adjective and a random theme.
 */
function getRandomTheme(adjectives, themes) {
  const adjrandomNumber = Math.random() * adjectives.length
  const adjindex = Math.floor(adjrandomNumber)
  const randomNumber = Math.random() * themes.length
  const index = Math.floor(randomNumber)
  const ucAdjective = jsUcfirst(adjectives[adjindex])
  const ucTheme = jsUcfirst(themes[index])

  return `${ucAdjective} ${ucTheme}`
}

/**
 * Validates adjectives, themes, and history parameters.
 *
 * @param {Array.<string>} adjectives - A list of adjectives.
 * @param {Array.<string>} themes - A list of themes.
 * @param {Array.<string>} history - A list of themes created previously. Used to weed out duplicates.
 * @returns {undefined}
 */
function validateParams(adjectives, themes, history) {
  validateArray(adjectives, 'adjectives')
  validateArray(themes, 'themes')
  if (history.length >= themes.length) {
    throw new Error(
      'History parameter array is greater than or equal to themes parameter array.\n No New Themes Will Be Found'
    )
  }
}

/**
 * Validates an Array.
 *
 * @param {Array.<string>} array - The array to validate.
 * @param {string} name - The name of the array used in error messages.
 * @returns {undefined}
 */
function validateArray(array, name) {
  if (!Array.isArray(array)) {
    throw new Error(`${name} parameter is not an array`)
  } else if (array.length === emptyArrayLength) {
    throw new Error(`${name} parameter array is empty`)
  }
}

/**
 * Transforms the passed in string and makes the first character uppercase.
 *
 * @access private
 * @param {string} string - The string to transform.
 * @returns {string} - The passed in string with the first character changed to uppercase.
 */
function jsUcfirst(string) {
  return (
    string.charAt(indexOfFirstCharacter).toUpperCase() +
    string.slice(indexOfSecondCharacter)
  )
}
