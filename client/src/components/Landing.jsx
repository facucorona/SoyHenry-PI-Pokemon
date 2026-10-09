import React from "react";
import { NavLink } from "react-router-dom";
import style from "./styles/Landing.module.css";

/*
 * `.stage` es un marco transparente que reproduce la caja donde el navegador
 * dibuja la imagen de fondo, para que el boton caiga encima del circulo de la
 * Poke-ball y no dependa del viewport.
 */
export function Landing() {
  return (
    <div className={style.container}>
      <div className={style.stage}>
        <NavLink to="/home" className={style.buttonLink}>
          <button title="enter button" className={style.button}>
            Enter
            <br />
            Pokédex
          </button>
        </NavLink>

        <h6 className={style.press}>press the button</h6>
      </div>
    </div>
  );
}

export default Landing;