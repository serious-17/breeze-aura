import { atom } from "jotai";

export const weatherData = atom({
  current: [],
  location: [],
  astro: [],
  isLoading: true,
  results: true,
});
