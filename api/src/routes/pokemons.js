const { Router } = require("express");
const router = Router();

const { json } = require("body-parser");
const { fetch } = require("cross-fetch");
const { Op } = require("sequelize");
const { Pokemon, Type } = require("../db");
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    if (req.query.name) {

        let { name } = req.query;
        name = name.toLowerCase();

        //busca en api externa
        let searchApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(s=>{
            if (s.status !== 404){ return s.json()}
            else{
              return []
            }
         }).then(i=>{            
            if (i.name){
              let typesString = "";
              i.types.forEach((t)=>{
                  typesString = typesString + t.type.name + ", "
                  }) 
              return({
              pokemonType : typesString,
              hp : i.stats[0].base_stat,
              defense : i.stats[2].base_stat,
              attack : i.stats[1].base_stat,
              speed : i.stats[5].base_stat,
              weight : i.weight,
              height : i.height,
              image : i.sprites.other.dream_world.front_default,
              name : i.name,
              id : i.id,
            })

            }
            return []
          })
        //busca en DB
        let searchDb = await Pokemon.findAll()
          .then((db)=>{
            if(db === null || db === undefined){db=[]}
            return db
          }).then((a)=>{
            let newSearch = a.map((a)=>{      
            if (a.name.toLowerCase() === name.toLowerCase()){return a}
            return undefined
            })
            return newSearch
          })

        let fullArray = searchDb.concat(searchApi).filter(el => el != null)

        
        res.send(fullArray);

    } else {
      let pokeArrayDb = await Pokemon.findAll({include: Type})                     

      let pokeArrayAPI = await fetch("https://pokeapi.co/api/v2/pokemon?offset=00&limit=40")
      .then((resp) => resp.json())
      .then((array)=>{
        
        array = array.results                
        return Promise.all(array.map(async(pk)=>{
          if (pk.url){
            
              let info = await fetch(pk.url).then(i=>i.json());
              
              let typesString = "";
              info.types.forEach((t)=>{
                  typesString = typesString + t.type.name + ", "
                  }) 
          return({
              pokemonType : typesString,
              hp : info.stats[0].base_stat,
              defense : info.stats[2].base_stat,
              attack : info.stats[1].base_stat,
              speed : info.stats[5].base_stat,
              weight : info.weight,
              height : info.height,
              image : info.sprites.other.dream_world.front_default,
              name : info.name,
              id : info.id,
            })
          }
          return pk;
        }))
      })

   let fullArray = pokeArrayDb.concat(pokeArrayAPI)         
   res.send(fullArray)

  } }catch (err) {
    next(err);
  }
});

router.get("/:id", async(req, res, next) => {
  try {
   let id = req.params.id;
   if (id.length < 5){ let info = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(i=>i.json());
              
        let typesString = "";
        info.types.forEach((t)=>{
            typesString = typesString + t.type.name + ", "
            }) 
        return res.send({
            pokemonType : typesString,
            hp : info.stats[0].base_stat,
            defense : info.stats[2].base_stat,
            attack : info.stats[1].base_stat,
            speed : info.stats[5].base_stat,
            weight : info.weight,
            height : info.height,
            image : info.sprites.other.dream_world.front_default,
            name : info.name,
            id : info.id,
          })
    }else{
       let searchDb = await Pokemon.findAll().then((db)=>{
            if(db === null || db === undefined){db=[]}
            return db
            }).then((a)=>{
            if(db !== []){
              let newSearch = a.map((a)=>{      
                  if (a.id === id){return a}
                  return undefined
              })
              return newSearch
             }
            })
        res.send(searchDb[0])
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let {
      name,
      hp,
      attack,
      defense,
      speed,
      weight,
      height,
      pokemonType,
      image,
    } = req.body;

    await fetch(`http://localhost:3001/types`);
    let newPokemon = await Pokemon.create({
      name: name,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      weight: weight,
      height: height,
      pokemonType: pokemonType,
      image: image,
    });
    let pokemonTypes = pokemonType.split(", ");
    pokemonTypes.forEach(async (typ) => {
      let typeSearch = await Type.findOne({
        where: {
          name: typ,
        },
      });

      let relationship = newPokemon.addType(typeSearch);
    });
    res.send(newPokemon);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

