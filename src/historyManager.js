import logger from 'winston'
import fs from 'fs'

/**
 * Builds a history manager object.
 *
 * @class HistoryManager
 * @param {string} historyFile - A file name to load and save history data to.
 * @param {number} historyMax - The maximum number of history items to store in the history file.
 */
export default function(historyFile, historyMax) {
  return {
    /**
     * @memberof HistoryManager
     * @instance
     * @access private */
    historyFile,
    /**
     * @memberof HistoryManager
     * @instance
     * @access private */
    historyMax,
    /**
     * @memberof HistoryManager
     * @instance
     * @access private */
    history: [],
    /**
     * Loads a string array of from the historyFile which is stored in the json format.
     *
     * @memberof HistoryManager
     * @instance
     * @returns {Array.<string>} - The history loaded from the file.
     */
    loadHistory: function() {
      logger.debug('Loading history from file')
      this.history = []
      try {
        const data = fs.readFileSync(this.historyFile)
        this.history = JSON.parse(data)
      } catch (error) {
        logger.warn(`Ignoring error loading history: ${error}`)
      }

      return this.history
    },
    /**
     * Adds a new string {theme} to the array history, if the array is larger than historyMax then the oldest string is bumped off the array.
     *
     * @memberof HistoryManager
     * @instance
     * @param {string} theme - The string to add to the history array.
     * @returns {Array.<string>} - The modified history array.
     */
    addHistory: function(theme) {
      logger.debug('Adding to history memory')
      // Add new Theme to History
      // Add item to beginning of array
      this.history.unshift(theme)
      // Check history length
      if (this.history.length > this.historyMax) {
        // Remove last item of array
        this.history.pop()
      }

      return this.history
    },
    /**
     * Saves a string array to the historyFile in the json format.
     *
     * @memberof HistoryManager
     * @instance
     * @returns {undefined}
     */
    saveHistory: function() {
      logger.debug('Saving history to file')
      // Save history
      fs.writeFileSync(this.historyFile, JSON.stringify(this.history))
    }
  }
}
