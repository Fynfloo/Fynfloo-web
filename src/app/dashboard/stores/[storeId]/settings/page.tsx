import { ConnectOnboarding } from '@/components/dashboard/connect-onboarding';

export default async function StoreSettingsPage({
  params,
  children,
}: {
  params: Promise<{ storeId: string }>;
  children: React.ReactNode;
}) {
  const { storeId } = await params;
  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Store Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your store configuration, payments and integrations.
        </p>
      </div>
      <ConnectOnboarding storeId={storeId} />

      <div className="opacity-50 pointer-events-none">
        <p className="text-sm">More settings coming soon...</p>
      </div>
    </div>
  );
}
