import React, { useEffect } from "react";
import fetchData from "../components/fetchData";
import { useAtom } from "jotai";
import { weatherData } from "../components/states";
import style from "../styles/Home.module.scss";
import { motion, AnimatePresence } from "framer-motion";
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

  const getTime = () => {
    const time = weather.location.localtime.split(" ")[1];

    if (!isDay()) {
      document.body.style.background = `linear-gradient(170deg, rgba(2, 26, 58, 0.85), rgb(1, 22, 49))`;
      document.body.style.background = `linear-gradient(170deg, rgba(2, 22, 48, 0.85), rgb(0, 17, 37))`;
    } else {
      document.body.style.background = `linear-gradient(170deg, rgba(3, 32, 71, 0.8), rgb(3, 30, 66))`;
    }
    return time;
  };

  const isDay = () => {
    if (!weather.location.localtime) return;
    const currentTime = weather.location.localtime.split(" ")[1];
    const currentHours = currentTime.split(":")[0];
    const currentMinutes = currentTime.split(":")[1];
    const currentTotal = currentHours * 60 + Number(currentMinutes);

    const sunrise = weather.astro.sunrise.split(" ")[0];
    const sunriseHours = Number(sunrise.split(":")[0]);
    const sunriseMinutes = sunrise.split(":")[1];
    const sunriseTotal = sunriseHours * 60 + Number(sunriseMinutes);

    const sunset = weather.astro.sunset.split(" ")[0];
    const sunsetHours = Number(sunset.split(":")[0]) + 12;
    const sunsetMinutes = sunset.split(":")[1];
    const sunsetTotal = sunsetHours * 60 + Number(sunsetMinutes);

    if (currentTotal > sunriseTotal && currentTotal < sunsetTotal) {
      return true;
    } else {
      return false;
    }
  };

  const fade = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      className={`${style.background} ${isDay() ? "" : style.night}`}
    >
      {!weather.results && !weather.isLoading && (
        <AnimatePresence mode="wait">
          <motion.h1 variants={fade} className={style.loading}>
            no results were found
          </motion.h1>
        </AnimatePresence>
      )}
      {weather.isLoading && (
        <AnimatePresence mode="wait">
          <motion.div variants={fade}>
            <Icon
              className={style.loading}
              icon="svg-spinners:pulse-multiple"
              width="128px"
              height="128px"
            ></Icon>
          </motion.div>
        </AnimatePresence>
      )}
      {!weather.isLoading && weather.results && (
        <AnimatePresence mode="wait">
          <motion.div variants={fade} className="weather-container">
            <div className={style.mainInfo}>
              <div className={style.weather}>
                <h2>{weather.current.temp_c}º C</h2>
                <div className={style.condition}>
                  <p>{weather.current.condition.text}</p>
                  <img src={weather.current.condition.icon} alt="" />
                </div>
                <div className={style.title}>
                  <h3>
                    {weather.location.name}, {weather.location.region}
                  </h3>
                  <p>{weather.location.country}</p>
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
                  <h4>Current Time</h4>
                  <p>{getTime()}</p>
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
            <Icon
              className={style.crescent}
              icon={
                isDay()
                  ? "line-md:sunny-filled"
                  : "line-md:moon-rising-twotone-alt-loop"
              }
              style={isDay() ? { color: "#f7c631" } : ""}
              width="8rem"
              height="8rem"
            />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default Home;
