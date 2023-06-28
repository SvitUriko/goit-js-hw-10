

import axios from "axios";

const API_KEY = "live_wkGFcunIhWR4sDPTZGmoSadJeTYrlPWsYQE2rceYfzIN7VYReSRtiFayGz353G6S";
axios.defaults.headers.common["x-api-key"] = API_KEY;

export const fetchBreeds = () => {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export const fetchCatByBreed = breedId => {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0]);
}


