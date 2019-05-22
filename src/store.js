import { createContext } from 'react'
import { decorate, observable } from 'mobx'

import getPokemonList from './apiRequests/getPokemonList';
import getPokemon from './apiRequests/getPokemon';
import getPokemonType from './apiRequests/getPokemonType';
import getPokemonListType from './apiRequests/getPokemonListType';

export class Store {
    state = {
        pokemons: [],
        activePokemons: [],
        types: [],
        activeTypes: [],
        filter: '',
        limit: 10,
        page: 0,
        total: 0,
    }

    fetchPokemon = async () => {
		const {activeTypes} = this.state;
		if (activeTypes.length === 0) {
            const {count, results: pokemons} = await getPokemonList();
            this.state.pokemons = pokemons;
            this.state.total = count;
            this.setPokemonsActive();		
		} else {
            const pokemons = await getPokemonListType(activeTypes);
            this.state.pokemons = pokemons;
            this.setPokemonsActive();
		}
	}

	filterPokemon = (filter) => {
        this.state.filter = filter
        this.state.page = 0;
		this.setPokemonsActive();
	}

	fetchPokemonTypes = async () => {
        const {results: types} = await getPokemonType();
        this.state.types = types;			
	}

	setLimit = (limit) => {
        this.state.limit = +limit;
        this.state.page = 0;
		this.fetchPokemon();	
	}

	setActiveTypes = (types) => {
        this.state.activeTypes = types;
        this.state.page = 0;
        this.fetchPokemon();		
	}

	setPokemonsActive = async () => {	
        const { filter, pokemons, limit, page } = this.state;
        const filteredPokemons = filter.length < 3 ? pokemons : pokemons.filter(pokemon => pokemon.name.includes(filter.toLowerCase()));
        
		const pokemonsArray = filteredPokemons.slice(page * limit, limit + page * limit);		
        const activePokemons = await Promise.all(pokemonsArray.map(async (pokemon) => await getPokemon(pokemon.name)));
        
        this.state.activePokemons = activePokemons;
        this.state.total = filteredPokemons.length;
	}

	setPage = (page) => {
        this.state.page = page;
        this.setPokemonsActive();
    }
}

decorate(Store, {
    state: observable
})

const store = new Store()

store.fetchPokemon();
store.fetchPokemonTypes();

export default createContext(store)
