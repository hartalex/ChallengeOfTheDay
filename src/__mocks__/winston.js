const winston = jest.requireActual('winston')
const override = true

let object = {
  configure: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  format: winston.format,
  info: jest.fn(),
  transports: winston.transports,
  warn: jest.fn()
}

if (override) {
  object = {
    configure: jest.fn().mockImplementation(winston.configure),
    debug: jest.fn().mockImplementation(winston.debug),
    error: jest.fn().mockImplementation(winston.error),
    format: winston.format,
    info: jest.fn().mockImplementation(winston.info),
    transports: winston.transports,
    warn: jest.fn().mockImplementation(winston.warn)
  }
}

export default object
