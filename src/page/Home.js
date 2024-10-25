import React, { useEffect } from "react";
import fetchData from "../components/fetchData";
import { useAtom } from "jotai";
import { weatherData } from "../components/states";
import style from "../styles/Main.module.scss";

const Home = () => {
  const [weather, setWeather] = useAtom(weatherData);

  useEffect(() => {
    let query;
    if (localStorage.getItem("weather") === null) {
      query = undefined;
    } else {
      query = JSON.parse(localStorage.getItem("weather"));
    }

    fetchData(query, weather, setWeather);
  }, []);

  return (
    <>
      {weather.isLoading && <h1>I am Loading...</h1>}
      {!weather.isLoading && (
        <div className={style.background}>
          <div className="weather">
            <div className="title">
              <h2>
                {weather.location.name}, {weather.location.region}
              </h2>
              <h3>{weather.location.country}</h3>
            </div>
            <div className="weather">
              <h1>
                {weather.current.temp_c}º C / {weather.current.temp_f}º F
              </h1>
              <div className="condition">
                <h3>{weather.current.condition.text}</h3>
                <img src={weather.current.condition.icon} alt="" />
              </div>
            </div>
          </div>
          <div className="extraInfo">
            <div className="cards">
              <div className="card">
                <h3>Humidity</h3>
                <h4>{weather.current.humidity}%</h4>
              </div>
              <div className="card">
                <h3>UV</h3>
                <h4>{weather.current.uv}</h4>
              </div>
              <div className="card">
                <h3>Real Feel</h3>
                <h4>
                  {weather.current.feelslike_c}º C /{" "}
                  {weather.current.feelslike_f}º F
                </h4>
              </div>
              <div className="card">
                <h3>Wind</h3>
                <h4>
                  {weather.current.wind_kph} km/h {weather.current.wind_dir}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
