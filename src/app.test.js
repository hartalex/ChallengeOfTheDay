jest.mock('fs')
jest.mock('twit')
jest.mock('request')
jest.unmock('./config')
import app from './app.js'
import request from 'request'
import fs from 'fs'

describe('Test Suite', () => {
  describe('#App()', () => {
    it('Success', async () => {
      const realConsole = console
      try {
        console.log = jest.fn()
        console.error = jest.fn()
        await app()
        expect(console.error).not.toHaveBeenCalled()
        // expect(console.log).toHaveBeenCalledWith('Done')
      } finally {
        console = realConsole
      }
    })

    it('Failure due to slackManager failing to post', async () => {
      const realConsole = console
      try {
        console.log = jest.fn()
        console.error = jest.fn()
        request.mockImplementationOnce((_object, callback) => {
          callback('Mock Error', { statusCode: 200 }, 'mock body')
        })
        await app()
      } finally {
        console = realConsole
      }
    })

    it('Failure due to historyManager failing to load', async () => {
      const realConsole = console
      try {
        console.log = jest.fn()
        console.error = jest.fn()
        fs.readFile.mockImplementationOnce((_filename, callback) => {
          callback(new Error('Mock Error'))
        })
        await app()
      } finally {
        console = realConsole
      }
    })
  })
})
