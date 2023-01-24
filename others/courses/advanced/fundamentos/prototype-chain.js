const assert = require('assert')
const obj = {}
const arr = []
const fn = () => {}

//Interfamente, objetos literais viram funçoes explicitas
console.log('New Object() is {}?', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

function Employee() {}
Employee.prototype.salary = () => 'salary**'

console.log(Employee.prototype.salary())

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profiShare = () => 'profishare**'
console.log(Supervisor.prototype.salary())
console.log(Supervisor.prototype.profiShare())

console.log(new Supervisor().__proto__)
