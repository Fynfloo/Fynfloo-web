'use client';

import {
  Sparkles,
  Palette,
  MonitorSmartphone,
  UploadCloud,
} from 'lucide-react';

const BentoGrid = () => {
  return (
    <div className="relative bg-gradient-to-b from-white via-indigo-50/40 to-white py-24 sm:py-32">
      {/* === Soft top fade to blend into hero === */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent"
      />

      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 relative z-10">
        <h2 className="text-center text-base font-semibold text-indigo-600">
          How It Works
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          Design smarter. Build faster. Launch effortlessly.
        </p>

        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* === 1. Page Builder === */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white/80 backdrop-blur-sm" />
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[calc(var(--radius-lg)+1px)] p-10">
              <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 mb-4">
                <Sparkles className="size-6" />
              </div>
              <p className="text-lg font-medium tracking-tight text-gray-950 text-center">
                Smart Page Builder
              </p>
              <p className="mt-2 max-w-sm text-sm/6 text-gray-600 text-center">
                Turn your ideas into stunning layouts in seconds. The builder
                handles structure and design—so you can focus on content.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* === 2. Customization === */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white/80 backdrop-blur-sm" />
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[calc(var(--radius-lg)+1px)] p-10">
              <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600 mb-4">
                <Palette className="size-6" />
              </div>
              <p className="text-lg font-medium tracking-tight text-gray-950 text-center">
                Effortless Customization
              </p>
              <p className="mt-2 max-w-sm text-sm/6 text-gray-600 text-center">
                Fine-tune colors, spacing, and typography with instant visual
                feedback—no code required.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* === 3. Responsive Design === */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white/80 backdrop-blur-sm" />
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[calc(var(--radius-lg)+1px)] p-10">
              <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 mb-4">
                <MonitorSmartphone className="size-6" />
              </div>
              <p className="text-lg font-medium tracking-tight text-gray-950 text-center">
                Responsive by Design
              </p>
              <p className="mt-2 max-w-sm text-sm/6 text-gray-600 text-center">
                Every layout automatically adapts to mobile, tablet, and desktop
                —so your site always looks perfect.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* === 4. Publishing === */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white/80 backdrop-blur-sm" />
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[calc(var(--radius-lg)+1px)] p-10">
              <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600 mb-4">
                <UploadCloud className="size-6" />
              </div>
              <p className="text-lg font-medium tracking-tight text-gray-950 text-center">
                One-Click Publishing
              </p>
              <p className="mt-2 max-w-sm text-sm/6 text-gray-600 text-center">
                Launch instantly or export clean React code to your preferred
                platform—your workflow, your choice.
              </p>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { BentoGrid };
