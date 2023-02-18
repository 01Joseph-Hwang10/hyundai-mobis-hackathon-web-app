import { Card, styled } from '@mui/material';
import { extraColors } from '../../src/app/theme';

export const RoundedCard = styled(Card)`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  background-color: ${extraColors.grey};
  padding: 1rem;
`;
