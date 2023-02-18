import React, { useContext } from 'react';
import { IconButton, Button, Grid, Typography, Box } from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Source from '@mui/icons-material/Source';
import CarCrash from '@mui/icons-material/CarCrash';
import Videocam from '@mui/icons-material/Videocam';
import { CarHistoryContext, HistoryTypeFilter } from '../context';

const FilterSortBar: React.FC = () => {
  const { sort, setSort, filter, setFilter } = useContext(CarHistoryContext);

  const handleCategoryFilter = (selectedCategory: HistoryTypeFilter) => {
    console.log('selectedCategory', selectedCategory);
    setFilter(selectedCategory);
  };

  const handleSort = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Grid item xs={12}>
      <Grid container alignItems="center">
        <Grid item xs={8} alignItems="flex-start">
          <IconButton onClick={() => handleCategoryFilter('all')}>
            <Source color={filter === 'all' ? 'primary' : 'action'} />
          </IconButton>
          <IconButton onClick={() => handleCategoryFilter('deformation')}>
            <CarCrash color={filter === 'deformation' ? 'primary' : 'action'} />
          </IconButton>
          <IconButton onClick={() => handleCategoryFilter('video')}>
            <Videocam color={filter === 'video' ? 'primary' : 'action'} />
          </IconButton>
        </Grid>
        <Grid item xs={4} alignItems="flex-end">
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button onClick={handleSort} sx={{ padding: 0 }}>
              <Typography variant="h4" color="grey">
                {sort}
              </Typography>
              {sort === 'asc' ? <ArrowUpward color="action" /> : <ArrowDownward color="action" />}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterSortBar;
