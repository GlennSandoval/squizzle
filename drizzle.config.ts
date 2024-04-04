import { type Config } from 'drizzle-kit';

// For configuring a local database
export default {
  schema: './src/schema.ts',
  driver: 'better-sqlite',
  out: './drizzle',
  dbCredentials: {
    url: './database.db',
  },
  verbose: true

} satisfies Config;
