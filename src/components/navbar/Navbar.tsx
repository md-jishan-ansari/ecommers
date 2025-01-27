import Container from '@/src/components/Container';
import {Redressed} from 'next/font/google';
import Darkmode from './Darkmode'
import UserMenus from './UserMenus';
import Link from 'next/link';
import CartCount from './CartCount';
import getCurrentUser from '@/src/actions/getCurrentUser';
import SearchBar from './SearchBar';
import Categories from './Categories';

const redressed = Redressed({
  weight: ['400'],
  subsets: ['latin'],
})

const Navbar = async () => {
  const currentUser = await getCurrentUser();



  // useEffect(() => {
  //   axios({
  //     method: 'post',
  //     url: '/api/user',
  //     data: {
  //       name: 'Fred',
  //       email: 'fred@gmail.com'
  //     }
  //   }).then(res => {
  //     console.log(res);
  //   });
  // }, []);


  return (
      <div className="position: sticky
          top-0
          left-0
          w-100 z-50 shadow-sm"
      >
        <div className=" py-4 bg-backgroundSecondary">
            <Container>
                <div className="flex justify-between items-center">
                    <Link href="/" className={`${redressed.className} text-2xl text-textPrimary`}>
                      E-Shop
                    </Link>
                    <div className="md:hidden"><SearchBar /></div>
                    <div className="flex gap-6 items-center">
                        <Darkmode />
                        <CartCount />
                        <UserMenus currentUser={currentUser} />
                    </div>
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar
