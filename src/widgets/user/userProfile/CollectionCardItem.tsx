import { CollectionItem } from 'entities/collection';
import { Link } from 'react-router-dom';
import defaultCollectionImage from 'shared/assets/images/default-collection-thumbnail.png';
import { getImageUrl } from 'shared/utils/getImageUrl';
import styled from 'styled-components';

interface Props {
  collection: CollectionItem;
}

const CollectionCardItem = ({ collection }: Props) => {
  const { id, title, thumbnail } = collection;
  return (
    <CollectionItemStyle>
      <Link to={`/collection/${id}`}>
        <div className="collection-wrapper">
          <div className="thumbnail-wrapper">
            <img
              src={thumbnail ? getImageUrl(thumbnail) : defaultCollectionImage}
              alt={title}
            />
          </div>
          <div className="title-wrapper">
            <p className="title">{title}</p>
          </div>
        </div>
      </Link>
    </CollectionItemStyle>
  );
};

const CollectionItemStyle = styled.div`
.collection-wrapper {
    display: flex;
    flex-direction: column;
    width: 240px;
  }

  .thumbnail-wrapper {
    width: 240px;
    height: 150px;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .title-wrapper {
    margin-top: 12px;
    

    .title {
      font-size: ${({ theme }) => theme.fontSize.small};
      text-align: left;
    }
  }
`;

export default CollectionCardItem;
