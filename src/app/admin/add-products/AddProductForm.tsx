"use client"

import InputFields from '@/src/components/inputs/InputFields';
import Button from '@/src/components/Button';
import CategoryInput from '@/src/components/inputs/CategoryInput';
import CustomCheckBox from '@/src/components/inputs/CustomCheckBox';
import SelectColor from '@/src/components/inputs/SelectColor';
import TextArea from '@/src/components/inputs/TextArea';
import { categories } from '@/src/utils/Categories';
import { colors } from '@/src/utils/Colors';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean(),
  price: z.string().min(1, "Price is required"),
  images: z.array(z.any()).min(1, "At least one product image is required")
});

type ProductFormValues = z.infer<typeof productSchema>;


const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false);
  const router = useRouter();


  const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      inStock: false,
      images: [],
      price: "",
    }
  });

  useEffect(() => {
    if (images !== null) {
      setCustomValue('images', images);
    }
  }, [images]);

  useEffect(() => {
    if(isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, setIsProductCreated]);

  const category = watch('category');

  const setCustomValue = (id: keyof ProductFormValues, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if(!prev) {
        return [value]
      }

      return [...prev, value]
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if(prev) {
        return prev.filter(item => item.color != value.color);
      }

      return prev
    })

  }, [])

  const onSubmit:SubmitHandler<FieldValues> = async (data) => {


    setIsLoading(true);
    const uploadedImages: UploadedImageType[] = [];

    if(!data.category) {
      setIsLoading(false);
      return toast.error("Please select a category");
    }

    if(!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Please add at least one image");
    }

    const handleImageUpload = async () => {
      toast.info("Creating Product, please wait...");
      try {
        const formData = new FormData();

        // First, validate that we have images to upload
        if (!data.images || data.images.length === 0) {
          throw new Error("No images to upload");
        }

        // Append each image with its color name
        data.images.forEach((item: ImageType) => {
          if (item.image) {
            formData.append(item.color, item.image);
          }
        });

        const response = await fetch('/api/product/image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const uploadedData = await response.json();

        console.log({uploadedData});

        // Process the uploaded images
        for (const item of data.images) {
          if (item.image) {
            uploadedImages.push({
              color: item.color,
              colorCode: item.colorCode,
              image: uploadedData.urls[item.color]
            });
          }
        }

        toast.success('Images uploaded successfully!');
      } catch (error: any) {
        console.error('Upload error:', error);
        toast.error(error.message || "Something went wrong during image upload");
        throw error; // Re-throw to prevent product creation
      }
    }

    await handleImageUpload();

    console.log({uploadedImages});

    const productData = {
      ...data,
      images: uploadedImages
    }

    axios.post('/api/product', productData).then(() => {
      toast.success("Product created successfully");
      setIsProductCreated(true);
      router.refresh();
    }).catch((error) => {
      toast.error("Something went wrong" + error.message);
    }).finally(() => {
      setIsLoading(false);
    })

  }
  return (
    <div className="p-10">
      <h3 className="text-slate-800 dark:text-white text-3xl text-center font-semibold mb-2">Add a Product</h3>
      <div className="mt-4">
        <InputFields
          name="name"
          label="Name"
          register={register}
          errors={errors}
          placeholder="Enter product name"
        />
      </div>

      <div className="mt-4">
        <InputFields
          name="price"
          label="Price"
          register={register}
          errors={errors}
          type="number"
          placeholder="Enter product price"
        />
     </div>

      <div className="mt-4">
        <InputFields
          name="brand"
          label="Brand"
          register={register}
          errors={errors}
          placeholder="Enter product brand"
        />
     </div>

      <div className="mt-4">
        <TextArea
          name="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          placeholder="Enter product description"
        />
     </div>

      <div className="mt-4">
        <CustomCheckBox
          id="inStock"
          register={register}
          label="This Product is in Stock"
        />
      </div>


      <div className="w-full font-medium mt-4">
        <div className="mb-2 font-semibold">Select a Category</div>
          {errors["category"] && <p className='text-sm text-red-600 mt-1'>{errors["category"]?.message}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
            {categories.map(item => {
              if(item.label === "All") return null;

              return (
                <div key={item.label} className="col-span">
                  <CategoryInput
                      onClick={(category => setCustomValue('category', category))}
                      selected={category === item.label}
                      label={item.label}
                      icon={item.icon}
                  />
                </div>
              )
            })}
          </div>
      </div>


      <div className="w-full flex flex-col flex-wrap gap-4 mt-4">
        <div>
            <div className="font-bold">
                Select the available product colors and upload their images
            </div>
            <div className="text-sm">
                You must upload an image for each color selected otherwise your color selection will be ignored.
            </div>
        </div>
        {errors["images"] && <p className='text-sm text-red-600 mt-1'>{errors["images"]?.message}</p>}
        <div className="grid grid-cols-2 gap-3">
            {colors.map((item) => (
              <div key={item.color}>
                <SelectColor
                  item={item}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
              </div>
            ))}
        </div>
      </div>

      <div className="mt-4">
        <Button
            variant="dark"
            size="md"
            rounded="rounded-lg"
            isLoading={false}
            fullWidth
            onClick={handleSubmit(onSubmit)}
        >
            {isLoading ? 'Loading...' : 'Add Product'}
        </Button>
      </div>

    </div>
  )
}

export default AddProductForm
