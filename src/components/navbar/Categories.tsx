"use client";
import { Container } from '@mui/material'
import React from 'react'
import Category from './Category'
import { usePathname, useSearchParams } from 'next/navigation'
import { categories } from '@/src/utils/Categories';

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <div className="bg-background">
            <Container>
                <div className="pt-4 flex flex-row items-center justify-center gap-11 overflow-x-auto">
                    <div>
                        <Category label={categories[0].label} icon={categories[0].icon}
                            selected={category === 'All' || category === null}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <div className="flex flex-row items-center gap-11 justify-between w-fit">
                            {categories.map((item) => {
                                if (item.label === 'All') {
                                    return null;
                                }
                                return (
                                    <div key={item.label}>
                                        <Category label={item.label} icon={item.icon}
                                            selected={category === item.label}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
  )
}

export default Categories
