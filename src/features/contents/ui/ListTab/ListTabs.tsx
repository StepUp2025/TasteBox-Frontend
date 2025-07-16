import styled from 'styled-components';
import { TabOption } from './TabOption.type';

interface Props {
  tabOptions: TabOption[];
  selectedTab: string;
  setSelectedTab: (id: string) => void;
}

const ListTabs = ({ tabOptions, selectedTab, setSelectedTab }: Props) => {
  // TODO: 장르별 추천 옵션은 구현 예정
  return (
    <ListTabStyle>
      {tabOptions.map((tab) => (
        <TabButton
          key={tab.id}
          $selected={tab.id === selectedTab}
          onClick={() => setSelectedTab(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </ListTabStyle>
  );
};

const ListTabStyle = styled.div`
  display: flex;
  gap: 36px;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $selected: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.large};
  border: none;
  font-weight: bold;
  color: ${({ $selected, theme }) =>
    $selected ? theme.color.primary : theme.color.hoverOverlay};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    display: ${({ $selected }) => ($selected ? 'block' : 'none')};
    position: absolute;
    bottom: -8px; /* 글자와 밑줄 사이 간격 */
    left: 0;
    width: 100%;
    height: 2px; /* 밑줄 굵기 */
    background-color: #C1B7FD;
    border-radius: 2px;
  }
`;

export default ListTabs;
