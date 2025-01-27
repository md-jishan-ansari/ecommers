export const dynamic = 'force-dynamic'
import Banner from "@/src/components/Banner";
import Container from "@/src/components/Container";
import ProductLists from "@/src/components/products/ProductLists";
import { IProductParams } from "../actions/getProducts";

interface HomeProps {
  searchParams: IProductParams
}
export default function Home({searchParams}: HomeProps) {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="">
        <Container>
          <div className="p-10 py-14">
            <Banner />
            <ProductLists searchParams={searchParams} />
          </div>

        </Container>
    </main>
  );
}
