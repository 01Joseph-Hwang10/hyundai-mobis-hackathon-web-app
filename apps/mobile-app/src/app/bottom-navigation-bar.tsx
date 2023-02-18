import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from './routes/routes';
import { NotImplemeneted } from '@hyundai-mobis-hackathon-web-app/utils';

export const BOTTOM_NAVIGATION_BAR_HEIGHT = '4rem';

interface BottomNavigationBarProps {
  className?: string;
}

const labels = {
  home: 'Home',
  history: 'History',
  user: 'User',
};

const NavigationWrapper = styled(Paper)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  height: ${BOTTOM_NAVIGATION_BAR_HEIGHT};
`;

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case `${routes.main.root}/${routes.main.home}`:
        setValue(labels.home.toLowerCase());
        break;
      case `${routes.main.root}/${routes.main.history}`:
        setValue(labels.history.toLowerCase());
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const [value, setValue] = useState(labels.home.toLowerCase());

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case labels.home.toLowerCase():
        navigate(`${routes.main.root}/${routes.main.home}`);
        break;
      case labels.history.toLowerCase():
        navigate(`${routes.main.root}/${routes.main.history}`);
        break;
      case labels.user.toLowerCase():
        NotImplemeneted();
        break;
      default:
        break;
    }
  };

  return (
    <NavigationWrapper elevation={3}>
      <BottomNavigation className={className} value={value} onChange={handleChange} sx={{ height: BOTTOM_NAVIGATION_BAR_HEIGHT }}>
        <BottomNavigationAction label={labels.home} value={labels.home.toLowerCase()} icon={<HomeIcon />} />
        <BottomNavigationAction label={labels.history} value={labels.history.toLowerCase()} icon={<HistoryIcon />} />
        <BottomNavigationAction label={labels.user} value={labels.user.toLowerCase()} icon={<PersonIcon />} />
      </BottomNavigation>
    </NavigationWrapper>
  );
};

export default BottomNavigationBar;
