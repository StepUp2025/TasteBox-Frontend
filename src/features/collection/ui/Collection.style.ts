import { hoverOverlay } from 'shared/styles/hoverOverlay';
import styled from 'styled-components';

export const CollectionListStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CollectionCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin-top: 24px;
`;

export const IconAlign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.color.primary};
  background-color:  ${({ theme }) => theme.color.basicBackground};
  border: 1px solid ${({ theme }) => theme.color.primary};
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-weight: 600;

  svg {
    stroke: ${({ theme }) => theme.color.primary}
  }

  ${hoverOverlay}
`;

export const CollectionListHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;
