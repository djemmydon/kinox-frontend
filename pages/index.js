import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { urlFor, client } from '../lib/client'
import Product from '../component/Product';


export default function Home({products}) {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Kinox</title>
        <meta name="description" content="This is a website created for kinox apparel" />
        
      </Head>

     <main>
       {products.map(product =><Product key={product._id} product={product}/>)}
     </main>
     </div>
  )
}


export const  getServerSideProps = async () => {
const query = "*[_type == 'product']"

const products = await client.fetch(query)

return {
  props: {
    products
  }
}
}