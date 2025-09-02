// collections/Users.ts
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: false,
    // verify: {
    //   generateEmailHTML: (args) => {
    //     if (!args) return '';
    //     const { token, user } = args;
    //     // Custom verification email
    //     const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}`;
    //     return `
    //       <div>
    //         <p>Hi ${user.firstName || 'there'},</p>
    //         <p>Please verify your email by clicking the link below:</p>
    //         <a href="${url}">Verify Email</a>
    //       </div>
    //     `;
    //   },
    // },
    forgotPassword: {
      generateEmailHTML: (args) => {
        // Guard against undefined args
        if (!args) {
          return '';
        }

        const { req, token, user } = args;
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`;
        return `
          <div>
            <p>Hi ${user.firstName || 'there'},</p>
            <p>Click the link below to reset your password:</p>
            <a href="${url}">Reset Password</a>
          </div>
        `;
      },
    },
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role', 'membershipStatus'],
    group: 'Users & Members',
  },
  access: {
    // Anyone can read their own user data
    read: ({ req: { user } }) => {
      if (user) {
        // Admins can read all users
        if (user.role === 'admin') return true;
        // Users can only read their own data
        return {
          id: {
            equals: user.id,
          },
        };
      }
      return false;
    },
    // Anyone can create a user (for registration)
    create: () => true,
    // Users can update their own data, admins can update anyone
    update: ({ req: { user } }) => {
      if (user) {
        if (user.role === 'admin') return true;
        // Users can only update their own data
        return {
          id: {
            equals: user.id,
          },
        };
      }
      return false;
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
    // Custom access control for admin panel
    admin: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'staff';
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'firstName',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'lastName',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'displayName',
              type: 'text',
              admin: {
                description: 'How the name appears publicly',
                readOnly: true,
              },
              hooks: {
                beforeChange: [
                  ({ data }) => {
                    if (data?.firstName && data?.lastName) {
                      return `${data.firstName} ${data.lastName}`;
                    }
                  },
                ],
              },
            },
            {
              name: 'bio',
              type: 'textarea',
              maxLength: 500,
              admin: {
                description: 'Member bio for directory (max 500 characters)',
              },
            },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Profile picture',
              },
            },
            {
              name: 'phone',
              type: 'text',
              admin: {
                placeholder: '+1 (555) 123-4567',
              },
            },
            {
              name: 'dateOfBirth',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
          ],
        },
        {
          label: 'Access & Roles',
          fields: [
            {
              name: 'role',
              type: 'select',
              required: true,
              defaultValue: 'member',
              options: [
                { label: 'Super Admin', value: 'admin' },
                { label: 'Staff', value: 'staff' },
                { label: 'Board Member', value: 'board' },
                { label: 'Member', value: 'member' },
                { label: 'Guest', value: 'guest' },
              ],
              access: {
                update: ({ req: { user } }) => user?.role === 'admin',
              },
              admin: {
                description: 'User role determines access levels',
              },
            },
            {
              name: 'permissions',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Manage Events', value: 'manage_events' },
                { label: 'Manage Members', value: 'manage_members' },
                { label: 'View Reports', value: 'view_reports' },
                { label: 'Send Emails', value: 'send_emails' },
                { label: 'Manage Payments', value: 'manage_payments' },
                { label: 'Edit Website', value: 'edit_website' },
              ],
              admin: {
                condition: (data) => data?.role === 'staff' || data?.role === 'board',
                description: 'Additional permissions for staff/board members',
              },
            },
            {
              name: 'emailVerified',
              type: 'date',
              admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Email verification timestamp',
              },
            },
            {
              name: 'loginAttempts',
              type: 'number',
              admin: {
                position: 'sidebar',
                readOnly: true,
              },
            },
            {
              name: 'lockUntil',
              type: 'date',
              admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Account locked until this date',
              },
            },
          ],
        },
        {
          label: 'Membership',
          fields: [
            {
              name: 'membership',
              type: 'group',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  defaultValue: 'none',
                  options: [
                    { label: 'Active', value: 'active' },
                    { label: 'Expired', value: 'expired' },
                    { label: 'Pending', value: 'pending' },
                    { label: 'Cancelled', value: 'cancelled' },
                    { label: 'None', value: 'none' },
                  ],
                  admin: {
                    description: 'Current membership status',
                  },
                },
                {
                  name: 'type',
                  type: 'relationship',
                  relationTo: 'membership-types',
                  admin: {
                    condition: (data) => data?.membership?.status !== 'none',
                  },
                },
                {
                  name: 'memberNumber',
                  type: 'text',
                  unique: true,
                  admin: {
                    readOnly: true,
                    description: 'Auto-generated member number',
                  },
                  hooks: {
                    beforeValidate: [
                      async ({ data, value, operation }) => {
                        if (operation === 'create' && !value && data?.membership?.status === 'active') {
                          // Generate member number: YEAR-XXXXX
                          const year = new Date().getFullYear();
                          const random = Math.floor(10000 + Math.random() * 90000);
                          return `${year}-${random}`;
                        }
                        return value;
                      },
                    ],
                  },
                },
                {
                  name: 'joinDate',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    condition: (data) => data?.membership?.status !== 'none',
                  },
                },
                {
                  name: 'renewalDate',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    condition: (data) => data?.membership?.status === 'active',
                    description: 'Next renewal date',
                  },
                },
                {
                  name: 'expirationDate',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                    condition: (data) => data?.membership?.status !== 'none',
                  },
                },
                {
                  name: 'autoRenew',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    condition: (data) => data?.membership?.status === 'active',
                    description: 'Automatically renew membership',
                  },
                },
                {
                  name: 'lifetime',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Lifetime member',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Payment & Billing',
          fields: [
            {
              name: 'billing',
              type: 'group',
              fields: [
                {
                  name: 'stripeCustomerId',
                  type: 'text',
                  admin: {
                    readOnly: true,
                    description: 'Stripe customer ID',
                  },
                },
                {
                  name: 'paymentMethods',
                  type: 'array',
                  admin: {
                    readOnly: true,
                    description: 'Saved payment methods',
                  },
                  fields: [
                    {
                      name: 'id',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'type',
                      type: 'select',
                      options: [
                        { label: 'Card', value: 'card' },
                        { label: 'Bank Account', value: 'bank' },
                      ],
                    },
                    {
                      name: 'last4',
                      type: 'text',
                    },
                    {
                      name: 'isDefault',
                      type: 'checkbox',
                    },
                  ],
                },
                {
                  name: 'totalDonated',
                  type: 'number',
                  defaultValue: 0,
                  admin: {
                    readOnly: true,
                    description: 'Total amount donated',
                  },
                },
                {
                  name: 'totalPaid',
                  type: 'number',
                  defaultValue: 0,
                  admin: {
                    readOnly: true,
                    description: 'Total amount paid (dues + events + donations)',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Preferences',
          fields: [
            {
              name: 'preferences',
              type: 'group',
              fields: [
                {
                  name: 'newsletter',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Receive newsletters',
                },
                {
                  name: 'eventNotifications',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Receive event notifications',
                },
                {
                  name: 'renewalReminders',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Receive renewal reminders',
                },
                {
                  name: 'showInDirectory',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Show in member directory',
                },
                {
                  name: 'shareContactInfo',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Share contact info with other members',
                },
              ],
            },
            {
              name: 'interests',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Networking', value: 'networking' },
                { label: 'Education', value: 'education' },
                { label: 'Volunteering', value: 'volunteering' },
                { label: 'Social Events', value: 'social' },
                { label: 'Professional Development', value: 'professional' },
                { label: 'Mentorship', value: 'mentorship' },
              ],
            },
          ],
        },
        {
          label: 'Activity',
          fields: [
            {
              name: 'lastLogin',
              type: 'date',
              admin: {
                readOnly: true,
                position: 'sidebar',
              },
            },
            {
              name: 'loginCount',
              type: 'number',
              defaultValue: 0,
              admin: {
                readOnly: true,
                position: 'sidebar',
              },
            },
            {
              name: 'notes',
              type: 'textarea',
              admin: {
                description: 'Internal notes (not visible to member)',
                condition: ({ user }) => user?.role === 'admin' || user?.role === 'staff',
              },
            },
            {
              name: 'tags',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'VIP', value: 'vip' },
                { label: 'Volunteer', value: 'volunteer' },
                { label: 'Donor', value: 'donor' },
                { label: 'Board Alumni', value: 'board_alumni' },
                { label: 'Founding Member', value: 'founding' },
              ],
              admin: {
                condition: ({ user }) => user?.role === 'admin' || user?.role === 'staff',
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Banned', value: 'banned' },
      ],
      admin: {
        position: 'sidebar',
      },
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // Update lastLogin on login
        if (operation === 'update' && req.user) {
          data.lastLogin = new Date();
          data.loginCount = (data.loginCount || 0) + 1;
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        // Create Stripe customer on user creation
        if (operation === 'create' && !doc.billing?.stripeCustomerId) {
          // TODO: Create Stripe customer
          console.log('TODO: Create Stripe customer for', doc.email);
        }

        // Send welcome email for new members
        if (operation === 'create' && doc.membership?.status === 'active') {
          // TODO: Send welcome email
          console.log('TODO: Send welcome email to', doc.email);
        }
      },
    ],
  },
  timestamps: true,
};

export default Users;
