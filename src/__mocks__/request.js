module.exports = jest.fn().mockImplementation((_object, callback) => {
  callback(null, { statusCode: 200 }, '')
})
