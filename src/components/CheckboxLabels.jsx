import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { blue, pink, red, yellow, cyan, indigo, lightGreen, deepPurple, brown, purple, grey } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {  
  red: {
    color: red[600],
    '&$checked': {
      color: red[700],
    },
  },
  pink: {
    color: pink[700],
    '&$checked': {
      color: pink[700],
    },
  },
  lightBlue: {
    color: blue[200],
    '&$checked': {
      color: blue[200],
    },
  },
  blue: {
    color: blue[600],
    '&$checked': {
      color: blue[500],
    },
  },
  greyNormal: {
    color: grey[300],
    '&$checked': {
      color: grey[300],
    },
  },
  lightBlueFlying: {
    color: blue[400],
    '&$checked': {
      color: blue[400],
    },
  },
  pinkFighting: {
    color: pink['A400'],
    '&$checked': {
      color: pink['A400'],
    },
  },
  cyan: {
    color: cyan[400],
    '&$checked': {
      color: cyan[400],
    },
  },
  brown: {
    color: brown[700],
    '&$checked': {
      color: brown[700],
    },
  },
  grey: {
    color: grey[700],
    '&$checked': {
      color: grey[700],
    },
  },
  indigo: {
    color: indigo[400],
    '&$checked': {
      color: indigo[400],
    },
  },
  lightBlueGhost: {
    color: blue[600],
    '&$checked': {
      color: blue[600],
    },
  },
  greySteel: {
    color: grey[600],
    '&$checked': {
      color: grey[500],
    },
  },
  lightGreen: {
    color: lightGreen[600],
    '&$checked': {
      color: lightGreen[500],
    },
  },
  deepPurple: {
    color: deepPurple['A100'],
    '&$checked': {
      color: deepPurple['A100'],
    },
  },
  yellow: {
    color: yellow[600],
    '&$checked': {
      color: yellow[600],
    },
  },
  greyDark: {
    color: grey[900],
    '&$checked': {
      color: grey[900],
    },
  },
  pinkFairy: {
    color: purple['A100'],
    '&$checked': {
      color: purple['A100'],
    },
  },
  greyUnknown: {
    color: grey[500],
    '&$checked': {
      color: grey[500],
    },
  },
  greyShadow: {
    color: grey[700],
    '&$checked': {
      color: grey[700],
    },
  },  
  checked: {},
};

const colors = {
  fire: 'red',
  dragon: 'pink',
  ice: 'lightBlue',
  water: 'blue',
  normal: 'greyNormal',
  fighting: 'pinkFighting',
  flying: 'lightBlueFlying',
  poison: 'cyan',
  ground: 'brown',
  rock: 'grey',
  bug: 'indigo',
  ghost: 'lightBlueGhost',
  steel: 'greySteel',
  grass: 'lightGreen',
  electric: 'deepPurple',
  psychic: 'yellow',
  dark: 'greyDark',
  fairy: 'pinkFairy',
  unknown: 'greyUnknown',
  shadow: 'greyShadow',
}

const CheckboxLabels = ({ classes, types, setActiveTypes, activeTypes }) => {
  return <React.Fragment>
    {
      types.map(type => <FormControlLabel key = {type} control = {
          <Checkbox
            classes={{
              root: colors[type] ? classes[colors[type]] : classes.grey,
              checked: classes.checked,
            }}
            value={type}
            checked={activeTypes.indexOf(type) > -1}
            onChange={e => {
              const set = new Set(activeTypes);
              if (e.target.checked) {
                set.add(type)
              } else {
                set.delete(type)
              }
              setActiveTypes(Array.from(set))
            }}
          />
        }
        label={type}
      />)
    }
  </React.Fragment>
}


CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
  types: PropTypes.array,
  activeTypes: PropTypes.array,
  setActiveTypes: PropTypes.func
};

export default withStyles(styles)(CheckboxLabels);