module.exports = function (themes) {
  return new Promise(
    function (resolve, reject) {
      var success = false
      var value = ''
      success = true
      if (themes.length === 0) {
        reject(new Error('themes.js array is empty'))
      }
      value = themes[themes.length - 1]
      if (success) {
        resolve(value)
      }
    })
}
