
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://wizwo:BCBAdcd1@localhost:5432/blogdb',
    migrations: {
      directory: './migrations',
    },
  },
};
