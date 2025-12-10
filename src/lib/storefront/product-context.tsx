'use client';
import { createContext, useContext } from 'react';
import type { Product } from '@/lib/storefront/types';

const ProductContext = createContext<Product | null>(null);

export function ProductProvider({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const product = useContext(ProductContext);
  if (!product) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return product;
}
