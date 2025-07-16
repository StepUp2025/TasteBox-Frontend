import { CollectionCard } from 'entities/collection';
import { rgba } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  collection: CollectionCard;
}

const CollectionCardItem = ({ collection }: Props) => {
  const { id, title, thumbnail } = collection;
  return (
    <CollectionItemStyle>
      <Link to={`/collection/${id}`}>
        <div className="collection-wrapper">
          <div className="thumbnail-wrapper">
            <img src={thumbnail} alt={title} />
          </div>
          <div className="title-wrapper">
            <p className="title">{title}</p>
          </div>
        </div>
      </Link>
    </CollectionItemStyle>
  );
};

const CollectionItemStyle = styled.li`
  list-style: none;

.collection-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .thumbnail-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    overflow: hidden;
    border: 1px solid ${({ theme }) => rgba(theme.color.border, 0.5)};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .title-wrapper {
    margin-top: 0.75rem;
    

    .title {
      font-size: ${({ theme }) => theme.fontSize.small};
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: keep-all;
    }
  }
`;

export default CollectionCardItem;
