import { Box, ButtonProps, Paper, styled } from '@mui/material';
import { Refresh, History } from '@mui/icons-material';
import { VerticalSpace } from '@hyundai-mobis-hackathon-web-app/components';
import { CircleButtonFilled } from '../../../../components/circle-button';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../app/routes/routes';
import ElantraImage from '../../../../assets/elantra.png';

const ElevatedButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: '1.5rem' }}>
      <CircleButtonFilled size="3rem" color="white" {...props}>
        {children}
      </CircleButtonFilled>
    </Paper>
  );
};

const ImageContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ButtonContainer = styled(Box)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
`;

export const VehicleViewer = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    // Handle refresh button click
  };

  const handleCarHistory = () => {
    navigate(`${routes.main.root}/${routes.main.history}?t=deformation`);
  };

  return (
    <Box position="relative" flexGrow={1}>
      {/* <VehicleRenderer /> */}
      <ImageContainer>
        <img src={ElantraImage} alt="Elantra" width="100%" height="auto" />
      </ImageContainer>
      <ButtonContainer>
        <ElevatedButton onClick={handleRefresh}>
          <Refresh />
        </ElevatedButton>
        <VerticalSpace />
        <ElevatedButton onClick={handleCarHistory}>
          <History />
        </ElevatedButton>
      </ButtonContainer>
    </Box>
  );
};

export default VehicleViewer;
