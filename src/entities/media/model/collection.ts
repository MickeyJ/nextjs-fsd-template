import path from 'path';
import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // required for Next <Image> optimizer
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
};

export default Media;
