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

export const AddressGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

export const AddressCard = styled('div')`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  background: ${({ theme }) => theme.palette.background.default};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const AddressCardHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const AddressLabel = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};

  svg {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 20px;
  }
`;

export const AddressContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AddressLine = styled('span')`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 1.5;
`;

export const DefaultBadge = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ theme }) => theme.palette.primary.main}15;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const EmptyAddressState = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  background: ${({ theme }) => theme.palette.grey[50]};
  border-radius: 12px;
`;
