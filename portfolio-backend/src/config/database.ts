import { Pool, type PoolConfig } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma";
import { databaseUrl, caCert } from "./env";

let sslMode: string | undefined;
let sslQuery: string | undefined;
try {
  const url = new URL(databaseUrl);
  sslMode = url.searchParams.get("sslmode")?.toLowerCase() ?? undefined;
  sslQuery = url.searchParams.get("ssl")?.toLowerCase() ?? undefined;
} catch (error) {
  console.warn("DATABASE_URL could not be parsed for SSL options.", error);
}

const sslModeDisablesSsl = sslMode === "disable";
const sslModeRequiresSsl =
  sslMode === "require" || sslMode === "verify-ca" || sslMode === "verify-full";
const sslModeVerifiesCert = sslMode === "verify-ca" || sslMode === "verify-full";
const sslQueryEnablesSsl = sslQuery === "true" || sslQuery === "1";
const allowInsecure =
  process.env.PG_SSL_ALLOW_SELF_SIGNED === "true" ||
  process.env.PG_SSL_INSECURE === "true";
const forceVerify = process.env.PG_SSL_VERIFY === "true";
const shouldUseSsl =
  !sslModeDisablesSsl &&
  (sslModeRequiresSsl || sslQueryEnablesSsl || Boolean(caCert) || process.env.PG_SSL === "true");
const shouldVerify = Boolean(caCert) || sslModeVerifiesCert || forceVerify;

const sslConfig = shouldUseSsl
  ? {
      ...(caCert ? { ca: caCert } : {}),
      rejectUnauthorized: shouldVerify,
    }
  : undefined;

if (shouldUseSsl && !caCert && !shouldVerify && allowInsecure) {
  console.warn(
    "PG_SSL_ALLOW_SELF_SIGNED is enabled; TLS verification is disabled for this connection.",
  );
}

const poolConfig: PoolConfig & { family?: number } = {
  connectionString: databaseUrl,
  ssl: sslConfig,
  family: 4,
};

export const pool = new Pool(poolConfig);
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
