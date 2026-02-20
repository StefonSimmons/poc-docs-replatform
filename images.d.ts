// Declares image files as modules with image metadata. Astro handles image imports but TypeScript needs type declarations.

declare module '*.png' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.jpg' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.jpeg' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.svg' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.gif' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.webp' {
  const value: ImageMetadata;
  export default value;
}

interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

