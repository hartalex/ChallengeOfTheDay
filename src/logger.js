import logger from 'winston'
/**
 * Sets up winston for logging.
 *
 * @returns {undefined}
 */
export function configureLogger() {
  // Configure Logging
  const myFormat = logger.format.printf(
    ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
  )
  logger.configure({
    level: 'info',
    format: logger.format.combine(
      logger.format.colorize({ all: true }),
      logger.format.errors({ stack: true }),
      logger.format.timestamp(),
      myFormat
    ),
    transports: [new logger.transports.Console()]
  })
}
