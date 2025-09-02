// collections/Members.ts
import type { CollectionConfig } from 'payload';

export const Members: CollectionConfig = {
  slug: 'members',
  auth: true, // Enable authentication
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'membershipStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
    },
    {
      name: 'joinDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
    },
  ],
};
