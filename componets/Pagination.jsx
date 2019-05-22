import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function Pagination(props) {
  const { classes, limit, setLimit, page, total, setPage } = props;
  const pages = Math.ceil(total / limit);  

  return (
    <div className="pagination">            
      { page > 0 && <Button variant="contained" color="primary" className={classes.button} 
        onClick={() =>  setPage(page - 1) }>
         Previous
      </Button>}   
      {total !== 0 && `${page + 1} / ${pages}`}
      { page < pages - 1 && <Button variant="contained" color="primary" className={classes.button}
        onClick={() =>  setPage(page + 1) }>
          Next
      </Button>}   
      <select className="paginationSelect" value={limit} onChange={(e) => {
        return setLimit(e.target.value)
      }}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>   
    </div>
  );
}

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  limit: PropTypes.number,
  setLimit: PropTypes.func, 
  page: PropTypes.number, 
  total: PropTypes.number,
  setPage: PropTypes.func, 
};

export default withStyles(styles)(Pagination);