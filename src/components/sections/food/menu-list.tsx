'use client';

import { SectionShell } from '../core/section-shell';
import { SectionHeading } from '../core/section-heading';
import { registerSection } from '@/lib/sections/registry';
import type { MenuListData, SectionDefaultContext } from '@/lib/sections/types';

type Props = { data: MenuListData };

function MenuList({ data }: Props) {
  return (
    <SectionShell>
      <SectionHeading title={data.heading} />
      <div className="space-y-8">
        {data.sections.map((section, i) => (
          <div key={i}>
            <h3 className="text-lg font-medium mb-2">{section.name}</h3>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function getDefaultData(): MenuListData {
  return {
    heading: 'Menu',
    sections: [
      {
        name: 'Popular dishes',
        items: [
          { name: 'Spaghetti Carbonara', price: '£12.00' },
          { name: 'Margherita Pizza', price: '£10.50' },
        ],
      },
      {
        name: 'Desserts',
        items: [
          { name: 'Tiramisu', price: '£6.00' },
          { name: 'Panna Cotta', price: '£5.00' },
        ],
      },
    ],
  };
}

registerSection({
  type: 'food.menuList',
  label: 'Menu list',
  group: 'food',
  component: MenuList,
  getDefaultData,
});

export default MenuList;
