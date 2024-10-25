const base_url = "http://api.weatherapi.com/v1/";
const key = `?key=${process.env.REACT_APP_API_KEY}`;

export const weatherURL = (query) => `${base_url}current.json${key}&q=${query}`;
