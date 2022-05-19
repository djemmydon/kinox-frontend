import Head from "next/head";
import Image from "next/image";
import { urlFor, client } from "../lib/client";
import Product from "../component/Product";
import HomeSlide from "../component/HomeSlide";

export default function Home({ products, count }) {
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



      <div className='headings'>
        <h1>Featured Products</h1>
        <p>Kinox Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum</p>
      </div>
        <div className="product">
          {products?.map((product) => (
            <Product simplified key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'product' && trending ==true]`;

  const products = await client.fetch(query);
  return {
    props: {
      products,
    },
  };
};
