import "dotenv/config";
import { defineConfig } from "prisma/config";

const defaultDatabaseUrl: string = "postgresql://galperin:galperin@localhost:5432/galperin?schema=public";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL ?? defaultDatabaseUrl
  },
  migrations: {
    path: "prisma/migrations"
  },
  schema: "prisma/schema.prisma"
});
