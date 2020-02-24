import logger from 'winston'
import fs from 'fs'

/**
 * Builds a history manager object.
 *
 * @param {string} historyFile - A file name to load and save history data to.
 * @param {number} historyMax - The maximum number of history items to store in the history file.
 * @returns {object} - The history manager object containing functions to loadHistory, addHistory, and saveHistory.
 */
export default function(historyFile, historyMax) {
  return {
    data: [],
    loadHistory: function() {
      return new Promise(function(resolve) {
        logger.debug('Loading history from file')
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
        logger.debug('Adding to history memory')
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
        logger.debug('Saving history to file')
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
