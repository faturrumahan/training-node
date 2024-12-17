import "dotenv/config"
import { IEnv } from "@/interfaces"

const env: IENV = {
  APP: {
    PORT: process.env.APP_PORT || 3000,
    HOSTNAME: process.env.APP_HOST || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "",
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || "",
    PORT: process.env.REDIS_PORT || 6379,
    USERNAME: process.env.REDIS_USERNAME || "",
    PASSWORD: process.env.REDIS_PASSWORD || "",
  },
}

export default env
