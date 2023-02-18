import { IconButton, IconButtonProps } from '@mui/material';

interface CircleButtonFilledProps extends Omit<IconButtonProps, 'size' | 'color' | 'children'> {
  size?: string;
  color?: string;
  children?: React.ReactNode;
}

export const CircleButtonFilled: React.FC<CircleButtonFilledProps> = ({ size, color, children, ...props }) => {
  return (
    <IconButton
      {...props}
      sx={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </IconButton>
  );
};

interface CircleButtonOutlinedProps extends Omit<IconButtonProps, 'size' | 'color' | 'children'> {
  size?: string;
  thickness?: string;
  color?: string;
  children?: React.ReactNode;
}

export const CircleButtonOutlined: React.FC<CircleButtonOutlinedProps> = ({ size, thickness, color, children, ...props }) => {
  return (
    <IconButton
      {...props}
      sx={{
        border: `${thickness} solid ${color}`,
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </IconButton>
  );
};
