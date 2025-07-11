import { GenreContainer } from 'features/genre/style/GenreSelectPage.style';
import { TvGenreSelectForm } from 'features/genre/ui/TVGenreSelectForm';
import { ProgressBar, Title } from 'shared/ui';

export default function TVGenreSelectPage() {
  return (
    <GenreContainer>
      <div>
        <ProgressBar
          from={50}
          to={100}
          label={'TV 시리즈 취향 분석 중... 📺'}
        />
        <Title as="h1">평소 관심 있는 TV 시리즈 장르는 무엇인가요?</Title>
        <TvGenreSelectForm />
      </div>
    </GenreContainer>
  );
}
