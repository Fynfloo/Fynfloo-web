import { cn } from '@/lib/utils';

type Props = {
  title?: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({
  title,
  eyebrow,
  description,
  children,
  className,
}: Props) {
  return (
    <section className={cn('flex flex-col gap-4', className)}>
      {(title || description || eyebrow) && (
        <header className="flex items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-lg font-semibold text-slate-50">{title}</h2>
            )}
            {description && (
              <p className="text-xs text-slate-400">{description}</p>
            )}
          </div>
        </header>
      )}

      {children}
    </section>
  );
}
