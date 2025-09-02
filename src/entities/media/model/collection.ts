import path from 'path';
import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Content',
  },
  access: {
    read: () => true, // Required for Next.js Image optimization
    create: () => true, // Allow uploads in CMS
    update: () => true, // Allow editing in CMS
    delete: () => true, // Allow deletion in CMS
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'square', width: 1200, height: 1200, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    mimeTypes: ['image/*', 'application/pdf'], // Images and PDFs
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'webp',
      options: { quality: 85 },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Description for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption to display with image',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Event', value: 'event' },
        { label: 'Member', value: 'member' },
        { label: 'Sponsor', value: 'sponsor' },
        { label: 'Document', value: 'document' },
      ],
      defaultValue: 'general',
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Photo credit or source',
      },
    },
  ],
  timestamps: true,
};

export default Media;
