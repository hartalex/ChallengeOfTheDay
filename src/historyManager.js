const fs = require('fs')
module.exports = function (historyFile, historyMax) {
  return {
    data: [],
    LoadHistory: function () {
      return new Promise(function (resolve, reject) {
        fs.readFile(historyFile, function (err, data) {
          var retval = []
          if (!err) {
            // assuming history.json file is an array
            retval = JSON.parse(data)
          }
          resolve(retval)
        })
      })
    },
    AddHistory: function (theme, history) {
      return new Promise(function (resolve, reject) {
        // Add new Theme to History
        history.unshift(theme) // add item to begining of array
        // Check history length
        if (history.length > historyMax) {
          history.pop() // remove last item of array
        }
        resolve(history)
      })
    },
    SaveHistory: function (history) {
      return new Promise(function (resolve, reject) {
        // Save history
        fs.writeFile(historyFile, JSON.stringify(history), function (err) {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }
  }
}
