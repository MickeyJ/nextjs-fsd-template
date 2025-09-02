import type { CollectionConfig } from 'payload';

const Event: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'event_date', 'start_time', 'status'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public can view events
    create: ({ req: { user } }) => !!user, // Only logged in users can create
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user?.roles?.includes('admin'),
  },
  fields: [
    // Basic Information
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Event Details',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              maxLength: 100,
              admin: {
                placeholder: 'Enter event title',
              },
              validate: (value) => {
                if (!value || value.length < 1) return 'Event title is required';
                if (value.length > 100) return 'Title must be less than 100 characters';
                return true;
              },
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              index: true,
              admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Auto-generated from title',
              },
              hooks: {
                beforeValidate: [
                  ({ data, value, operation }) => {
                    if (operation === 'create' && !value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/\s+/g, '-');
                    }
                    return value;
                  },
                ],
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 200,
              admin: {
                placeholder: 'Brief summary of the event (max 200 characters)',
                description: 'This will appear in event listings and previews',
              },
              validate: (value) => {
                if (!value || value.length < 1) return 'Event summary is required';
                if (value.length > 200) return 'Summary must be less than 200 characters';
                return true;
              },
            },
            {
              name: 'description',
              type: 'richText', // Using rich text for better formatting
              required: true,
              admin: {
                placeholder: 'Full event description',
                elements: ['h2', 'h3', 'h4', 'bold', 'italic', 'underline', 'ul', 'ol', 'link', 'blockquote'],
              },
              validate: (value) => {
                if (!value || value.length === 0) return 'Event description is required';
                return true;
              },
            },
          ],
        },
        {
          label: 'Location & Time',
          fields: [
            {
              type: 'group',
              name: 'location',
              label: 'Event Location',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g., Community Center, Online, TBD',
                  },
                  validate: (value) => {
                    if (!value) return 'Location name is required';
                    return true;
                  },
                },
                {
                  name: 'address',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'Full address or "Online" for virtual events',
                  },
                  validate: (value) => {
                    if (!value) return 'Location address is required';
                    return true;
                  },
                },
                {
                  name: 'coordinates',
                  type: 'point',
                  label: 'Map Coordinates',
                  admin: {
                    description: 'Optional: For map display',
                  },
                },
              ],
            },
            {
              name: 'event_date',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                  displayFormat: 'MMM dd, yyyy',
                },
                description: 'Date of the event',
              },
              validate: (value) => {
                if (!value) return 'Event date is required';
                // Optionally validate that date is in the future
                const eventDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (eventDate < today) {
                  return 'Event date must be in the future';
                }
                return true;
              },
            },
            {
              name: 'start_time',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'e.g., 14:00 or 2:00 PM',
                description: 'Event start time',
                width: '50%',
              },
              validate: (value) => {
                if (!value) return 'Start time is required';
                // Basic time format validation
                const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s?[AP]M)?$/i;
                if (!timeRegex.test(value)) {
                  return 'Please enter a valid time format (e.g., 14:00 or 2:00 PM)';
                }
                return true;
              },
            },
            {
              name: 'end_time',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'e.g., 16:00 or 4:00 PM',
                description: 'Event end time',
                width: '50%',
              },
              validate: (value, { data }) => {
                if (!value) return 'End time is required';
                const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s?[AP]M)?$/i;
                if (!timeRegex.test(value)) {
                  return 'Please enter a valid time format (e.g., 16:00 or 4:00 PM)';
                }
                // Could add validation to ensure end_time is after start_time
                return true;
              },
            },
            {
              name: 'timezone',
              type: 'select',
              defaultValue: 'America/Los_Angeles',
              options: [
                { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
                { label: 'Mountain Time (MT)', value: 'America/Denver' },
                { label: 'Central Time (CT)', value: 'America/Chicago' },
                { label: 'Eastern Time (ET)', value: 'America/New_York' },
                { label: 'UTC', value: 'UTC' },
              ],
              admin: {
                description: 'Timezone for the event',
              },
            },
          ],
        },
        {
          label: 'Media & Platforms',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media', // Assumes you have a media collection
              admin: {
                description: 'Event featured image',
              },
            },
            {
              name: 'image_url',
              type: 'text',
              admin: {
                description: 'Alternative: External image URL if not uploading',
                condition: (data) => !data.image,
              },
            },
            {
              name: 'platforms',
              type: 'group',
              label: 'Publishing Platforms',
              admin: {
                description: 'Select where this event should be published',
              },
              fields: [
                {
                  name: 'wild_apricot',
                  type: 'checkbox',
                  label: 'Wild Apricot',
                  defaultValue: false,
                },
                {
                  name: 'meetup',
                  type: 'checkbox',
                  label: 'Meetup',
                  defaultValue: false,
                },
                {
                  name: 'eventbrite',
                  type: 'checkbox',
                  label: 'Eventbrite',
                  defaultValue: false,
                },
                // Could add platform-specific IDs
                {
                  name: 'wild_apricot_id',
                  type: 'text',
                  admin: {
                    condition: (data) => data?.platforms?.wild_apricot,
                    description: 'Wild Apricot event ID (auto-populated after sync)',
                    readOnly: true,
                  },
                },
                {
                  name: 'meetup_id',
                  type: 'text',
                  admin: {
                    condition: (data) => data?.platforms?.meetup,
                    description: 'Meetup event ID (auto-populated after sync)',
                    readOnly: true,
                  },
                },
                {
                  name: 'eventbrite_id',
                  type: 'text',
                  admin: {
                    condition: (data) => data?.platforms?.eventbrite,
                    description: 'Eventbrite event ID (auto-populated after sync)',
                    readOnly: true,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Registration',
          fields: [
            {
              name: 'registration',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable Registration',
                  defaultValue: true,
                },
                {
                  name: 'capacity',
                  type: 'number',
                  min: 0,
                  admin: {
                    description: 'Maximum number of attendees (0 for unlimited)',
                    condition: (data) => data?.registration?.enabled,
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  min: 0,
                  defaultValue: 0,
                  admin: {
                    description: 'Event price in dollars (0 for free)',
                    condition: (data) => data?.registration?.enabled,
                  },
                },
                {
                  name: 'registration_deadline',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                    description: 'Last date/time to register',
                    condition: (data) => data?.registration?.enabled,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    // Additional fields
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'registrations',
      type: 'relationship',
      relationTo: 'event-registrations', // Separate collection for registrations
      hasMany: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Event registrations',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Sync to external platforms when published
        if (operation === 'update' && doc.status === 'published') {
          if (doc.platforms?.wild_apricot && !doc.platforms?.wild_apricot_id) {
            // Trigger Wild Apricot sync
            console.log('TODO: Sync to Wild Apricot');
          }
          if (doc.platforms?.meetup && !doc.platforms?.meetup_id) {
            // Trigger Meetup sync
            console.log('TODO: Sync to Meetup');
          }
          if (doc.platforms?.eventbrite && !doc.platforms?.eventbrite_id) {
            // Trigger Eventbrite sync
            console.log('TODO: Sync to Eventbrite');
          }
        }
      },
    ],
  },
  timestamps: true, // Adds createdAt and updatedAt
};

export default Event;
