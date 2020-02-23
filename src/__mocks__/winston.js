export default {
  info: jest.fn(),
  configure: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  format: { simple: jest.fn() },
  transports: { Console: jest.fn() }
}
