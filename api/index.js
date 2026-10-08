const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
//
// Solo cuando se ejecuta directo (`npm start`). Vercel importa este mismo archivo
// para publicarlo como funcion en /api/*, y si esto corriera en cada arranque
// cold de la funcion, el `force: true` borraria la base entera.
if (require.main === module) {
  conn.sync({ force: true }).then(() => {
    console.log("Models and DB Synced");
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  });
}

/*
 * Entry point serverless.
 * ----------------------------------------------------------------------------
 * Cuando Vercel publica este archivo como funcion en /api/*, no se ejecuta nada
 * de lo de arriba: no hay `listen()` en serverless. Vercel importa el archivo y
 * usa lo que exporta. Hace dos cosas:
 *
 * 1. Saca el prefijo /api. La app de Express tiene las rutas montadas desde la
 *    raiz (`server.use("/", routes)`), asi que si le llegaramos "/api/pokemons"
 *    no encontraria nada. Vercel entrega la URL completa, y con esto queda
 *    "/pokemons", que es lo que Express espera.
 *
 * 2. Carga `pg` de forma explicita. Sequelize lo pide con un require dinamico
 *    (`_loadDialectModule('pg')`) y el tracer de Vercel no lo sigue, asi que sin
 *    esta linea la funcion se despliega sin la libreria y cada request muere con
 *    "Please install pg package manually".
 */
require("pg");

module.exports = (req, res) => {
  const url = req.url || "/";
  req.url = url.replace(/^\/api/, "") || "/";
  return server(req, res);
};