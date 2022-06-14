import React from 'react'
import { client } from '../../lib/client'


function Categories({categories}) {
  return (
    <div>
        {categories?.product?.map((item, idx) => (
            <div key={idx}>
                <h1>{item.name}</h1>
            </div>
        ))}
    </div>
  )
}

export default Categories





export const getStaticPaths = async () => {
  const query = `*[_type == 'categories']{
         slug  {
              current
            }
     }`;

  const categories = await client.fetch(query);

  const paths = categories.map((category) => ({
    params: { slug: category?.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'categories' && slug.current == '${slug}'][0]`;
  const trendingQuery = `*[_type == 'product' &&  trending ==true]`;
  const categories = await client.fetch(query);
  const trending = await client.fetch(trendingQuery);
  return {
    props: { categories, trending },
  };
};
