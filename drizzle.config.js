import 'dotenv/config';

export default {
  schema: './src/models/schema.*',
  out: '.drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  
};