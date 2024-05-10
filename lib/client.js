import ImageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'jbcyg7kh',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-05-13',
  token:
    'sk5JHFPaa8OK0GVfzEMv8bJwnBj1Mw5cjipg4rHsdR0WxbLXyBae73FL89nuER7fsKaNilcQAFxlxT6lx2AX4FydDIIpStVjzP9XOO4Ib5FATFcMhkE7DiSGjatH7m7bQ8N5XC4gZjNqvjHKzb8fYY0TaW6VbcubQ9widDBbqIWRCVeZOH8h',
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export function urlForThumbnail(source) {
  return ImageUrlBuilder(client).image(source).width(300).url();
}
