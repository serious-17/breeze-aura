import axios from "axios";
import { weatherURL } from "../api";

const fetchData = async (query, weather, setWeather) => {
  let weatherData;

  if (query) {
    weatherData = await axios.get(weatherURL(query));
  } else {
    weatherData = await axios.get(weatherURL("London"));
    console.log(weatherData);
  }

  setWeather({ ...weather, data: weatherData.data, isLoading: false });
};

export default fetchData;
