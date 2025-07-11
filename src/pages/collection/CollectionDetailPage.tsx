import { CollectionDetailBody } from 'features/collection/ui/CollectionDetailBody';
import { CollectionHeader } from 'features/collection/ui/CollectionHeader';
import { Container } from 'shared/styles/Container';

export default function CollectionDetailPage() {
  return (
    <Container>
      <CollectionHeader />
      <CollectionDetailBody />
    </Container>
  );
}
