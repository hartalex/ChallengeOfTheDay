module.exports = {
  readFile: jest.fn().mockImplementation((_filename, callback) => {
    callback(null, '["history1","history2"]')
  }),
  writeFile: jest.fn().mockImplementation((_filename, _data, callback) => {
    callback(null)
  })
}
