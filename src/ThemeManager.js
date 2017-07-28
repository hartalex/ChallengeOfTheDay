module.exports = new Promise(
  function (resolve, reject) {
    var success = false
    var value = ''
    if (success) {
      resolve(value)
    } else {
      reject(new Error('Could not find a theme'))
    }
  })
