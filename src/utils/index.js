import axios from 'axios';
import get from 'lodash/fp/get';
const baseURL = 'https://swapi.co/api';

export const getStarWarsPeople = async (nextPage) => {
  try {
    const { data } = await axios.get(`${baseURL}/people`);
    return data;
  } catch (err) {
    return generateError();
  }
}

export const searchStarWarsPeople = async (person) => (
  get('data.results')(await axios.get(`${baseURL}/people/?search=${person}`))
)

export const getStarWarsSpecies = async (nextPage) => {
  try {
    const { data } = await axios.get(nextPage ? nextPage : `${baseURL}/species`);
    return data;
  } catch (err) {
    return generateError();
  }
}

export const formatSpecies = (species) => {
  let speciesObject = {};
  species.map(sp => speciesObject[`${sp.url.toString()}`] = sp.name);
  return speciesObject;
}

function generateError() {
  return new Error('There Was A Disturbance With The Force');
}