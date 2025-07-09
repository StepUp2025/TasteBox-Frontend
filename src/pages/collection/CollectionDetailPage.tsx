import { CollectionHeader } from 'features/collection/ui/CollectionHeader';
import { useState } from 'react';

export default function CollectionDetailPage() {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <CollectionHeader isEditMode={editMode} onToggleEditMode={setEditMode} />
    </div>
  );
}
