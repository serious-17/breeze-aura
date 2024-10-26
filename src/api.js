const base_url = "https://api.weatherapi.com/v1/";
const key = `?key=${process.env.REACT_APP_API_KEY}`;

export const weatherURL = (query) => `${base_url}current.json${key}&q=${query}`;
export const astronomyURL = (query) =>
  `${base_url}astronomy.json${key}&q=${query}`;
