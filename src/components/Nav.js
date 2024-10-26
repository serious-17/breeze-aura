import React, { useState } from "react";
import style from "../styles/Nav.module.scss";
import { useAtom } from "jotai";
import { weatherData } from "./states";
import fetchData from "./fetchData";
import { Icon } from "@iconify/react/dist/iconify.js";

const Nav = () => {
  const [weather, setWeather] = useAtom(weatherData);
  const [search, setSearch] = useState("");

  const searchLocation = (e) => {
    e.preventDefault();
    setWeather({ ...weather, isLoading: true });
    fetchData(search, weather, setWeather);
    setSearch("");
  };

  return (
    <nav>
      <h1>Breeze Aura</h1>

      <form onSubmit={searchLocation}>
        <div className={style.searchBar}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            required
          />
          <button type="submit">
            <Icon icon="basil:search-outline" width="1.7rem" height="1.7rem" />
          </button>
        </div>
      </form>
    </nav>
  );
};

export default Nav;
