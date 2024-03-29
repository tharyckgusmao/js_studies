const Sinon = require('sinon')
const Service = require('./src/service')
const { rejects, deepStrictEqual } = require('assert')
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'
const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json'),
}
;(async () => {
  const service = new Service()

  const stub = Sinon.stub(service, service.makeRequest.name)
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)
  {
    const expected = {
      name: 'Tatooine',
      surfaceWater: '1',
      apperedIn: 5,
    }
    const results = await service.getPlanets(BASE_URL_1)
    deepStrictEqual(results, expected)
  }
  {
    const expected = {
      name: 'Alderaan',
      surfaceWater: '40',
      apperedIn: 2,
    }
    const results = await service.getPlanets(BASE_URL_2)
    deepStrictEqual(results, expected)
  }
})()
