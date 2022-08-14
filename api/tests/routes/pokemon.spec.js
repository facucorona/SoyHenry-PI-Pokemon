/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
      name: 'Pikachu',

      hp: 20,
      attack: 23,
      defense: 22,
      speed: 45,
      weight: 65,
      height: 23,
      pokemonType: "grass, fire",
      image: "https://google.com/foto.jpg",
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
  describe('Pokemon POST', ()=>{
    it('should get 200', (()=>{
      agent.post('/pokemons').expect(200)
    }))
  })
});

//agregado