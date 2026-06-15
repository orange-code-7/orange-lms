require("dotenv").config(); // optional, kalau mau pake .env

const isSslEnabled = process.env.DB_SSL === "true";

const sslOptions = isSslEnabled
  ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  : {};

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "admin", // ganti sesuai password
    database: process.env.DB_NAME || "orange-lms-server",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    ...sslOptions,
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME_TEST || "orange-lms-server-test",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    ...sslOptions,
  },
  production: {
    use_env_variable: process.env.DATABASE_URL ? "DATABASE_URL" : undefined,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME_PROD || "orange-lms-server-prod",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    ...sslOptions,
  },
};
