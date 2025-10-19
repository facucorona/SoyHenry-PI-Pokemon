const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoute = require("./pokemons.js");
const typesRoute = require("./types.js");
const { Pokemon } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonsRoute);
router.use("/types", typesRoute);
router.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

module.exports = router;
