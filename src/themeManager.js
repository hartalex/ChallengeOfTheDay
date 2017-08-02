module.exports = function (timeoutMax) {
  return {
    chooseTheme: function (themes, history) {
      return new Promise(
        function (resolve, reject) {
          if (!Array.isArray(themes)) {
            reject(new Error('themes parameter is not an array'))
          } else {
            if (themes.length === 0) {
              reject(new Error('themes parameter array is empty'))
            } else {
              // ensure history is defined
              if (!history) {
                history = []
              }
              if (history.length >= themes.length) {
                reject(new Error('History parameter array is greater than or equal to themes parameter array.\n No New Themes Will Be Found'))
              } else {
                var timeoutIndex = 0
                var chosenTheme = getRandomTheme(themes)

                // loop has a timeout just incase of a bug
                while (history.indexOf(chosenTheme) !== -1 && timeoutIndex++ < timeoutMax) {
                  chosenTheme = getRandomTheme(themes)
                }

                if (timeoutIndex >= timeoutMax) {
                  // Should never happen
                  reject(new Error('Theme Chooser Timed out'))
                } else {
                  resolve(chosenTheme)
                }
              }
            }
          }
        })
    }
  }
}

function getRandomTheme (themes) {
  var randomNumber = Math.random() * themes.length
  var index = Math.floor(randomNumber)
  return themes[index]
}
