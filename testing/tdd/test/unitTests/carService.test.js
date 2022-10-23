const { describe, it, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const CarService = require('../../src/service/carService')
const Transaction = require('../../src/entities/transaction')

const { join } = require('path')
const assert = require('assert')
const cardsDatabase = join(__dirname, './../../database/', 'cars.json')

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
}

const Sinon = require('sinon')

describe('CarService Suirte Tests', () => {
  let carService = {}
  let sandbox = null
  before(() => {
    carService = new CarService({
      cars: cardsDatabase,
    })
  })
  beforeEach(() => {
    sandbox = Sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('shold retieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)
    expect(result).to.be.lte(data.length).and.be.gte(0)
  })
  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory
    const carIdIndex = 0

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIdIndex]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })
  it('give a carCategory it should return an available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car)

    sandbox.spy(carService, carService.chooseRandomCar.name)

    const result = await carService.getAVailableCar(carCategory)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(car.id))
    expect(result).to.be.deep.equal(expected)
  })
  it('given a carCategory,customer nad numerOfDays it shoul calculate final amount in real', async () => {
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50

    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = 37.6
    const numberOfDays = 5

    sandbox
      .stub(carService, 'taxesBasedOAge')
      .get(() => [{ from: 40, to: 50, then: 1.3 }])

    const expected = carService.currencyFormat.format(244.4)
    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )
    expect(result).to.be.deep.equal(expected)
  })

  it('given a customer and a car category it should return a transaction receipt', async () => {
    const car = Object.create(mocks.validCar)
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    }

    const customer = { ...mocks.validCustomer, age: 20 }
    const numberOfDays = 5
    const dueDate = '10 de novembro de 2020'

    const today = new Date(2020, 10, 5)

    sandbox.useFakeTimers(today.getTime())
    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car)

    const expectedAmount = carService.currencyFormat.format(206.8)
    const result = await carService.rent(customer, carCategory, numberOfDays)
    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate: dueDate,
    })
    expect(result).to.be.deep.equal(expected)
  })
})
