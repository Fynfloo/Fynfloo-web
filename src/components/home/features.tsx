'use client';

import { CloudUpload, Palette, Smartphone, Rocket } from 'lucide-react';

const features = [
  {
    name: 'One-Click Deploy',
    description:
      'Publish your store instantly to the web or export ready-to-use React code — no setup required.',
    icon: CloudUpload,
    bg: 'from-green-100 to-emerald-100 text-green-600',
  },
  {
    name: 'Visual Customization',
    description:
      'Easily adjust colors, layouts, and spacing. See changes live in real-time, no coding needed.',
    icon: Palette,
    bg: 'from-purple-100 to-blue-100 text-purple-600',
  },
  {
    name: 'Responsive Design',
    description:
      'Every page automatically adapts to desktop, tablet, and mobile screens for a perfect fit.',
    icon: Smartphone,
    bg: 'from-pink-100 to-rose-100 text-pink-600',
  },
  {
    name: 'Performance Optimized',
    description:
      'Fast-loading pages and modern layouts ensure your visitors have the best experience.',
    icon: Rocket,
    bg: 'from-yellow-100 to-orange-100 text-yellow-600',
  },
];

const Features = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-indigo-600">
            Why You’ll Love It
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to launch your store
          </p>
          <p className="mt-6 text-lg text-gray-700">
            Build, customize, and deploy your online store quickly and
            confidently. No coding, no hassle, just results.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold text-gray-900">
                  <div
                    className={`absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.bg}`}
                  >
                    <feature.icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export { Features };
