import {
  Contents,
  ContentType,
} from 'entities/contents/model/types/contents.type';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Empty } from 'shared/ui/empty/empty';
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
  contentType?: ContentType;
  linkTo?: ContentsListLinkTo;
  marginTop?: string;
}

const ContentsListViewer = ({
  title,
  contents,
  type,
  linkTo,
  contentType,
  marginTop,
}: Props) => {
  const [showAll, setShowAll] = useState(false);
  console.log('콘텐츠 리스트:', contents);
  const visibleContents =
    type === 'toggle' && !showAll
      ? contents.slice(0, MAX_ITEMS_PER_ROW)
      : contents;

  const showToggle = type === 'toggle' && contents.length > MAX_ITEMS_PER_ROW;

  return (
    <Wrapper marginTop={marginTop}>
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

      {contents.length === 0 && (
        <div className="empty-wrapper">
          <Empty text="컨텐츠가 없습니다." height="30vh" />
        </div>
      )}

      <ContentListContainer $scroll={type === 'scroll' || type === 'link'}>
        {visibleContents.map((item) => (
          <ContentItemView
            key={item.id}
            content={item}
            contentType={contentType}
          />
        ))}
      </ContentListContainer>
    </Wrapper>
  );
};

export default ContentsListViewer;
