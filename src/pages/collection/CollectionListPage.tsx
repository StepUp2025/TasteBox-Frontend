import UserCollectionList from 'features/collection/ui/UserCollectionList';
import styled from 'styled-components';

const CollectionListPage = () => {
  return (
    <CollectionListPageStyle>
      <UserCollectionList />
    </CollectionListPageStyle>
  );
};

const CollectionListPageStyle = styled.div`
margin-top: 3rem;`;

export default CollectionListPage;
