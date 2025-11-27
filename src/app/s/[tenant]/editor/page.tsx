// app/s/[tenant]/editor/page.tsx
export default function StoreEditorPage({
  params,
}: {
  params: { tenant: string };
}) {
  // In future: check user auth + CraftJS canvas here
  return (
    <div className="h-full w-full p-4">
      <h1 className="text-xl font-semibold mb-4">Editor for {params.tenant}</h1>
      <p className="text-sm text-muted-foreground">
        Canvas / page builder will be integrated here.
      </p>
    </div>
  );
}
