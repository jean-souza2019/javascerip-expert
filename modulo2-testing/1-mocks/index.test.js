const { error } = require('./src/constants')
const File = require("./src/file")
const assert = require('assert')

  ; (async () => {
    // invalid with empty file
    {
      const filePath = './mock/emptyFile-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJson(filePath)

      assert.rejects(result, expected)
    }

    // invalid header
    {
      const filePath = './mock/invalid-header.csv'
      const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
      const result = File.csvToJson(filePath)

      assert.rejects(result, expected)
    }

    // invalid max items
    {
      const filePath = './mock/fiveItems-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJson(filePath)

      assert.rejects(result, expected)
    }

    // success
    {
      const filePath = './mock/threeItems-valid.csv'
      const expected = [
        {
          id: 1,
          name: 'xuxa da silva',
          profession: 'developer',
          age: 120
        },
        {
          id: 2,
          name: 'jose da silva',
          profession: 'manager',
          age: 30
        },
        {
          id: 3,
          name: 'zezin',
          profession: 'QA',
          age: 25
        }
      ]
      const result = await File.csvToJson(filePath)

      assert.deepEqual(result, expected)
    }
  })()