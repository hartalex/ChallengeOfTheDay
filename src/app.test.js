jest.mock('fs')
jest.mock('twit')
jest.mock('request')
jest.mock('winston')
import app from './app'
import request from 'request'
import fs from 'fs'
import logger from 'winston'

describe('Test Suite', () => {
  describe('#App()', () => {
    it('Success', async () => {
      await app()
      expect(logger.error).not.toHaveBeenCalled()
      expect(logger.debug).toHaveBeenCalledWith('Done')
    })

    it('Failure due to slackManager failing to post', async () => {
      request.mockImplementationOnce((_object, callback) => {
        callback('Mock Error', { statusCode: 200 }, 'mock body')
      })
      await app()
    })

    it('Failure due to historyManager failing to load', async () => {
      fs.readFile.mockImplementationOnce((_filename, callback) => {
        callback(new Error('Mock Error'))
      })
      await app()
      expect(logger.error).toHaveBeenCalled()
    })
  })
})
