import { atom } from "jotai";

export const weatherData = atom({
  data: [],
  isLoading: true,
});
