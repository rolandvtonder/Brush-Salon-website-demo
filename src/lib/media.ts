/** Every photo ships at two widths; let the browser pick. */
export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

export const photo = (name: string) => ({
  src: media(`${name}-1600.webp`),
  srcSet: `${media(`${name}-800.webp`)} 800w, ${media(`${name}-1600.webp`)} 1600w`,
});
