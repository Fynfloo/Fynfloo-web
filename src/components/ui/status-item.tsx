import { CheckCircle2 } from 'lucide-react';

export function StatusItem({
  label,
  value,
}: {
  label: string;
  value?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-4 py-3">
      <span className="text-muted-foreground">{label}</span>
      {value ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <span className="text-muted-foreground text-xs">No</span>
      )}
    </div>
  );
}
