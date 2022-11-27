import Person from './person.js'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'
import DraftLog from 'draftlog'
export default class TerminalController {
  constructor(params) {
    this.print = {}
    this.data = {}
  }
  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    this.initializeTable(database, language)
  }
  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language))

    const table = chalkTable(this.getTableOptions(), data)
    this.print = console.draft(table)
    this.data = data
  }
  question(msg = '') {
    return new Promise((resolve) => this.terminal.question(msg, resolve))
  }
  closeTerminal() {
    this.terminal.close()
  }
  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(), this.data))
  }
  getTableOptions() {
    return {
      leftPad: 2,

      columns: [
        {
          field: 'id',
          name: chalk.cyan('ID'),
        },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.cyan('KmTraveled') },
        { field: 'from', name: chalk.cyan('ID') },
        { field: 'to', name: chalk.cyan('ID') },
      ],
    }
  }
}
