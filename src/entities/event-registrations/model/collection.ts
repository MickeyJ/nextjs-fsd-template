import type { CollectionConfig } from 'payload';

const EventRegistration: CollectionConfig = {
  slug: 'event-registrations',
  admin: {
    useAsTitle: 'registrationNumber',
    group: 'Events',
    defaultColumns: ['registrationNumber', 'event', 'user', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'staff') return true;
      // Members can only see their own registrations
      if (user) {
        return {
          user: {
            equals: user.id,
          },
        };
      }
      return false;
    },
    create: ({ req: { user } }) => !!user, // Any logged-in user can register
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'staff',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'registrationNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated registration number',
      },
      hooks: {
        beforeValidate: [
          ({ value, operation }) => {
            if (!value && operation === 'create') {
              // Generate registration number: REG-YYYYMMDD-XXXX
              const date = new Date();
              const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
              const random = Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, '0');
              return `REG-${dateStr}-${random}`;
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      admin: {
        description: 'Event being registered for',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Person registering for the event',
      },
      hooks: {
        beforeValidate: [
          ({ value, req, operation }) => {
            // Auto-set to current user if creating and no value provided
            if (!value && operation === 'create' && req.user) {
              return req.user.id;
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending Payment', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Waitlisted', value: 'waitlisted' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Attended', value: 'attended' },
        { label: 'No Show', value: 'no-show' },
      ],
      admin: {
        description: 'Registration status',
      },
    },
    {
      name: 'registrationType',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Member', value: 'member' },
        { label: 'Non-Member', value: 'non-member' },
        { label: 'Student', value: 'student' },
        { label: 'VIP', value: 'vip' },
        { label: 'Sponsor', value: 'sponsor' },
        { label: 'Speaker', value: 'speaker' },
      ],
    },
    {
      name: 'numberOfGuests',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 10,
      admin: {
        description: 'Number of additional guests',
      },
    },
    {
      name: 'guestNames',
      type: 'array',
      admin: {
        description: 'Names of guests (if applicable)',
        condition: (data) => data?.numberOfGuests > 0,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'payment',
      type: 'group',
      fields: [
        {
          name: 'amount',
          type: 'number',
          min: 0,
          required: true,
          defaultValue: 0,
          admin: {
            description: 'Total amount in dollars',
          },
        },
        {
          name: 'method',
          type: 'select',
          options: [
            { label: 'Not Required', value: 'free' },
            { label: 'Credit Card', value: 'credit-card' },
            { label: 'Cash', value: 'cash' },
            { label: 'Check', value: 'check' },
            { label: 'Comp', value: 'comp' },
          ],
          defaultValue: 'free',
        },
        {
          name: 'stripePaymentId',
          type: 'text',
          admin: {
            description: 'Stripe payment ID if paid online',
            condition: (data) => data?.payment?.method === 'credit-card',
          },
        },
        {
          name: 'paidAt',
          type: 'date',
          admin: {
            description: 'When payment was received',
          },
        },
      ],
    },
    {
      name: 'dietaryRestrictions',
      type: 'textarea',
      admin: {
        description: 'Any dietary restrictions or allergies',
      },
    },
    {
      name: 'specialRequests',
      type: 'textarea',
      admin: {
        description: 'Any special requests or accommodations needed',
      },
    },
    {
      name: 'checkIn',
      type: 'group',
      fields: [
        {
          name: 'checkedIn',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Has attendee checked in at event?',
          },
        },
        {
          name: 'checkedInAt',
          type: 'date',
          admin: {
            description: 'Check-in timestamp',
            condition: (data) => data?.checkIn?.checkedIn === true,
          },
        },
        {
          name: 'checkedInBy',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            description: 'Staff member who checked them in',
            condition: (data) => data?.checkIn?.checkedIn === true,
          },
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes (not visible to attendee)',
        condition: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'staff',
      },
    },
    {
      name: 'emailConfirmationSent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Confirmation email sent to attendee',
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Send confirmation email for new confirmed registrations
        if (operation === 'create' && doc.status === 'confirmed' && !doc.emailConfirmationSent) {
          // TODO: Add email sending logic here
          // await sendRegistrationConfirmation(doc);
        }
      },
    ],
  },
  timestamps: true,
};

export default EventRegistration;
