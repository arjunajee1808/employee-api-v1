import dotenv from "dotenv";

dotenv.config();

function getEnvValue(name: string, defaultValue: string = ""): string {
  return process.env[name] || defaultValue;
}

export const config = {
  database: {
    uri: getEnvValue("MONGODB_URI", ""),
    dbName: getEnvValue("DB_NAME", "employee_db"),
  },
  jwt: {
    secret: getEnvValue("JWT_SECRET", ""),
    refreshSecret: getEnvValue("JWT_REFRESH_SECRET", ""),
    expiresIn: getEnvValue("JWT_EXPIRES_IN_SECONDS", "300"), // Default to 5 minutes
  },
  client: {
    id: getEnvValue("CLIENT_ID", ""),
    secret: getEnvValue("CLIENT_SECRET", ""),
  },
};
