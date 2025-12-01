'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  PlusCircle,
  Store as StoreIcon,
  BarChart2,
  Globe2,
} from 'lucide-react';
import { Button } from '../ui/button';
import { CreateStoreModal } from './create-store-modal';
import { rootDomain } from '@/lib/utils';
import { useUserStores } from '@/app/hooks/use-user-stores';

type StoreType = {
  id: string;
  name: string;
  subdomain?: string;
  category?: string;
};

export function DashboardContent() {
  const { stores, loading } = useUserStores();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="w-full space-y-8">
      {/* Title + CTA */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your stores, track performance, and customize your setup.
          </p>
        </div>
        <Button size="lg" onClick={() => setOpenCreateModal(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create new store
        </Button>
      </div>

      {/* Top widgets */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total stores</CardTitle>
            <StoreIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '—' : stores.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Each store can have its own domain, theme, and products.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recently active
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '—' : Math.min(stores.length, 3)}
            </div>
            <p className="text-xs text-muted-foreground">
              Stores with traffic in the last 24 hours (placeholder).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Domains connected
            </CardTitle>
            <Globe2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '—' : stores.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Counting primary subdomains; custom domains coming soon.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Store list */}
      {loading ? (
        <Card className="p-12 flex flex-col items-center text-center space-y-4 shadow-sm">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <p className="text-muted-foreground">Loading your stores...</p>
        </Card>
      ) : stores.length === 0 ? (
        <Card className="p-12 flex flex-col items-center text-center space-y-6 shadow-sm">
          <StoreIcon className="h-12 w-12 text-muted-foreground" />
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
                <p className="text-sm text-muted-foreground">
                  {store.subdomain}.{rootDomain}
                </p>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {store.category || 'Uncategorized'}
                </div>
                <Button asChild size="sm">
                  <a
                    href={`https://${store.subdomain}.${rootDomain}/dashboard`}
                  >
                    Go to dashboard
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
              <p className="font-medium">Create another store</p>
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
