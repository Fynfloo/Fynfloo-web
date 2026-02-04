export function StepSummary({
  title,
  lines,
  onEdit,
}: {
  title: string;
  lines: string[];
  onEdit: () => void;
}) {
  return (
    <div className="rounded-lg border border-black/10 bg-gray-50 p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium">{title}</h3>
        <button
          onClick={onEdit}
          className="text-xs underline opacity-70 hover:opacity-100"
        >
          Edit
        </button>
      </div>

      <div className="mt-2 space-y-1 text-sm">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
