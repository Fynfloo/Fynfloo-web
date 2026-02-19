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
    <>
      <ConnectOnboarding storeId={storeId} />
    </>
  );
}
