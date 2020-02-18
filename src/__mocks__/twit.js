export const innerObject = {
  post: jest.fn().mockImplementation((_api, _object, callback) => {
    callback(null, 'Mock Tweet', 'Mock Response')
  })
}

module.exports = jest.fn().mockReturnValue(innerObject)
