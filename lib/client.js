import sanityClient from "@sanity/client";
import  imageUrlBuilder  from "@sanity/image-url";



export const client = sanityClient({
    projectId:"jbcyg7kh",
    dataset:"production",
    useCdn: true,
    apiVersion:"2022-05-13"
});


const builder = imageUrlBuilder(client)

export const urlFor= (source) =>builder.image(source)