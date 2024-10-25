import axios from "axios";
import { weatherURL } from "../api";

const fetchData = async (query, weather, setWeather) => {
  let weatherData;

  if (query) {
    weatherData = await axios.get(weatherURL(query));
  } else {
    weatherData = await axios.get(weatherURL("london"));
  }

  setWeather({
    ...weather,
    current: weatherData.data.current,
    location: weatherData.data.location,
    isLoading: false,
  });
};

export default fetchData;
