"use client"
import React from 'react'
import { Rating } from "@mui/material";
import { useTheme } from '@/src/providers/ThemeContextProvider';
import { Review } from '@prisma/client';

interface RatingProps {
  reviews: Review[];
  readOnly?: boolean;
}

const RatingComponent:React.FC<RatingProps> = ({reviews, readOnly = true}) => {
  const {theme} = useTheme();

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const avgRating = totalRating / reviews.length || 0;

  return (
    <div className="flex gap-[2px]">
      <Rating
          value={avgRating}
          precision={0.5}
          readOnly={readOnly}
          sx={{
            '& .MuiRating-iconEmpty': {
              color: theme === 'dark' ? '#64748b': ""
            }
          } as const}
      />
    </div>
  )
}

export default RatingComponent
