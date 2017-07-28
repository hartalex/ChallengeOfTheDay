module.exports = function (themes) {
  return new Promise(
    function (resolve, reject) {
      if (!Array.isArray(themes)) {
        reject(new Error('themes parameter is not an array'))
      }
      if (themes.length === 0) {
        reject(new Error('themes parameter array is empty'))
      }
      resolve(themes[Math.floor(Math.random() * themes.length)])
    })
}
