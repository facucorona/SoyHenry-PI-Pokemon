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
        .then((s) => {
          if (s.status !== 404) {
            return s.json();
          } else {
            return [];
          }
        })
        .then((i) => {
          if (i.name) {
            let typesString = "";
            i.types.forEach((t, index) => {
              typesString = typesString + t.type.name + " ";
            });
            i.name = i.name.charAt(0).toUpperCase() + i.name.slice(1);
            // finalString = typesString.substring(0, typesString.length - 1)

            return {
              pokemonType: typesString,
              hp: i.stats[0].base_stat,
              defense: i.stats[2].base_stat,
              attack: i.stats[1].base_stat,
              speed: i.stats[5].base_stat,
              weight: i.weight,
              height: i.height,
              image: i.sprites.other.dream_world.front_default,
              name: i.name,
              id: i.id,
            };
          }
          return [];
        });
      //busca en DB
      let searchDb = await Pokemon.findAll()
        .then((db) => {
          if (db === null || db === undefined) {
            db = [];
          }
          return db;
        })
        .then((a) => {
          let newSearch = a.map((a) => {
            let string = "";
            let array = a.pokemonType.split(",");
            array.forEach((t) => {
              string = string + t + " ";
            });
            a.pokemonType = string;

            if (a.name.toLowerCase() === name.toLowerCase()) {
              return a;
            }
            return undefined;
          });
          return newSearch;
        });
      let fullArray = searchDb.concat(searchApi).filter((el) => el != null);
      res.send(fullArray);
    } else {
      //verificar porque no anda al incluir la relacion Type
      // let pokeArrayDb = await Pokemon.findAll({include: Type})
      let pokeArrayDb = await Pokemon.findAll();

      pokeArrayDb = pokeArrayDb.filter((p) => p.logicDelete !== true);

      pokeArrayDb.forEach((p) => {
        let string = "";
        let array = p.pokemonType.split(",");
        array.forEach((t) => {
          string = string + t + " ";
        });
        p.pokemonType = string;
      });

      let pokeArrayAPI = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=00&limit=40"
      )
        .then((resp) => resp.json())
        .then((array) => {
          array = array.results;
          return Promise.all(
            array.map(async (pk) => {
              if (pk.url) {
                let info = await fetch(pk.url).then((i) => i.json());

                let typesString = "";
                info.types.forEach((t) => {
                  typesString = typesString + t.type.name + " ";
                });
                info.name =
                  info.name.charAt(0).toUpperCase() + info.name.slice(1);

                return {
                  pokemonType: typesString,
                  hp: info.stats[0].base_stat,
                  defense: info.stats[2].base_stat,
                  attack: info.stats[1].base_stat,
                  speed: info.stats[5].base_stat,
                  weight: info.weight,
                  height: info.height,
                  image: info.sprites.other.dream_world.front_default,
                  name: info.name,
                  id: info.id,
                };
              }
              return pk;
            })
          );
        });

      let fullArray = pokeArrayDb.concat(pokeArrayAPI);
      res.status(200).send(fullArray);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    //  console.log(id)
    if (id.length < 5) {
      let info = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
        (i) => i.json()
      );

      let typesString = "";
      info.types.forEach((t) => {
        typesString = typesString + t.type.name + " ";
      });

      info.name = info.name.charAt(0).toUpperCase() + info.name.slice(1);

      return res.send({
        pokemonType: typesString,
        hp: info.stats[0].base_stat,
        defense: info.stats[2].base_stat,
        attack: info.stats[1].base_stat,
        speed: info.stats[5].base_stat,
        weight: info.weight,
        height: info.height,
        image: info.sprites.other.dream_world.front_default,
        name: info.name,
        id: info.id,
      });
    } else {
      let searchDb = await Pokemon.findAll()
        .then((db) => {
          if (db === null || db === undefined) {
            db = [];
          }
          return db;
        })
        .then((a) => {
          if (a !== []) {
            // console.log(a)
            let newSearch = a.map((a) => {
              if (a.id === id) {
                //formater pokemonType
                let string = "";
                let array = a.pokemonType.split(",");
                array.forEach((t) => {
                  string = string + t + " ";
                });
                // string = string.substring(0, a.pokemonType.length - 1)
                a.pokemonType = string;
                return a;
              }
              return undefined;
            });
            return newSearch;
          }
        });
      searchDb = searchDb.filter(
        (a) => a !== null && a !== undefined && a !== []
      );
      res.send(searchDb);
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

    name = name.charAt(0).toUpperCase() + name.slice(1);

    const exist = await Pokemon.findOne({ where: { name: name } });
    if (exist)
      return res.status(300).json({ info: `${name} already Exists in DB` });

    // await fetch(`${process.env.REACT_APP_HOST_BACK}/types`);
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
    res.status(200).send(newPokemon);
  } catch (err) {
    next(err);
  }
});

router.put("/delete/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let foundPk = await Pokemon.destroy({
      where: {
        id: [id],
      },
    });

    res.status(200).send("ok");
  } catch (err) {
    next(err);
  }
});

//el primer key/value del objeto req.body DEBE SER id:xxxxxxxxxxxx
router.put("/edit/:id", async (req, res, next) => {
  try {
    let edit = req.body;
    let id = req.params.id;

    let keys = Object.keys(edit);
    keys.shift();

    let values = Object.values(edit);
    values.shift();

    keys.map(async (k, i) => {
      await Pokemon.update(
        {
          [k]: values[i],
        },
        {
          where: {
            id: [id],
          },
        }
      );
    });

    // let product = await Products.findOne({ where: { id: id } });

    // if (edit.addGenre) {
    //     edit.addGenre.forEach(async (e) => {
    //         let genre = await Genre.findOne({ where: { name:  e} });
    //         await product.addGenre(genre)
    //     });
    // }
    // if (edit.rmvGenre) {
    //     edit.rmvGenre.forEach(async (e) => {
    //         let genre = await Genre.findOne({ where: { name:  e} });
    //         await product.removeGenre(genre)
    //     });
    // }
    // if (edit.addPlat) {
    //     edit.addPlat.forEach(async (e) => {
    //         let plat = await Platforms.findOne({ where: { name:  e} });
    //         await product.addPlatforms(plat)
    //     });
    // }
    // if (edit.rmvPlat) {
    //     edit.rmvPlat.forEach(async (e) => {
    //         let plat = await Platforms.findOne({ where: { name:  e} });
    //         await product.removePlatforms(plat)
    //     });
    // }

    res.status(200).send("Pokémon editado!");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
