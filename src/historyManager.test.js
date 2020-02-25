jest.mock('fs')
import fs from 'fs'
import historyManager from './historyManager.js'
const history = historyManager('filename', 1)
describe('Test Suite', () => {
  describe('#HistoryManager()', () => {
    it('loadHistory Success', () => {
      const expectedHistory = ['history1', 'history2']
      const response = history.loadHistory()
      expect(response).toStrictEqual(expectedHistory)
    })
    it('loadHistory Failure', () => {
      fs.readFileSync.mockImplementationOnce(() => {
        throw new Error('Mock Error')
      })

      const expectedHistory = []
      const response = history.loadHistory()
      expect(response).toStrictEqual(expectedHistory)
    })
    it('addHistory Success', () => {
      const historyArray = []
      const response = history.addHistory('Testy McTestFace', historyArray)
      expect(response).toStrictEqual(['Testy McTestFace'])
    })

    it('addHistory Success and item falls off array', () => {
      const historyArray = []
      const response = history.addHistory('Testy McTestFace', historyArray)
      expect(response).toStrictEqual(['Testy McTestFace'])

      // Attempt to add second item to array
      const response2 = history.addHistory('Testy McTestFace2', response)
      // First item has fallen off of the array
      expect(response2).toStrictEqual(['Testy McTestFace2'])
    })

    it('saveHistory Success', () => expect(history.saveHistory()).toBe())

    it('saveHistory Failure', () => {
      fs.writeFileSync.mockImplementationOnce(() => {
        throw new Error('Mock Error')
      })

      return expect(() => {
        history.saveHistory()
      }).toThrowError('Mock Error')
    })
  })
})
