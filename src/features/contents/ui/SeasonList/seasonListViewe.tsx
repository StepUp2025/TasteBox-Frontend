import { Empty } from 'shared/ui/empty/empty';
import {
  ContentListContainer,
  Header,
  Wrapper,
} from '../ContentsList/ContentsList.stye';
import SeasonItemView from '../seasonItem/seasonItemView';

interface SeasonListViewerProps {
  title: string;
  seasons: {
    id: number;
    title: string;
    posterPath?: string | null;
  }[];
  type: 'scroll';
  numberOfSeasons?: number;
}

const SeasonListViewer = ({
  title,
  seasons,
  type,
  numberOfSeasons,
}: SeasonListViewerProps) => {
  return (
    <Wrapper>
      <Header>
        <h2>
          {title}({numberOfSeasons})
        </h2>
      </Header>

      {seasons.length === 0 && (
        <div className="empty-wrapper">
          <Empty text="시즌 정보가 없습니다." height="30vh" />
        </div>
      )}

      <ContentListContainer $scroll={type === 'scroll'}>
        {seasons.map((item) => (
          <SeasonItemView key={item.id} season={item} />
        ))}
      </ContentListContainer>
    </Wrapper>
  );
};

export default SeasonListViewer;
