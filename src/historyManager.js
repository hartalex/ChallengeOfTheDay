const fs = require('fs')
module.exports = function(historyFile, historyMax) {
  return {
    data: [],
    loadHistory: function() {
      return new Promise(function(resolve) {
        fs.readFile(historyFile, function(err, data) {
          let retval = []
          if (!err) {
            // Assuming history.json file is an array
            retval = JSON.parse(data)
          }
          resolve(retval)
        })
      })
    },
    addHistory: function(theme, history) {
      return new Promise(function(resolve) {
        console.log('Adding to history')
        // Add new Theme to History
        // Add item to begining of array
        history.unshift(theme)
        // Check history length
        if (history.length > historyMax) {
          // Remove last item of array
          history.pop()
        }
        resolve(history)
      })
    },
    saveHistory: function(history) {
      return new Promise(function(resolve, reject) {
        // Save history
        fs.writeFile(historyFile, JSON.stringify(history), function(err) {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }
  }
}
