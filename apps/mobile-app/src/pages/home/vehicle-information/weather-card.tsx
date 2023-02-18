import { VerticalSpace } from '@hyundai-mobis-hackathon-web-app/components';
import { Typography } from '@mui/material';
import { ImageIcon } from '../../../../src/components/icon';
import { RoundedCard } from '../../../../src/components/card';

const weatherIcons = {
  sunny: 'https://cdn-icons-png.flaticon.com/512/2698/2698213.png',
  cloudy: 'https://cdn-icons-png.flaticon.com/512/892/892300.png',
  rainy: 'https://cdn-icons-png.flaticon.com/512/3313/3313966.png',
};

const WeatherCard = () => {
  const weather = {
    icon: Object.keys(weatherIcons)[Math.floor(Math.random() * 3)] as keyof typeof weatherIcons,
    temperature: Math.floor(Math.random() * 10 + 20),
  };
  return (
    <RoundedCard sx={{ gridArea: 'weather' }} elevation={0}>
      <ImageIcon src={weatherIcons[weather.icon]} alt={weather.icon} />
      <VerticalSpace />
      <Typography variant="h3">{weather.temperature}°C</Typography>
      <VerticalSpace />
      <Typography variant="subtitle2">Climate level</Typography>
    </RoundedCard>
  );
};

export default WeatherCard;
