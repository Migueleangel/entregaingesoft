// eslint-disable-next-line
import dotenv from 'dotenv';

dotenv.config();

export const {
  MONGO_URI, PORT, MINIO_HOST, MINIO_ACESS_KEY, MINIO_SECRET_KEY,
} = process.env;
