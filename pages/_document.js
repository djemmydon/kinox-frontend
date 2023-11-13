import { Html, Head, Main, NextScript } from "next/document";
import { FB_PIXEL_ID } from "../lib/jspixel";

export default function Document() {
  return (
    <Html>
      <Head>


        <meta
          name="facebook-domain-verification"
          content="mgq7xhq6lvnr2a2yeuv9t3gc8i71q7"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
