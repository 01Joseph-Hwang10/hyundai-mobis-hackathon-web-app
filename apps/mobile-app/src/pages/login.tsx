import { VerticalSpace } from '@hyundai-mobis-hackathon-web-app/components';
import { isDev, PROJECT_NAME, SPECIFIED_VEHICLE_SERIAL_CODE } from '@hyundai-mobis-hackathon-web-app/constants';
import { wait } from '@hyundai-mobis-hackathon-web-app/utils';
import { Button, CircularProgress, styled, Typography, InputLabel, OutlinedInput, Box } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../app/context';
import { routes } from '../app/routes/routes';
import { themeOptions } from '../app/theme';
import { client } from '../utils/firebase';

const Wrapper = styled(Box)`
  height: 100vh;
  width: 100vw;
`;

const Container = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5rem 2rem;
`;

const TextInputGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const RoundedButton = styled(Button)`
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
`;

const RoundedInput = styled(OutlinedInput)`
  border-radius: 0.5rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState(isDev() ? 'John Doe' : '');
  const [serialCode, setSerialCode] = useState(isDev() ? SPECIFIED_VEHICLE_SERIAL_CODE : '');
  const [loading, setLoading] = useState(false);
  const { setVehicle } = useContext(GlobalContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerName(event.target.value);
  };

  const handleSerialCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerialCode(event.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (isDev()) await wait(1000); // Simulate network latency
    try {
      const vehicle = await client.getVehicleBySerialCode(serialCode);
      setVehicle(vehicle);
      setLoading(false);
      navigate(`${routes.main.root}/${routes.main.home}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Couldn't find the vehicle. Please check the serial code again.");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Box>
          <Typography variant="h1" align="left" gutterBottom>
            Welcome to {PROJECT_NAME}
          </Typography>
          <Typography color="text.secondary" variant="subtitle1" align="left" gutterBottom>
            Experience the new way of vehicle management.
          </Typography>
          <VerticalSpace value="2rem" />
          <TextInputGroup>
            <InputLabel htmlFor="name-input">
              <Typography color="text.primary" variant="h4" align="left" gutterBottom>
                Name
              </Typography>
            </InputLabel>
            <RoundedInput id="name-input" fullWidth placeholder="Enter your name" value={ownerName} onChange={handleNameChange} />
          </TextInputGroup>
          <TextInputGroup>
            <InputLabel htmlFor="serial-code-input">
              <Typography color="text.primary" variant="h4" align="left" gutterBottom>
                Serial Code
              </Typography>
            </InputLabel>
            <RoundedInput id="serial-code-input" fullWidth placeholder="Enter vehicle's serial code" value={serialCode} onChange={handleSerialCodeChange} />
          </TextInputGroup>
        </Box>
        <RoundedButton fullWidth variant="contained" onClick={handleLogin}>
          {loading ? <CircularProgress thickness={5} sx={{ color: themeOptions.palette.background.default }} size={24} /> : 'Get started'}
        </RoundedButton>
      </Container>
    </Wrapper>
  );
};

export default Login;
