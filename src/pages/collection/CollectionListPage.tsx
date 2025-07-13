import styled from 'styled-components';
import UserCollectionList from 'widgets/collection/UserCollectionList';

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
