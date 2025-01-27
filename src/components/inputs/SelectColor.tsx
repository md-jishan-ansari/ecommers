'use client'

import React, { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import { ImageType } from "@/src/app/admin/add-products/AddProductForm";
import SelectImage from "./SelectImage";

interface SelectColorProps {
    item: ImageType;
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
    isProductCreated: boolean;
}

const SelectColor:React.FC<SelectColorProps> = ({item, addImageToState, removeImageFromState, isProductCreated}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if(isProductCreated) {
            setIsSelected(false);
            setFile(null);
        }
    }, [isProductCreated]);

    const handleFileChange = useCallback((value: File) => {
        setFile(value);
        addImageToState({
            ...item,
            image: value
        })
    }, []);

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelected(e.target.checked);

        if(!e.target.checked) {
            setFile(null);
            removeImageFromState(item)
        }

    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
            <div className="flex flex-row items-center gap-2 h-[60px]">
                <input id={item.color} type="checkbox" checked={isSelected} onChange={handleCheck} className="cursor-pointer" />
                <label htmlFor={item.color} className="font-medium cursor-pointer">
                    {item.color}
                </label>
            </div>
            <>
            {isSelected && !file && (
                <div className="col-span-2 text-center">
                    <SelectImage item={item} handleFileChange={handleFileChange} />
                </div>
            )}
            {file && (
                <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-center">
                    {/* <Image src={URL.createObjectURL(file)} alt={item.color} className="w-[100px] h-[100px] object-cover" /> */}
                    <p>{file?.name}</p>
                    <div className="w-[70px]">

                        <Button
                            variant="lightoutline"
                            size="md"
                            rounded="rounded-lg"
                            isLoading={false}
                            fullWidth
                            onClick={() => {
                                setFile(null);
                                removeImageFromState(item);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
            </>
        </div>
    )
}

export default SelectColor
