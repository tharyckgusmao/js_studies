'use strict'

const {
  watch,
  promises: { readFile },
} = require('fs')

class File {
  watch(filename) {
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log(filename)
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()
// watch(__filename, file.watch)
watch(__filename, file.watch.bind(file))
