import { Contents } from 'entities/contents/model/types/contents.type';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import ContentItem from '../ContentItem/ContentItem';
import { ITEMS_PER_ROW } from '../constants';
import {
  ContentListContainer,
  Header,
  MoreLink,
  StyledIcon,
  ToggleButton,
  Wrapper,
} from './ContentsList.stye';

type ContentsListType = 'scroll' | 'link' | 'toggle';
type ContentsListLinkTo = 'movie' | 'tv' | 'mypage';

interface Props {
  title: string;
  contents: Contents[];
  type: ContentsListType;
  linkTo?: ContentsListLinkTo;
  isCheckable?: boolean;
}

const ContentsList = ({
  title,
  contents,
  type,
  linkTo,
  isCheckable,
}: Props) => {
  const [showAll, setShowAll] = useState(false);
  const visibleContents =
    type === 'toggle' && !showAll ? contents.slice(0, ITEMS_PER_ROW) : contents;

  const showToggle = type === 'toggle' && contents.length > ITEMS_PER_ROW;

  return (
    <Wrapper>
      <Header $scroll={type === 'scroll' || type === 'link'}>
        <h2>{title}</h2>
        {type === 'link' && linkTo && (
          <MoreLink to={`/${linkTo}`}>더보기</MoreLink>
        )}
        {showToggle && (
          <ToggleButton onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? (
              <>
                접기 <StyledIcon as={ChevronUp} />
              </>
            ) : (
              <>
                더보기 <StyledIcon as={ChevronDown} />
              </>
            )}
          </ToggleButton>
        )}
      </Header>

      <ContentListContainer $scroll={type === 'scroll' || type === 'link'}>
        {visibleContents.map((item) => (
          <ContentItem key={item.id} content={item} isCheckable={isCheckable} />
        ))}
      </ContentListContainer>
    </Wrapper>
  );
};

export default ContentsList;
