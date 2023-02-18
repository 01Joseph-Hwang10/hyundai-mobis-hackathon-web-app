import { Box, CardContent, Grid, styled } from '@mui/material';
import DatePickerBar from './date-picker-bar';
import FilterSortBar from './filter-sort-bar';

const Wrapper = styled(Box)`
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #e0e0e0;
  padding: 0;
  background-color: #ffffff;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 10px 10px 0px rgba(0, 0, 0, 0.1);
`;

const Container = styled(CardContent)`
  padding-top: 1rem;
  padding-bottom: 0;
`;

const SearchSection: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Grid container rowSpacing={2} alignItems="center">
          <DatePickerBar />
          <FilterSortBar />
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default SearchSection;
