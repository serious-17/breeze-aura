import axios from "axios";
import { astronomyURL, weatherURL } from "../api";

const fetchData = async (query, weather, setWeather) => {
  let weatherData;
  let astronomyData;

  if (query) {
    weatherData = await axios.get(weatherURL(query)).catch((err) => err);
    if (weatherData.code === "ERR_BAD_REQUEST") {
      setWeather({ ...weather, results: false });
      return;
    }
    astronomyData = await axios.get(astronomyURL(query));
    localStorage.setItem("weather_location", JSON.stringify(query));
  } else {
    weatherData = await axios.get(weatherURL("london"));
    astronomyData = await axios.get(astronomyURL("london"));
  }

  setWeather({
    ...weather,
    current: weatherData.data.current,
    location: weatherData.data.location,
    astro: astronomyData.data.astronomy.astro,
    isLoading: false,
    results: true,
  });
};

export default fetchData;
