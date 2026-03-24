import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const SectionCard = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.background.paper};
`;

export const SectionHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SectionTitle = styled('h3')`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0;

  svg {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const InfoList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoItem = styled('div')`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
`;

export const InfoIcon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.primary.main}15;
  color: ${({ theme }) => theme.palette.primary.main};
  flex-shrink: 0;
`;

export const InfoContent = styled('div')`
  flex: 1;
  min-width: 0;
`;

export const InfoLabel = styled('span')`
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

export const InfoValue = styled('span')`
  display: block;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
  word-break: break-word;
`;

export const EditableField = styled('div')`
  margin-top: 4px;
`;

export const PasswordSection = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;
