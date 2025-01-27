import React from 'react'
import ProductItem from './ProductItem';
import getProducts, { IProductParams } from '@/src/actions/getProducts';
import NullData from '../NullData';
import { Product, Review } from '@prisma/client';

interface ProductListsProps {
  searchParams: IProductParams
}
const ProductLists = async ({searchParams}: ProductListsProps) => {
  const products = await getProducts(searchParams);

  if(products.length === 0) {
    return (
      <NullData title="Oops! No products found" />
    )
  }

  function shuffleArray(array: any) {
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {shuffledProducts.map((product: Product & { reviews: Review[] }) => (
            <div key={product.id} >
                <ProductItem product={product} />
            </div>
        ))}
    </div>
  )
}

export default ProductLists
