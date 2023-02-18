import { styled } from '@mui/material';

interface ImageIconProps {
  size?: string;
}

export const ImageIcon = styled('img')<ImageIconProps>`
  background-size: contain;
  background-position: center;
  height: ${(props) => props.size ?? '3rem'};
  width: ${(props) => props.size ?? '3rem'};
`;
