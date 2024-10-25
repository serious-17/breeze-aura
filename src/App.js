import React, { useEffect } from "react";
import fetchData from "./components/fetchData";
import { useAtom } from "jotai";
import { weatherData } from "./components/states";

function App() {
  const [weather, setWeather] = useAtom(weatherData);

  useEffect(() => {
    let query;
    if (localStorage.getItem("weather") === null) {
      query = undefined;
    } else {
      query = JSON.parse(localStorage.getItem("weather"));
    }

    fetchData(query, weather, setWeather);
    console.log(weather);
  }, []);

  return (
    <div className="App">{weather.isLoading && <h1>I am Loading...</h1>}</div>
  );
}

export default App;
