import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import { SvgIconProps } from '@mui/material';

const MultipleCarsIcon = (props: SvgIconProps) => {
  return (
    <div>
      <DirectionsCarOutlinedIcon {...props} sx={{ position: 'absolute', transform: 'translate(50%, 50%)' }} />
      <DirectionsCarOutlinedIcon {...props} sx={{ position: 'absolute', transform: 'translate(-50%, -50%)' }} />
    </div>
  );
};

export default MultipleCarsIcon;
