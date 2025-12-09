// import { fetchStoreOverview } from "@/lib/fetch-store-overview";

export default async function StoreOverview() {
  //   const overview = await fetchStoreOverview(params.storeId);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Overview</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-card">
          <p className="text-muted-foreground text-sm">Orders (24h)</p>
          <h3 className="text-2xl font-bold">12</h3>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <p className="text-muted-foreground text-sm">Visitors</p>
          <h3 className="text-2xl font-bold">5</h3>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <p className="text-muted-foreground text-sm">Revenue</p>
          <h3 className="text-2xl font-bold">£200</h3>
        </div>
      </div>
    </div>
  );
}
