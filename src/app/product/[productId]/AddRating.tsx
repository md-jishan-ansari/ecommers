"use client";

import Button from '@/src/components/Button';
import InputFields from '@/src/components/inputs/InputFields';
import { SafeUser } from '@/src/types/types';
import { Rating } from '@mui/material';
import { Order, Product, Review } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface AddRatingProps {
  product: Product & {
    reviews: Review[]
  };
  user: SafeUser & {
    orders: Order[]
  } | null
}



const AddRating:React.FC<AddRatingProps> = ({product, user}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, setValue, reset, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        if(data.rating === 0) return toast.error('No rating selected');

        const ratingData = {...data, userId: user?.id, product: product };

        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Rating added');
            router.refresh();
            reset();
        }).catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        })

    }

    if(!user || !product) return null;

    const deliveredOrder = user?.orders.some(order => order.products.find(item => item.id === product.id) && order.deliveryStatus === 'delivered');

    const userReview = product?.reviews.find(((review: Review) => {
        return review.userId === user.id;
    }));

    if(userReview || !deliveredOrder) {
        return null;
    }

    return (
        <div className='flex flex-col gap-2 max-w-[500px]'>
            <h3 className="text-slate-800 dark:text-white text-3xl text-center font-semibold mb-2">Rate this product</h3>
            <Rating onChange={(event, newValue) => setCustomValue('rating', newValue)} />
            <div className="mt-4">
                <InputFields
                    name="comment"
                    label="Comment"
                    register={register}
                    errors={errors}
                />
            </div>
            <Button
                variant="dark"
                size="md"
                rounded="rounded-lg"
                isLoading={false}
                fullWidth
                onClick={handleSubmit(onSubmit)}
            >
                {isLoading ? "Loading..." : "Rate Product"}
            </Button>
        </div>
    )
}

export default AddRating
