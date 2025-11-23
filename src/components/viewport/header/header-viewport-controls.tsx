// // components/viewport/HeaderViewportControls.tsx
// 'use client';

// import React from 'react';
// import { useViewport } from '@/components/viewport/context/viewport-context';
// import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut } from 'lucide-react';
// import { Button } from '@/components/ui/button'; // adapt if you have different button

// export const HeaderViewportControls = () => {
//   const { mode, setMode, zoom, setZoom } = useViewport();

//   return (
//     <div className="flex items-center gap-2">
//       <Button
//         variant={mode === 'desktop' ? 'default' : 'ghost'}
//         onClick={() => setMode('desktop')}
//       >
//         <Monitor />
//       </Button>
//       <Button
//         variant={mode === 'tablet' ? 'default' : 'ghost'}
//         onClick={() => setMode('tablet')}
//       >
//         <Tablet />
//       </Button>
//       <Button
//         variant={mode === 'mobile' ? 'default' : 'ghost'}
//         onClick={() => setMode('mobile')}
//       >
//         <Smartphone />
//       </Button>

//       <div className="mx-2 h-6 border-l" />

//       <Button
//         variant="ghost"
//         onClick={() => setZoom(Math.max(0.2, +(zoom - 0.1).toFixed(2)))}
//       >
//         <ZoomOut />
//       </Button>
//       <div className="px-2 text-sm">{Math.round(zoom * 100)}%</div>
//       <Button variant="ghost" onClick={() => setZoom(+(zoom + 0.1).toFixed(2))}>
//         <ZoomIn />
//       </Button>
//     </div>
//   );
// };
