/* eslint-disable no-console */

import axios from 'axios';

const getPokemonType = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type`);
    return response.data; 
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default getPokemonType
