import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

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

export const SettingsList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SettingItem = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.background.default};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.light};
  }
`;

export const SettingInfo = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SettingIcon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.primary.main}15;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const SettingLabel = styled('span')`
  display: block;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 2px;
`;

export const SettingDescription = styled('span')`
  display: block;
  font-size: 0.813rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const LogoutButton = styled(Button)`
  margin-top: 24px;
  padding: 12px;
  border-radius: 12px;
  text-transform: none;
  font-weight: 500;
`;
