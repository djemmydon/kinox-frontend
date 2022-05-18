import Head from "next/head";
import Image from "next/image";
import { urlFor, client } from "../lib/client";
import Product from "../component/Product";
import HomeSlide from "../component/HomeSlide";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Kinox</title>
        <meta
          name="description"
          content="This is a website created for kinox apparel"
        />
      </Head>

      <main>
        <HomeSlide />

        <div className="product">
        {products.map((product) => (
          
          <Product key={product._id} product={product} />
       
        ))}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'product']`;

  const products = await client.fetch(query);

  return {
    props: {
      products,
    },
  };
};
