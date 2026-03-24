import { styled } from '@mui/material/styles';

export const DeleteDialogContent = styled('div')`
  padding: 8px 0;
`;

export const DeleteDialogText = styled('p')`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;
`;
