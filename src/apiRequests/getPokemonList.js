/* eslint-disable no-console */

import axios from 'axios';

const getPokemonList = async () => {
  try {
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000`);
    return result.data;

  } catch (e) {
    console.error(e);
    return []
  }
}

export default getPokemonList