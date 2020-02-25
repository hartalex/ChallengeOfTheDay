import logger from 'winston'

const myFormat = logger.format.printf(
  ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
)
logger.configure({
  level: 'debug',
  format: logger.format.combine(
    logger.format.colorize({ all: true }),
    logger.format.errors({ stack: true }),
    logger.format.timestamp(),
    myFormat
  ),
  transports: [new logger.transports.Console()]
})
