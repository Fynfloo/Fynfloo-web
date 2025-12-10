'use client';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-2 mb-6">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
