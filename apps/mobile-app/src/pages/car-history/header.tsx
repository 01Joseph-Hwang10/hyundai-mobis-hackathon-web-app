import { Box, styled, Typography } from '@mui/material';
import React from 'react';

const Container = styled(Box)`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const SearchHeader = () => {
  return (
    <Container>
      <Typography variant="h1" align="left">
        Search
      </Typography>
      <Typography color="text.secondary" variant="subtitle1" align="left" gutterBottom>
        Find your vehicle's deformation history and accident video.
      </Typography>
    </Container>
  );
};

export default SearchHeader;
