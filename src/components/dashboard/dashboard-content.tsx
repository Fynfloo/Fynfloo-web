'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { PlusCircle, Store } from 'lucide-react';
import { Button } from '../ui/button';
import { CreateStoreModal } from './create-store-modal';
import { rootDomain } from '@/lib/utils';

type StoreType = {
  id: string;
  name: string;
  subdomain?: string;
};

export function DashboardContent() {
  const [stores, setStores] = useState<StoreType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadStores() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/stores', {
          credentials: 'include',
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError('You are not logged in.');
          } else {
            setError('Failed to load stores.');
          }
          return;
        }

        const data = await res.json();
        if (!cancelled) {
          setStores(data.stores || []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError('An unexpected error occurred.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadStores();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full ">
      {/*Title*/}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your stores and settings.{' '}
        </p>
      </div>
      {loading ? (
        <Card className="p-8">
          <p className="text-muted-foreground">Loading your stores…</p>
        </Card>
      ) : error ? (
        <Card className="p-8">
          <p className="text-destructive text-sm">{error}</p>
        </Card>
      ) : stores.length === 0 ? (
        <Card className="p-12 flex flex-col items-center text-center space-y-6 shadow-sm">
          <Store className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">
            You don’t have any stores yet
          </h2>
          <p className="text-muted-foreground max-w-md">
            Create your first store to start customizing pages, adding products,
            and launching your site.
          </p>
          <Button
            size="lg"
            className="mt-4"
            onClick={() => setOpenCreateModal(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Store
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {stores.map((store) => (
            <Card key={store.id} className="shadow-sm">
              <CardHeader>
                <CardTitle>{store.name}</CardTitle>
                <CardDescription>
                  {' '}
                  {store.subdomain}.{rootDomain}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button asChild>
                  <a
                    href={`https://${store.subdomain}.${rootDomain}/dashboard`}
                  >
                    Go to Dashboard
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card
            className="border-dashed flex items-center justify-center shadow-none cursor-pointer hover:bg-muted/50 transition"
            onClick={() => setOpenCreateModal(true)}
          >
            <div className="text-center p-10 space-y-3">
              <PlusCircle className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="font-medium">Create Store</p>
            </div>
          </Card>
        </div>
      )}
      <CreateStoreModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
      />
    </div>
  );
}
