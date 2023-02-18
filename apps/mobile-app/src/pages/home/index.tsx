import AppBar from './app-bar';
import VehicleViewer from './vehicle-information/vehicle-viewer';
import VehicleInformation from './vehicle-information';
import { styled } from '@mui/material';

const Wrapper = styled('div')`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgb(38, 56, 178) 0%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 1) 100%);
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  flex-grow: 1;
`;

function Home() {
  return (
    <Wrapper>
      <AppBar />
      <Container>
        <VehicleViewer />
        <VehicleInformation />
      </Container>
    </Wrapper>
  );
}

export default Home;
