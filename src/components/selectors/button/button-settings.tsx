import React from 'react';

import { ToolbarSection, ToolbarItem } from '@/components/toolbar';
import { RGBA } from '@/types/selector-type';
import { rgbaToCss } from '@/lib/helper';

export const ButtonSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection
        title="colors"
        props={['background', 'color']}
        // summary={({ nodeProps }: { nodeProps?: Record<string, RGBA> }) => {
        //   const background = nodeProps?.['background'];
        //   const color = nodeProps?.['color'];
        //   return (
        //     <div className="flex flex-row-reverse">
        //       <div
        //         style={{
        //           background: background ? rgbaToCss(background) : '#000',
        //         }}
        //         className="shadow-md flex-end w-6 h-6 text-center flex items-center rounded-full"
        //       >
        //         <p
        //           style={{
        //             color: color ? rgbaToCss(color) : '#fff',
        //           }}
        //           className="w-full text-center"
        //         >
        //           T
        //         </p>
        //       </div>
        //     </div>
        //   );
        // }}
      >
        <ToolbarItem propKey="background" type="bg" label="Background" />
        <ToolbarItem propKey="color" type="color" label="Text" />
      </ToolbarSection>
    </React.Fragment>
  );
};
