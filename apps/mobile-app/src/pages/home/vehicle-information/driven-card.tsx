import { VerticalSpace } from '@hyundai-mobis-hackathon-web-app/components';
import { Typography } from '@mui/material';
import { GlobalContext } from '../../../../src/app/context';
import { useContext } from 'react';
import { RoundedCard } from '../../../../src/components/card';
import { ImageIcon } from '../../../../src/components/icon';

const icon = 'https://cdn-icons-png.flaticon.com/512/9571/9571796.png';

const DrivenCard: React.FC = () => {
  const { vehicle } = useContext(GlobalContext);
  const formattedDistance = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'kilometer',
  }).format(vehicle?.metrics.distanceDriven ?? 0);

  return (
    <RoundedCard sx={{ gridArea: 'driven' }} elevation={0}>
      <ImageIcon src={icon} alt={'Speedometer'} />
      <VerticalSpace />
      <Typography variant="h3">{formattedDistance}</Typography>
      <VerticalSpace />
      <Typography variant="subtitle2">Driven</Typography>
    </RoundedCard>
  );
};

export default DrivenCard;
