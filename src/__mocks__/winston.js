const winston = jest.requireActual('winston')
const override = true

let object = {
  info: jest.fn(),
  configure: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  format: winston.format,
  transports: winston.transports
}

if (override) {
  object = {
    info: jest.fn().mockImplementation(winston.info),
    configure: jest.fn().mockImplementation(winston.configure),
    error: jest.fn().mockImplementation(winston.error),
    warn: jest.fn().mockImplementation(winston.warn),
    debug: jest.fn().mockImplementation(winston.debug),
    format: winston.format,
    transports: winston.transports
  }
}

export default object
