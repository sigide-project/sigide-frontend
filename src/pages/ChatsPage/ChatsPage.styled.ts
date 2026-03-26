import { styled, keyframes } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { tc, spacing, borderRadius, transitions, typography } from '@/theme';
import { NAVBAR_HEIGHT } from '@/components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SIDEBAR_WIDTH = 360;
const COLLAPSED_WIDTH = 72;

export const PageContainer = styled('div')`
  display: flex;
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
  background: ${tc((c) => c.background.default)};
  overflow: hidden;
`;

interface LeftPanelProps {
  $collapsed?: boolean;
}

export const LeftPanel = styled('div', {
  shouldForwardProp: (prop) => !prop.toString().startsWith('$'),
})<LeftPanelProps>`
  width: ${({ $collapsed }) => ($collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH)}px;
  min-width: ${({ $collapsed }) => ($collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH)}px;
  max-width: ${({ $collapsed }) => ($collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH)}px;
  border-right: 1px solid ${tc((c) => c.grey[200])};
  display: flex;
  flex-direction: column;
  background: ${tc((c) => c.background.paper)};
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
  transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    border-right: none;
  }
`;

export const CollapseToggle = styled(IconButton)<{ $collapsed?: boolean }>`
  position: absolute;
  top: 50%;
  right: ${({ $collapsed }) => ($collapsed ? '50%' : '-16px')};
  transform: ${({ $collapsed }) => ($collapsed ? 'translate(50%, -50%)' : 'translateY(-50%)')};
  z-index: 10;
  width: 32px;
  height: 32px;
  background: ${tc((c) => c.background.paper)};
  border: 1px solid ${tc((c) => c.grey[200])};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};

  &:hover {
    background: ${tc((c) => c.primary[50])};
    border-color: ${tc((c) => c.primary[300])};
    color: ${tc((c) => c.primary[600])};
  }

  svg {
    font-size: 18px;
    transition: transform ${transitions.duration.fast} ${transitions.easing.easeInOut};
    transform: ${({ $collapsed }) => ($collapsed ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

interface CollapsibleProps {
  $collapsed?: boolean;
}

export const PanelHeader = styled('div')<CollapsibleProps>`
  padding: ${({ $collapsed }) =>
    $collapsed ? `${spacing[3]} ${spacing[2]}` : `${spacing[4]} ${spacing[4]} ${spacing[3]}`};
  border-bottom: 1px solid ${tc((c) => c.grey[100])};
  transition: padding ${transitions.duration.normal} ${transitions.easing.easeInOut};
`;

export const HeaderRow = styled('div')<CollapsibleProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};
  margin-bottom: ${({ $collapsed }) => ($collapsed ? '0' : spacing[3])};
`;

export const PageTitle = styled('h2')<CollapsibleProps>`
  font-size: ${typography.fontSize['2xl']};
  font-weight: 700;
  color: ${tc((c) => c.text.primary)};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  width: ${({ $collapsed }) => ($collapsed ? 0 : 'auto')};
  overflow: hidden;
  white-space: nowrap;
  transition:
    opacity ${transitions.duration.fast} ${transitions.easing.easeInOut},
    width ${transitions.duration.normal} ${transitions.easing.easeInOut};
`;

export const TotalUnreadBadge = styled(Badge)`
  .MuiBadge-badge {
    background: ${tc((c) => c.primary[600])};
    color: white;
    font-size: 12px;
    font-weight: 600;
    min-width: 24px;
    height: 24px;
    padding: 0 8px;
    border-radius: 12px;
    position: relative;
    transform: none;
    top: auto;
    right: auto;
  }
`;

export const CollapsedUnreadBadge = styled(Badge)`
  .MuiBadge-badge {
    background: ${tc((c) => c.primary[600])};
    color: white;
    font-size: 10px;
    font-weight: 600;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: 9px;
    top: -4px;
    right: -4px;
  }
`;

export const SearchField = styled(TextField)<CollapsibleProps>`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'block')};

  .MuiOutlinedInput-root {
    border-radius: ${borderRadius.lg};
    background: ${tc((c) => c.grey[50])};
    transition: all ${transitions.duration.normal} ${transitions.easing.easeInOut};

    &:hover {
      background: ${tc((c) => c.grey[100])};
    }

    &.Mui-focused {
      background: ${tc((c) => c.background.paper)};
      box-shadow: 0 0 0 3px ${tc((c) => c.primary[100])};
    }

    fieldset {
      border-color: transparent;
    }

    &:hover fieldset {
      border-color: transparent;
    }

    &.Mui-focused fieldset {
      border-color: ${tc((c) => c.primary[400])};
    }
  }

  .MuiInputBase-input {
    padding: ${spacing[2]} ${spacing[3]};
    font-size: ${typography.fontSize.sm};

    &::placeholder {
      color: ${tc((c) => c.text.tertiary)};
      opacity: 1;
    }
  }
`;

export const CollapsedIcon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${borderRadius.lg};
  background: ${tc((c) => c.primary[50])};
  color: ${tc((c) => c.primary[600])};

  svg {
    font-size: 24px;
  }
`;

export const ChatList = styled(List)<CollapsibleProps>`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ $collapsed }) => ($collapsed ? spacing[1] : spacing[2])};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${tc((c) => c.grey[300])};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${tc((c) => c.grey[400])};
  }
`;

export const CollapsedChatItem = styled('div')<{ $selected?: boolean; $hasUnread?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[2]};
  margin-bottom: ${spacing[1]};
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeInOut};
  position: relative;
  background: ${({ $selected, $hasUnread }) =>
    $selected ? tc((c) => c.primary[50]) : $hasUnread ? 'rgba(245, 243, 255, 0.5)' : 'transparent'};
  border-left: 3px solid
    ${({ $selected }) => ($selected ? tc((c) => c.primary[600]) : 'transparent')};

  &:hover {
    background: ${tc((c) => c.grey[100])};
  }
`;

export const EmptyState = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[8]};
  text-align: center;
  animation: ${fadeIn} 0.5s ${transitions.easing.easeOut} forwards;
`;

export const EmptyIcon = styled('div')`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${tc((c) => c.primary[50])};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing[4]};

  svg {
    font-size: 40px;
    color: ${tc((c) => c.primary[400])};
  }
`;

export const EmptyTitle = styled('p')`
  font-size: ${typography.fontSize.lg};
  font-weight: 600;
  color: ${tc((c) => c.text.primary)};
  margin: 0 0 ${spacing[2]};
`;

export const EmptySubtext = styled('p')`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.secondary)};
  margin: 0;
  max-width: 280px;
  line-height: 1.5;
`;

export const SkeletonRow = styled('div')`
  display: flex;
  align-items: center;
  padding: ${spacing[3]} ${spacing[4]};
  gap: ${spacing[3]};
`;

export const SkeletonContent = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

export const RightPanel = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    ${tc((c) => c.background.default)} 0%,
    ${tc((c) => c.grey[50])} 100%
  );
  animation: ${fadeIn} 0.4s ${transitions.easing.easeOut} forwards;
  min-width: 0;
  height: 100%;
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const PlaceholderState = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[8]};
  text-align: center;
  background: linear-gradient(180deg, transparent 0%, ${tc((c) => c.primary[50])} 100%);
`;

export const PlaceholderIcon = styled('div')`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${tc((c) => c.primary[50])} 0%,
    ${tc((c) => c.primary[100])} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing[5]};
  box-shadow: 0 8px 32px ${tc((c) => c.primary[100])};

  svg {
    font-size: 64px;
    color: ${tc((c) => c.primary[400])};
  }
`;

export const PlaceholderText = styled('p')`
  font-size: ${typography.fontSize.xl};
  color: ${tc((c) => c.text.secondary)};
  margin: 0;
  font-weight: 500;
`;

export const PlaceholderSubtext = styled('p')`
  font-size: ${typography.fontSize.sm};
  color: ${tc((c) => c.text.tertiary)};
  margin: ${spacing[2]} 0 0;
  max-width: 280px;
`;
