import type { CollectionConfig } from 'payload';

const MembershipType: CollectionConfig = {
  slug: 'membership-types',
  admin: {
    useAsTitle: 'name',
    group: 'Organization',
    defaultColumns: ['name', 'price', 'duration', 'isActive'],
  },
  access: {
    read: () => true, // Public can view membership types
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., Student, Individual, Corporate, Lifetime',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the name',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
                .replace(/--+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of this membership type',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in dollars',
      },
    },
    {
      name: 'stripePriceId',
      type: 'text',
      admin: {
        description: 'Stripe Price ID for this membership type',
        condition: (data) => data?.price > 0,
      },
    },
    {
      name: 'duration',
      type: 'select',
      required: true,
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Annual', value: 'annual' },
        { label: 'Lifetime', value: 'lifetime' },
      ],
      defaultValue: 'annual',
    },
    {
      name: 'benefits',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
        {
          name: 'included',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Is this benefit included in this membership type?',
          },
        },
      ],
      admin: {
        description: 'List of benefits for this membership type',
      },
    },
    {
      name: 'features',
      type: 'group',
      fields: [
        {
          name: 'eventDiscountPercentage',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Discount percentage for events (0-100)',
          },
        },
        {
          name: 'maxGuests',
          type: 'number',
          min: 0,
          admin: {
            description: 'Maximum number of guests allowed at events',
          },
        },
        {
          name: 'canAccessMemberDirectory',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Can access the member directory',
          },
        },
        {
          name: 'canPostJobs',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Can post job opportunities',
          },
        },
        {
          name: 'canSponsorEvents',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Can sponsor events',
          },
        },
        {
          name: 'priorityRegistration',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Gets early access to event registration',
          },
        },
      ],
    },
    {
      name: 'eligibility',
      type: 'group',
      fields: [
        {
          name: 'minAge',
          type: 'number',
          min: 0,
          admin: {
            description: 'Minimum age requirement',
          },
        },
        {
          name: 'maxAge',
          type: 'number',
          min: 0,
          admin: {
            description: 'Maximum age limit (leave empty for no limit)',
          },
        },
        {
          name: 'requiresVerification',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Requires admin verification before activation',
          },
        },
        {
          name: 'requirements',
          type: 'textarea',
          admin: {
            description: 'Additional eligibility requirements or restrictions',
          },
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in which membership types appear (lower numbers first)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Is this membership type currently available for purchase?',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Highlight this membership type as recommended',
      },
    },
    {
      name: 'maxMembers',
      type: 'number',
      min: 0,
      admin: {
        description: 'Maximum number of members allowed (leave empty for unlimited)',
        condition: (data) => data?.slug === 'corporate' || data?.slug === 'group',
      },
    },
    {
      name: 'renewalReminder',
      type: 'number',
      defaultValue: 30,
      admin: {
        description: 'Days before expiration to send renewal reminder',
        condition: (data) => data?.duration !== 'lifetime',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Badge color for this membership type (hex code)',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value && !value.startsWith('#')) {
              return `#${value}`;
            }
            return value;
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Auto-generate slug if not provided
        if (operation === 'create' && !data.slug && data.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        }
        return data;
      },
    ],
  },
  timestamps: true,
};

export default MembershipType;
