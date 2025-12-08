'use client';

import { useUserStores } from '@/app/hooks/use-user-stores';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PlusCircle, Store as StoreIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { rootDomain } from '@/lib/utils';

interface StoreListProps {
  onCreateStore: () => void;
  showCreateCard?: boolean;
}

export function StoreList({
  onCreateStore,
  showCreateCard = true,
}: StoreListProps) {
  const { stores, loading } = useUserStores();

  if (loading) {
    return (
      <Card className="p-12 flex flex-col items-center text-center space-y-4 shadow-sm">
        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
        <p className="text-muted-foreground">Loading your stores...</p>
      </Card>
    );
  }

  if (!loading && stores.length === 0) {
    return (
      <Card className="p-12 flex flex-col items-center text-center space-y-6 shadow-sm">
        <StoreIcon className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">
          You don’t have any stores yet
        </h2>
        <p className="text-muted-foreground max-w-md">
          Create your first store to start customizing pages, adding products,
          and launching your site.
        </p>
        <Button size="lg" className="mt-4" onClick={onCreateStore}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Store
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {stores.map((store) => (
        <Card key={store.id} className="shadow-sm">
          <CardHeader>
            <CardTitle>{store.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {store.subdomain}.{rootDomain}
            </p>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {store.category || 'Uncategorized'}
            </div>
            <Button asChild size="sm">
              <Link href={`/dashboard/stores/${store.id}`}>
                Go to dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}

      {showCreateCard && (
        <Card
          className="border-dashed flex items-center justify-center shadow-none cursor-pointer hover:bg-muted/50 transition"
          onClick={onCreateStore}
        >
          <div className="text-center p-10 space-y-3">
            <PlusCircle className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="font-medium">Create another store</p>
          </div>
        </Card>
      )}
    </div>
  );
}
