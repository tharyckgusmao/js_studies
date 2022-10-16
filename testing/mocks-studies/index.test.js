const { error } = require('./src/consts')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

;(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/forItems-valid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        name: 'Erick',
        id: 123,
        profession: 'Javascript Instructor',
        age: 1997,
      },
      {
        name: 'Joaozinho',
        id: 231,
        profession: 'Js',
        age: 1992,
      },
      {
        name: 'Joaozinho',
        id: 2231,
        profession: 'Js',
        age: 1992,
      },
    ]
    await deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
