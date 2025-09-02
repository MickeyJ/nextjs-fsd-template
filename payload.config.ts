import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import Media from './src/entities/media/model/collection';
import Event from './src/entities/event/model/collection';
import EventRegistration from './src/entities/event-registrations/model/collection';
import Member from './src/entities/member/model/collection';
import MembershipType from './src/entities/membership-type/model/collection';
import User from './src/entities/user/model/collection';

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [User, Event, EventRegistration, Media, Member, MembershipType],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    // generate types into shared/api/payload
    outputFile: path.resolve('src', 'shared', 'types', 'payload', 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
});
