import { Box, CircularProgress, styled, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AccidentVideoCard, DeformationCard } from './cards';
import { CarHistoryContext } from './context';

const Container = styled('div')`
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const PlaceholderBox = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HistoryList = () => {
  const { histories, loading } = useContext(CarHistoryContext);
  return (
    <Container>
      {histories.length !== 0 &&
        !loading &&
        histories.map((history, index) =>
          history.type === 'deformation' ? (
            <DeformationCard key={`HistoryCard${index}`} deformation={history.data} />
          ) : (
            <AccidentVideoCard key={`HistoryCard${index}`} video={history.data} />
          )
        )}
      {loading && (
        <PlaceholderBox>
          <CircularProgress variant="indeterminate" size="3rem" />
        </PlaceholderBox>
      )}
      {histories.length === 0 && !loading && (
        <PlaceholderBox>
          <Typography variant="h4">No history Found</Typography>
        </PlaceholderBox>
      )}
    </Container>
  );
};

export default HistoryList;
