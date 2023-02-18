import { styled } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigationBar, { BOTTOM_NAVIGATION_BAR_HEIGHT } from './bottom-navigation-bar';

const Wrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: ${BOTTOM_NAVIGATION_BAR_HEIGHT};
`;

const Layout = () => {
  return (
    <Wrapper>
      <Outlet />
      <BottomNavigationBar />
    </Wrapper>
  );
};

export default Layout;
