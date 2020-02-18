jest.mock('fs')
import fs from 'fs'
import historyManager from './historyManager.js'
const history = historyManager('filename', 1)
describe('Test Suite', () => {
  describe('#HistoryManager()', () => {
    it('loadHistory Success', async () => {
      const expectedHistory = ['history1', 'history2']
      const response = await history.loadHistory()
      expect(response).toStrictEqual(expectedHistory)
    })
    it('loadHistory Failure', async () => {
      fs.readFile.mockImplementationOnce((_filename, callback) => {
        callback(new Error('Mock Error'))
      })

      const expectedHistory = []
      const response = await history.loadHistory()
      expect(response).toStrictEqual(expectedHistory)
    })
    it('addHistory Success', async () => {
      const historyArray = []
      const response = await history.addHistory(
        'Testy McTestFace',
        historyArray
      )
      expect(response).toStrictEqual(['Testy McTestFace'])
    })

    it('addHistory Success and item falls off array', async () => {
      const historyArray = []
      const response = await history.addHistory(
        'Testy McTestFace',
        historyArray
      )
      expect(response).toStrictEqual(['Testy McTestFace'])

      // Attempt to add second item to array
      const response2 = await history.addHistory('Testy McTestFace2', response)
      // First item has fallen off of the array
      expect(response2).toStrictEqual(['Testy McTestFace2'])
    })

    it('saveHistory Success', async () =>
      expect(history.saveHistory()).resolves.toBe())

    it('saveHistory Failure', async () => {
      fs.writeFile.mockImplementationOnce((_filename, _data, callback) => {
        callback(new Error('Mock Error'))
      })

      return expect(history.saveHistory([])).rejects.toThrowError('Mock Error')
    })
  })
})
