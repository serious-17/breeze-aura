import React, { useState } from "react";
import style from "../styles/Nav.module.scss";
import { useAtom } from "jotai";
import { weatherData } from "./states";
import fetchData from "./fetchData";

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
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Nav;
