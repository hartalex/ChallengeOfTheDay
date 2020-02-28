jest.mock('fs')
jest.mock('twit')
jest.mock('isomorphic-fetch')
jest.mock('winston')
jest.mock('./config.js', () => ({
  historyFile: 'fake file',
  historyMax: 90,
  slackUrl: 'fake url',
  themeTimeout: 50,
  twitter: {
    accessToken: 'fake token',
    accessTokenSecret: 'fake token secret',
    consumerKey: 'fake consumer',
    consumerSecret: 'fake consumer secret'
  }
}))
import app from './app'
import fetch from 'isomorphic-fetch'
import fs from 'fs'
import logger from 'winston'

/*
 * @group unit
 */
describe('Test Suite', () => {
  describe('#App()', () => {
    it('Success', async () => {
      await app()
      expect(logger.error).not.toHaveBeenCalled()
      expect(logger.debug).toHaveBeenCalledWith('Done')
    })

    it('Failure due to slackManager failing to post', async () => {
      fetch.mockImplementationOnce(() => {
        throw new Error('Mock Error')
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
