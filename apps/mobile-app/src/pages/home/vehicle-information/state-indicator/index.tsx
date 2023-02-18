import { Box, Card, LinearProgress, styled, Typography } from '@mui/material';
import { IconBox, InfoRow } from '../base';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import { CircleButtonOutlined } from '../../../../components/circle-button';
import { extraColors, themeOptions } from '../../../../app/theme';
import { HorizontalSpace } from '@hyundai-mobis-hackathon-web-app/components';
import { useContext } from 'react';
import { GlobalContext } from '../../../../app/context';

const VehicleInfoCard = styled(Card)`
  border-radius: 0.5rem;
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 1rem;
  background-color: ${extraColors.grey};
`;

const ProgressBox = styled(Box)`
  width: 100%;
`;

const TypoBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  vertical-align: bottom;
`;

const StateIndicator: React.FC = () => {
  const { vehicle } = useContext(GlobalContext);
  const batteryLevelPercentage = Math.round((vehicle?.metrics.batteryLevel ?? 0) * 100);
  return (
    <VehicleInfoCard elevation={0}>
      <ProgressBox>
        <LinearProgress variant={vehicle ? 'determinate' : 'indeterminate'} value={batteryLevelPercentage} />
      </ProgressBox>
      <InfoRow>
        <IconBox>
          <CircleButtonOutlined color={themeOptions.palette.success.main} thickness="3px" size="2rem">
            <BatteryCharging80Icon fontSize="small" />
          </CircleButtonOutlined>
          <HorizontalSpace value="0.5rem" />
          <Typography variant="body1">Battery Charged</Typography>
        </IconBox>
        <TypoBox>
          <Typography variant="h3">{batteryLevelPercentage}</Typography>
          <HorizontalSpace value="0.5rem" />
          <Typography variant="body2">%</Typography>
          <HorizontalSpace value="0.5rem" />
          <Typography variant="body2">/</Typography>
          <HorizontalSpace value="0.5rem" />
          <Typography variant="h3">{vehicle?.metrics.maximumRange ?? 0}</Typography>
          <HorizontalSpace value="0.5rem" />
          <Typography variant="body2">km</Typography>
        </TypoBox>
      </InfoRow>
    </VehicleInfoCard>
  );
};

export default StateIndicator;
