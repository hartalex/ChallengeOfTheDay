jest.mock('fs')
import fs from 'fs'
import { HistoryManager } from './historyManager.js'

/*
 * @group unit
 */
describe('test Suite', () => {
  describe('historymanager()', () => {
    const history = new HistoryManager('filename', 1)
    it('loadHistory Success', () => {
      const expectedHistory = ['history1', 'history2']
      const response = history.loadHistory()
      expect(response).toStrictEqual(expectedHistory)
    })
    it('loadHistory failure', () => {
      fs.readFileSync.mockImplementationOnce(() => {
        throw new Error('Mock Error')
      })

      const expectedHistory = []
      const response = history.loadHistory()
      expect(response).toStrictEqual(expectedHistory)
    })
    it('addHistory success', () => {
      const historyArray = []
      const response = history.addHistory('Testy McTestFace', historyArray)
      expect(response).toStrictEqual(['Testy McTestFace'])
    })

    it('addHistory success and item falls off array', () => {
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

      expect(() => {
        history.saveHistory()
      }).toThrow('Mock Error')
    })
  })
})
