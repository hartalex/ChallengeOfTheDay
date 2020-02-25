const winston = jest.requireActual('winston')
export default {
  info: jest.fn().mockImplementation(winston.info),
  configure: jest.fn().mockImplementation(winston.configure),
  error: jest.fn().mockImplementation(winston.error),
  warn: jest.fn().mockImplementation(winston.warn),
  debug: jest.fn().mockImplementation(winston.debug),
  format: winston.format,
  transports: winston.transports
}
