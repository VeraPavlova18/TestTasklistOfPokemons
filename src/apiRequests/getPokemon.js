/* eslint-disable no-console */

import axios from 'axios';

const getPokemon = async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);  
    return response.data;  
   
  } catch(e) {
    console.log(e)
    return [];
  }  
}

export default getPokemon