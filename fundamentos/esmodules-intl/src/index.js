import TerminalController from './terminalController.js'
import database from '../database.json'
import Person from './person.js'
import { save } from './repository.js'

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'
const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question()
    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('process finished!!')
      return
    }
    // 6 Bike 10000 01-01-2001 2002-02-02
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    save(person)
    return mainLoop()
  } catch (error) {
    console.log(error)
    console.log('ERROR')
    return mainLoop()
  }
}

await mainLoop()
