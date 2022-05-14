import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

function Product({ product: { name, image, price, description, slug } }) {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div>
          <img src={urlFor(image[0])} alt="" />
          <h4>{name}</h4>
          <p>₦{price}</p>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
