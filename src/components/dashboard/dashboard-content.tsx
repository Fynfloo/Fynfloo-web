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
import { useUserStores } from '@/app/hooks/use-user-stores';
import { StoreList } from './store-list';

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
      <StoreList onCreateStore={() => setOpenCreateModal(true)} />

      <CreateStoreModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
      />
    </div>
  );
}
