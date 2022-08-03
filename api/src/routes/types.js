const { Router } = require("express");
const router = Router();
const { fetch } = require("cross-fetch");
const { Type } = require("../db");

router.get("/", async (req, res, next) => {
  let typesArray = [];

  await fetch("https://pokeapi.co/api/v2/type")
    .then((resp) => {
      return resp.json();
    })
    .then((json) => {
      json.results.map(async (type) => {
        typesArray.push(type.name);
        await Type.findOrCreate({
          where: {
            name: type.name,
            id: type.url.split("/")[6],
          },
        });
      });
      res.send(typesArray);
    });
});

module.exports = router;
