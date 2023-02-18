import { styled } from '@mui/material';
import React from 'react';
import { BOTTOM_NAVIGATION_BAR_HEIGHT } from '../../app/bottom-navigation-bar';
import { CarHistoryProvider } from './context';
import SearchHeader from './header';
import HistoryList from './history-list';
import SearchSection from './search-section';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 3rem;
  padding-bottom: ${BOTTOM_NAVIGATION_BAR_HEIGHT};
  flex-grow: 1;
`;

const CarHistory: React.FC = () => {
  return (
    <CarHistoryProvider>
      <Wrapper>
        <SearchHeader />
        <SearchSection />
        <HistoryList />
      </Wrapper>
    </CarHistoryProvider>
  );
};

export default CarHistory;
