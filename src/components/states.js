import { atom } from "jotai";

export const weatherData = atom({
  current: [],
  location: [],
  isLoading: true,
});
