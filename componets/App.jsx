import React from 'react';
import SearchAppBar from './SearchAppBar';
import ImgMediaCard from './MediaCard';
import CheckboxLabels from './CheckboxLabels';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import getPokemonList from './apiRequests/getPokemonList';
import getPokemon from './apiRequests/getPokemon';
import Pagination from './Pagination';
import getPokemonType from './apiRequests/getPokemonType';
import getPokemonListType from './apiRequests/getPokemonListType';

const styles = {
  root: {
    flexGrow: 1,
  },  
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pokemons: [],
			activePokemons: [],
			types: [],
			activeTypes: [],
			filter: '',
			limit: 10,
			page: 0,
			total: 0,
		};

		this.fetchPokemon = this.fetchPokemon.bind(this);
		this.setLimit = this.setLimit.bind(this);
		this.setPage = this.setPage.bind(this);
		this.setpokemonsActive = this.setpokemonsActive.bind(this);
		this.fetchPokemonTypes = this.fetchPokemonTypes.bind(this);
		this.setActiveTypes = this.setActiveTypes.bind(this);
		this.filterPokemon = this.filterPokemon.bind(this);
	}

	componentDidMount() {
		this.fetchPokemon();
		this.fetchPokemonTypes();
	}	

	fetchPokemon() {
		const {activeTypes} = this.state;
		if (activeTypes.length === 0) {
			getPokemonList().then(({results: pokemons}) => this.setState({ pokemons }, () => this.setpokemonsActive()));		
		} else {
			getPokemonListType(activeTypes).then((pokemons) => this.setState({ pokemons }, () => this.setpokemonsActive()));	
		}
	}

	filterPokemon(filter) {
		this.setState({ filter, page: 0 }, () => this.setpokemonsActive());
	}

	fetchPokemonTypes() {
		getPokemonType().then(({results: types}) => 
			this.setState({ types }));			
	}

	setLimit(limit) {
		this.setState({ limit: +limit, page: 0 }, () => {
			this.fetchPokemon()
		});		
	}

	setActiveTypes(types) {
		this.setState({ activeTypes: types }, () => {
			this.fetchPokemon();
		});		
	}

	setpokemonsActive() {	
		const { filter, pokemons, limit, page } = this.state;
		const filteredPokemons = filter.length < 3 ? pokemons : pokemons.filter(pokemon => 
			pokemon.name.includes(filter.toLowerCase()));
		const pokemonsArray = filteredPokemons.slice(page * limit, limit + page * limit);		
		Promise.all(pokemonsArray.map(async (pokemon) => await getPokemon(pokemon.name)))
			.then(activePokemons => this.setState({ activePokemons, total: filteredPokemons.length }))
	}

	setPage(page) {
		this.setState({ page }, () => {
			this.fetchPokemon()
		});
	}

	render() {				
		const { classes } = this.props;
		const { filter, types, activeTypes, activePokemons, limit, page, total } = this.state;
		return (  		
			<div className={classes.root}>
				<Grid 
				container 
				direction="row"
				justify="space-around"
				alignItems="center"
				spacing={24}
				>				
					<Grid item xl={12} lg={12} md={12} xs={12} sm={12}>
						<SearchAppBar filter={filter} onChange={this.filterPokemon} />
					</Grid>					
					<Grid item xl={12} lg={12} md={12} xs={12} sm={12}>					
						<CheckboxLabels 
							types={types.map(type => type.name)} 
							activeTypes={activeTypes}
							setActiveTypes={this.setActiveTypes}
						/>						
					</Grid>					
					{activePokemons.length === 0 ? '' : activePokemons.map(pokemon =>
						<Grid key={pokemon.name} item xl={2} lg={3} md={4} sm={6} xs={12}>
						<ImgMediaCard { ...pokemon} />
						</Grid>
					)}	
					<Grid item xl={12} lg={12} md={12} xs={12} sm={12}>
						<Pagination 
							setLimit={this.setLimit} 
							limit={limit} 
							page={page}
							total={total}
							setPage={this.setPage}
						/>						
					</Grid>		
				</Grid>					
			</div>    
		);
	}
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(App);




