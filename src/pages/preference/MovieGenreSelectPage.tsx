import { GenreContainer } from 'features/genre/style/GenreSelectPage.style';
import { MovieGenreSelectForm } from 'features/genre/ui/MovieGenreSelectForm';
import { ProgressBar, Title } from 'shared/ui';

export default function MovieGenreSelectPage() {
  return (
    <GenreContainer>
      <div>
        <ProgressBar from={0} to={50} label={'영화 취향 분석 중... 🎬'} />
        <Title as="h1">평소 관심 있는 영화 장르는 무엇인가요?</Title>
        <MovieGenreSelectForm />
      </div>
    </GenreContainer>
  );
}
