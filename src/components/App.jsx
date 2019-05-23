import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import SearchAppBar from './SearchAppBar';
import ImgMediaCard from './MediaCard';
import CheckboxLabels from './CheckboxLabels';
import Grid from '@material-ui/core/Grid';
import Pagination from './Pagination';
import Store from '../store'; 

const App = observer(() => {
	const store = useContext(Store)

	return (  		
		<div styles={{flexGrow: 1}}>
			<Grid 
				container 
				direction="row"
				justify="space-around"
				alignItems="center"
				spacing={24}
			>				
				<Grid item xl={12} lg={12} md={12} xs={12} sm={12}>
					<SearchAppBar filter={store.state.filter} onChange={store.filterPokemon} />
				</Grid>					
				<Grid item xl={12} lg={12} md={12} xs={12} sm={12}>					
					<CheckboxLabels 
						types={store.state.types.map(type => type.name)} 
						activeTypes={store.state.activeTypes}
						setActiveTypes={store.setActiveTypes}
					/>						
				</Grid>					
				{store.state.activePokemons.length === 0 ? '' : store.state.activePokemons.map(pokemon =>
					<Grid key={pokemon.name} item xl={2} lg={3} md={4} sm={6} xs={12}>
						<ImgMediaCard { ...pokemon} />
					</Grid>
				)}
				<Grid item xl={12} lg={12} md={12} xs={12} sm={12}>
					<Pagination 
						setLimit={store.setLimit} 
						limit={store.state.limit} 
						page={store.state.page}
						total={store.state.total}
						setPage={store.setPage}
					/>						
				</Grid>		
			</Grid>					
		</div>   
	)
});

export default App;