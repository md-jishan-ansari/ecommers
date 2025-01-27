import Avatar from '@/src/components/Avatar'
import RatingComponent from '@/src/components/products/RatingComponent'
import { Review, User } from '@prisma/client'
import React from 'react'

interface ProductRatingsProps {
  review: Review & {
    user: User
  }
}

const ProductRatings: React.FC<ProductRatingsProps> = ({ review }) => {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-3 mb-2">
        <Avatar image={review?.user?.image} />
        <p>{review.user.name}</p>
      </div>
      <RatingComponent reviews={[review]} />
      <p className="text-sm mt-2 text-slate-500">{review.comment}</p>
      <hr className="my-3" />
    </div>
  )
}

export default ProductRatings