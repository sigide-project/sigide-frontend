import { styled } from '@mui/material/styles';

export const SavedItemsSectionContainer = styled('section')`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled('h2')`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0 16px;
`;

export const ItemsGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

export const EmptyState = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  border-radius: 12px;
`;

export const EmptyStateText = styled('p')`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin: 0;
`;

export const SkeletonContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;
