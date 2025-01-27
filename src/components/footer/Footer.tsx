import React from 'react'
import Container from '@/src/components/Container'
import Link from 'next/link'

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube  } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-slate-700 py-12 text-slate-200 mt-auto'>
      <Container>
        <div className="flex justify-between flex-wrap gap-y-10">

          <div className="pr-5 w-1/6 xl:w-1/4 lg:w-1/2 sm:w-full">
            <h4 className="font-bold text-base">Shop Categories</h4>
            <div className="flex flex-col gap-2 mt-3 text-sm">
              <Link href="#">Phones</Link>
              <Link href="#">Laptops</Link>
              <Link href="#">Desktops</Link>
              <Link href="#">Watches</Link>
              <Link href="#">Tvs</Link>
              <Link href="#">Accessor</Link>
            </div>
          </div>

          <div className="pr-5  w-1/6 xl:w-1/4 lg:w-1/2 sm:w-full">
            <h4 className="font-bold text-base">Customer Service</h4>
            <div className="flex flex-col gap-2 mt-3 text-sm">
              <Link href="#">Phones</Link>
              <Link href="#">Laptops</Link>
              <Link href="#">Desktops</Link>
              <Link href="#">Watches</Link>
              <Link href="#">Tvs</Link>
              <Link href="#">Accessor</Link>
            </div>
          </div>

          <div className="pr-5  w-1/3 xl:w-1/4 lg:w-1/2 sm:w-full">
            <h4 className="font-bold text-base">About Us</h4>
            <div className="flex flex-col gap-2 mt-3 text-sm">
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit ultrices sagittis sodales nascetur, neque magna tellus pulvinar a faucibus mauris egestas torquent platea velit, eu dis justo id molestie malesuada auctor</p>
              <p> &ocpy; 2024 E~Shop, All rights reserved</p>
            </div>
          </div>

          <div className="pr-5  w-1/6 xl:w-1/4 lg:w-1/2 sm:w-full">
            <h4 className="font-bold text-base">Follow Us</h4>
            <div className="flex gap-2 mt-3 text-sm">
              <Link href="#" className="rounded-full bg-white p-2 text-slate-900 w-[30px] h-[30px] flex items-center justify-center"><FaFacebookF size={18} /></Link>
              <Link href="#" className="rounded-full bg-white p-2 text-slate-900 w-[30px] h-[30px] flex items-center justify-center"><FaTwitter size={20} /></Link>
              <Link href="#" className="rounded-full bg-white p-2 text-slate-900 w-[30px] h-[30px] flex items-center justify-center"><FaInstagram size={20} /></Link>
              <Link href="#" className="rounded-full bg-white p-2 text-slate-900 w-[30px] h-[30px] flex items-center justify-center"><FaYoutube size={20} /></Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
