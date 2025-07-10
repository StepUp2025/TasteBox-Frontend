import { Contents } from 'entities/contents/model/types/contents.type';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import ContentItemView from '../ContentItem/ContentItemView';
import { MAX_ITEMS_PER_ROW } from '../constants';
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
}

const ContentsListViewer = ({ title, contents, type, linkTo }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const visibleContents =
    type === 'toggle' && !showAll
      ? contents.slice(0, MAX_ITEMS_PER_ROW)
      : contents;

  const showToggle = type === 'toggle' && contents.length > MAX_ITEMS_PER_ROW;

  return (
    <Wrapper>
      <Header>
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
          <ContentItemView key={item.id} content={item} />
        ))}
      </ContentListContainer>
    </Wrapper>
  );
};

export default ContentsListViewer;
