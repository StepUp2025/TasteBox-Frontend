import { Container } from 'features/collection/style/Container.style';
import { CollectionDetailBody } from 'features/collection/ui/CollectionDetailBody';
import { CollectionHeader } from 'features/collection/ui/CollectionHeader';

export default function CollectionDetailPage() {
  return (
    <Container>
      <CollectionHeader />
      <CollectionDetailBody />
    </Container>
  );
}
