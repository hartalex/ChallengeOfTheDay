export const innerObject = {
  post: jest.fn().mockImplementation((_api, _object, callback) => {
    callback(null, 'Mock Tweet', 'Mock Response')
  })
}

export default jest.fn().mockReturnValue(innerObject)
