import path from 'path';
import dotenv from 'dotenv';

const dotenvPath = path.join(process.cwd(), '.env');

dotenv.config({ path: dotenvPath });

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
