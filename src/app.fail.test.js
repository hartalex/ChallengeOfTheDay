jest.mock('fs')
jest.mock('twit')
jest.mock('request')
jest.mock('./config')
const app = require('./app.js')

describe('Test Suite', () => {
  describe('#App()', () => {
    it('Failure', async () => {
      const realProcess = process
      const realConsole = console
      try {
        process.exit = jest.fn()
        console.error = jest.fn()
        console.log = jest.fn()
        await app()
        expect(console.error).toHaveBeenCalledWith(
          'Slack URL is not defined in config.js'
        )
        expect(process.exit).toHaveBeenCalledWith(1)
      } finally {
        process = realProcess
        console = realConsole
      }
    })
  })
})
