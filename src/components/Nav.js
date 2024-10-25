import React from "react";
import style from "../styles/Nav.module.scss";

const Nav = () => {
  return (
    <nav>
      <h1>Breeze Aura</h1>
      <form>
        <input type="text" />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Nav;
