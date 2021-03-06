import 'dotenv/config';
import { config } from '@keystone-next/keystone/schema';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';

import { lists /*, extendGraphqlSchema */ } from './schema';

let sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

/*
  TODO
    - [ ] configure send password
    - [ ] Demo seeding data
*/
const auth = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: {
      permissions: 'ADMIN',
    },
  },
});

export default auth.withAuth(
  config({
    name: 'Sick Fits',
    db: {
      adapter: 'mongoose',
      url: 'mongodb://localhost/sick-fits',
    },
    graphql: {
      /* TODO: Path */
    },
    ui: {
      /* TODO: Path */
      // isAccessAllowed,
    },
    lists,
    // extendGraphqlSchema,
    session: withItemData(
      statelessSessions({
        maxAge: sessionMaxAge,
        secret: sessionSecret,
      }),
      { User: 'name permissions' }
    ),
  })
);
