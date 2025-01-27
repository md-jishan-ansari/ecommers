import React from 'react'
import Container from '@/src/components/Container';
import ProductDetail from './ProductDetail';
import ProductRatings from './ProductRatings';
import getProductById from '@/src/actions/getProductById';
import AddRating from './AddRating';
import getCurrentUser from '@/src/actions/getCurrentUser';

interface Props {
  productId: string
}

const Product = async ({ params }: {params: Props}) => {
  const {productId} = await params;
  const product = await getProductById({productId});
  const user = await getCurrentUser(true);



  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div  className="p-8">
      <Container>
        <ProductDetail product={product} />
        <div className="mt-14">
          <AddRating product={product} user={user} />
          <h3 className="text-2xl font-bold mt-5">Product Review</h3>
          {product.reviews.length ? (
             product.reviews.map((review) => (
              <div key={review.id}>
                <ProductRatings review={review} />
              </div>
            ))
          ) : (
            <div>No reviews</div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Product;
