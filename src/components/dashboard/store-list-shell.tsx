'use client';

import { StoreList } from '@/components/dashboard/store-list';
import { CreateStoreModal } from '@/components/dashboard/create-store-modal';
import { useState } from 'react';

export default function StoreListShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Stores</h1>
      <StoreList onCreateStore={() => setOpen(true)} showCreateCard={true} />

      <CreateStoreModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
