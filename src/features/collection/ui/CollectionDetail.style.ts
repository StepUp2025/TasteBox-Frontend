import { rgba } from 'polished';
import styled from 'styled-components';

export const CollectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Description = styled.div`
  margin-top: 1rem;
  width: 90%;
`;

export const MoreButtonWrapper = styled.div`
  position: relative;
`;

export const MoreButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
    
  &:hover {
    background-color:  ${({ theme }) => rgba(theme.color.hoverOverlay, 0.1)};
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 100%;             
  right: 0;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow.default};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.color.basicBackground};
`;

export const MenuButton = styled.button`
  width: 220px;
  text-align: left;
  background-color: ${({ theme }) => theme.color.basicBackground};

  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};

  &:hover {
    font-weight: 500;
    background-color: ${({ theme }) => theme.color.subBackground};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.border};
    color: ${({ theme }) => theme.color.secondText};
    cursor: not-allowed;
  }
`;
