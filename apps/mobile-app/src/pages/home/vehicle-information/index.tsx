import { Box, styled } from '@mui/material';
import StateIndicator from './state-indicator';
import WeatherCard from './weather-card';
import DrivenCard from './driven-card';

const CardContainer = styled(Box)`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'weather driven';
`;

const VehicleInformation: React.FC = () => {
  return (
    <Box>
      <StateIndicator />
      <CardContainer>
        <WeatherCard />
        <DrivenCard />
      </CardContainer>
    </Box>
  );
};

export default VehicleInformation;
