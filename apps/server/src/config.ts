export const dbHost = process.env.MONGO_HOST || 'localhost';
export const dbPort = process.env.MONGO_PORT || 27017;
export const dbUsername = process.env.APP_MONGO_USER || '';
export const dbPassword = process.env.APP_MONGO_PASS || '';
export const dbName = process.env.APP_MONGO_DB || 'solar';
export const mongoUri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
export const port = Number(process.env.SERVER_PORT) || 5000;
export const jwtSecret = process.env.JWT_SECRET || 'secret';
