import sanityClient from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url";



export const client = sanityClient({
    projectId:"jbcyg7kh",
    dataset:"production",
    useCdn: true,
    apiVersion:"2022-05-13"
});


const builder = ImageUrlBuilder(client)

export const urlFor= (source) =>builder.image(source)

export function urlForThumbnail(source) {
    return ImageUrlBuilder(client).image(source).width(300).url();
  }