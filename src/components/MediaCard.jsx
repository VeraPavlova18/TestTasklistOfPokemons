
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  media: {
    height: 50,
    width: 50,
    margin: 50,
    marginBottom: 0,    
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  const pokemonName = props.name;
  const img = `http://pokestadium.com/sprites/xy/${pokemonName}.gif`;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={pokemonName}
          className={classes.media}                              
          image={img}
          title={pokemonName}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.name.toUpperCase()}
          </Typography>
          <Typography component="p" >
            <b>Type: {props.types.map(entry => entry.type.name).join(', ')}</b>
          </Typography>
          <Typography component="p">          
            Height: {props.height} decimetres
          </Typography>
          <Typography component="p">
            Weight: {props.weight} hectograms	
          </Typography>          
        </CardContent>
      </CardActionArea>    
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  weight: PropTypes.number,
  height: PropTypes.number,
  types: PropTypes.array,
};

export default withStyles(styles)(ImgMediaCard);