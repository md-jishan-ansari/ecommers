import React from 'react'
import Image from 'next/image'

const Banner = () => {
  return (
      <div className="mb-6 p-10 py-14 flex gap-6 flex-wrap-reverse bg-gradient-to-r from-sky-500 to-sky-700 dark:from-sky-800 dark:to-sky-900">
        <div className="w-[calc(50%-12px)] lg:w-[calc(60%-12px)] md:w-full flex flex-col gap-2 lg:gap-1 items-center justify-center md:items-start">
            <h3 className="
                font-extrabold text-6xl text-white mb-3
                xl:text-5xl lg:text-4xl lg:font-bold lg:mb-1
            ">Summer Sales</h3>
            <p className="
                text-xl text-white
                lg:text-lg
            ">Enjoy discounts on selected items</p>
            <p className="
                text-5xl font-extrabold text-yellow-400
                xl:text-4xl lg:text-3xl lg:font-bold
            ">GET 50% OFF</p>
        </div>
        <div className="w-[calc(50%-12px)] lg:w-[calc(40%-12px)] md:w-full">
            <Image src="/banner-image.png" alt="banner" width={400} height={400} priority className="max-h-72 h-full w-full object-contain my-auto" />
        </div>
      </div>
  )
}

export default Banner
