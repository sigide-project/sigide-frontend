import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const UserDetailsCard = styled(Card)`
  border-radius: 12px;
`;

export const UserDetailsContent = styled(CardContent)`
  padding: 24px;
`;

export const EditFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EditFormActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

export const DetailItem = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled('span')`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DetailValue = styled('span')`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const EmailNote = styled('span')`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-style: italic;
`;
