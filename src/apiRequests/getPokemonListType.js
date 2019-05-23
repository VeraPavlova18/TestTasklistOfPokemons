/* eslint-disable no-console */

import axios from 'axios';

const getPokemonListTypes = async (types) => {
  try {
    const typesResult = await Promise.all(types.map(async (type) => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}/`);
        return response.data;
      } catch (e) {
        console.log(e);
        return [];
      }      
    }));
        
    const _result = typesResult.reduce((r, type) => {
      r.push(...type.pokemon.map(pokemon => pokemon.pokemon));
      return r;
    }, []); 
    
    return _result.reduce((prev, curr, i) => {
      if (!prev.find(obj => obj.name === curr.name)) {
        prev.push(curr)
      }  
      return prev
    }, []);
  } catch (e) {
    console.log(e)
    return [];
  }
}

export default getPokemonListTypes
