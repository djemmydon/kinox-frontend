import { Html, Head, Main, NextScript } from "next/document";
import { FB_PIXEL_ID } from "../lib/jspixel";

export default function Document() {
  return (
    <Html>
      <Head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

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
