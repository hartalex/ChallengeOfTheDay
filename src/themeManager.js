
module.exports = function (themes, history) {
  var timeoutMax = 1000
  return new Promise(
    function (resolve, reject) {
      if (!Array.isArray(themes)) {
        reject(new Error('themes parameter is not an array'))
      }
      if (themes.length === 0) {
        reject(new Error('themes parameter array is empty'))
      }
      // ensure history is defined
      if (!history) {
        history = []
      }
      if (history.length >= themes.length) {
        reject(new Error('History parameter array is greater than or equal to themes parameter array.\n No New Themes Will Be Found'))
      }
      var timeoutIndex = 0
      var chosenTheme = themes[Math.floor(Math.random() * themes.length)]
      // loop has a timeout just incase of a bug
      while (history.indexOf(chosenTheme) !== -1 && timeoutIndex++ < timeoutMax) {
        chosenTheme = themes[Math.floor(Math.random() * themes.length)]
      }

      if (timeoutIndex >= timeoutMax) {
        // Should never happen
        reject(new Error('Theme Chooser Timed out'))
      } else {
        resolve(chosenTheme)
      }
    })
}
