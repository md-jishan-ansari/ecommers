'use client';
import { useTheme } from '@/src/providers/ThemeContextProvider';
import { usePathname } from 'next/navigation';
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Darkmode = () => {
  const {theme, toggleTheme, excludedUrls} = useTheme();
  let pathname = usePathname();
  pathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if(excludedUrls && excludedUrls.includes(pathname)) return null;

  return (
    <div>
      <button
        className="
          bg-black
          dark:bg-white
          text-white
          dark:text-black
          border-2
          rounded-[12px]
          w-[40px]
          h-[24px]
          p-[2px]
          relative
        "
        onClick={toggleTheme}
      >
        <div className="
          absolute
          top-[2px]
          left-[2px]
          dark:left-[16px]
          transition-all
        ">
        {theme == 'dark' ? <MdLightMode /> : <MdDarkMode />}
        </div>
      </button>
    </div>
  )
}

export default Darkmode
