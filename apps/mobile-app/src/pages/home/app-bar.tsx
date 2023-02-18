import { AppBar as MaterialAppBar, Toolbar, IconButton, Typography, styled } from '@mui/material';
import Notifications from '@mui/icons-material/NotificationsOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../app/context';

const StyledAppBar = styled(MaterialAppBar)`
  padding: 0.5rem 0;
  background-color: rgba(232, 232, 232, 0.65);
`;

const AppBar: React.FC = () => {
  const { vehicle } = useContext(GlobalContext);
  const [vehicleName, setVehicleName] = useState('Loading...');

  useEffect(() => {
    (async () => {
      if (vehicle) {
        await vehicle.info.load();
        setVehicleName(vehicle.info.modelName);
      }
    })();
  }, [vehicle]);

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <Notifications fontSize="large" sx={{ color: 'black', strokeWidth: 0.5 }} />
        </IconButton>
        <Typography color="text.primary" variant="h6" component="div" flexGrow={1} align="center">
          {vehicleName}
        </Typography>
        <IconButton size="large" edge="end" color="inherit" aria-label="menu">
          <DirectionsCarOutlinedIcon fontSize="large" sx={{ color: 'black', strokeWidth: 0.5 }} />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
