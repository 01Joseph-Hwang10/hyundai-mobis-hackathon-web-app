import { Box, styled } from '@mui/material';

interface SpaceProps {
  value?: string;
}

export const VerticalSpace = styled(Box)<SpaceProps>`
  height: ${(props) => props.value ?? '1rem'};
  width: 1px;
`;

export const HorizontalSpace = styled(Box)<SpaceProps>`
  width: ${(props) => props.value ?? '1rem'};
  height: 1px;
`;
