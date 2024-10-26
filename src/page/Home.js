import React, { useEffect } from "react";
import fetchData from "../components/fetchData";
import { useAtom } from "jotai";
import { weatherData } from "../components/states";
import style from "../styles/Home.module.scss";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

const Home = () => {
  const [weather, setWeather] = useAtom(weatherData);

  useEffect(() => {
    let query;
    if (localStorage.getItem("weather_location") === null) {
      query = undefined;
    } else {
      query = JSON.parse(localStorage.getItem("weather_location"));
    }
    fetchData(query, weather, setWeather);
  }, []);

  return (
    <motion.div className={style.background}>
      {!weather.results && !weather.isLoading && (
        <h1 className={style.loading}>no results were found</h1>
      )}
      {weather.isLoading && (
        <Icon
          className={style.loading}
          icon="svg-spinners:pulse-multiple"
          width="128px"
          height="128px"
        />
      )}
      {!weather.isLoading && weather.results && (
        <div className="weather">
          <div className={style.mainInfo}>
            <div className={style.title}>
              <h3>
                {weather.location.name}, {weather.location.region}
              </h3>
              <p>{weather.location.country}</p>
            </div>
            <div className={style.weather}>
              <motion.h2
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
              >
                {weather.current.temp_c}º C
              </motion.h2>
              <div className={style.condition}>
                <p>{weather.current.condition.text}</p>
                <img src={weather.current.condition.icon} alt="" />
              </div>
            </div>
          </div>
          <div className={style.extraInfo}>
            <div className={style.cards}>
              <div className={style.card}>
                <h4>Humidity</h4>
                <p>{weather.current.humidity}%</p>
              </div>
              <div className={style.card}>
                <h4>UV</h4>
                <p>{weather.current.uv}</p>
              </div>
              <div className={style.card}>
                <h4>Wind</h4>
                <p>
                  {weather.current.wind_kph} km/h {weather.current.wind_dir}
                </p>
              </div>
              <div className={style.card}>
                <h4>Pressure</h4>
                <p>{weather.current.pressure_mb}mbar</p>
              </div>
              <div className={style.card}>
                <h4>Real Feel</h4>
                <p>{weather.current.feelslike_c}º C</p>
              </div>
              <div className={style.card}>
                <h4>Heat Index</h4>
                <p>{weather.current.heatindex_c}º C</p>
              </div>
              <div className={style.card}>
                <h4>Sunrise</h4>
                <p>{weather.astro.sunrise}</p>
              </div>
              <div className={style.card}>
                <h4>Sunset</h4>
                <p>{weather.astro.sunset}</p>
              </div>
              <div className={style.card}>
                <h4>Moonrise</h4>
                <p>{weather.astro.moonrise}</p>
              </div>
              <div className={style.card}>
                <h4>Moonset</h4>
                <p>{weather.astro.moonset}</p>
              </div>
              <div className={style.card}>
                <h4>Moon Phase</h4>
                <p>{weather.astro.moon_phase}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
