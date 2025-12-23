'use client';

import { createContext, useContext } from 'react';
import type { Product } from './types';

export type ProductsListingMap = {
  all: Product[];
  byCollection: Record<string, Product[]>;
};

const ProductsListingContext = createContext<ProductsListingMap | null>(null);

export function ProductsListingProvider({
  value,
  children,
}: {
  value: ProductsListingMap;
  children: React.ReactNode;
}) {
  return (
    <ProductsListingContext.Provider value={value}>
      {children}
    </ProductsListingContext.Provider>
  );
}

export function useProductsListing() {
  const ctx = useContext(ProductsListingContext);
  if (!ctx) {
    throw new Error(
      'useProductsListing must be used within ProductsListingProvider'
    );
  }
  return ctx;
}
