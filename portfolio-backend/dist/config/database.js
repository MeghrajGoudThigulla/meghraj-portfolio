"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.pool = void 0;
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const prisma_1 = require("../../generated/prisma");
const env_1 = require("./env");
let sslMode;
let sslQuery;
try {
    const url = new URL(env_1.databaseUrl);
    sslMode = url.searchParams.get("sslmode")?.toLowerCase() ?? undefined;
    sslQuery = url.searchParams.get("ssl")?.toLowerCase() ?? undefined;
}
catch (error) {
    console.warn("DATABASE_URL could not be parsed for SSL options.", error);
}
const sslModeDisablesSsl = sslMode === "disable";
const sslModeRequiresSsl = sslMode === "require" || sslMode === "verify-ca" || sslMode === "verify-full";
const sslModeVerifiesCert = sslMode === "verify-ca" || sslMode === "verify-full";
const sslQueryEnablesSsl = sslQuery === "true" || sslQuery === "1";
const allowInsecure = process.env.PG_SSL_ALLOW_SELF_SIGNED === "true" ||
    process.env.PG_SSL_INSECURE === "true";
const forceVerify = process.env.PG_SSL_VERIFY === "true";
const shouldUseSsl = !sslModeDisablesSsl &&
    (sslModeRequiresSsl || sslQueryEnablesSsl || Boolean(env_1.caCert) || process.env.PG_SSL === "true");
const shouldVerify = Boolean(env_1.caCert) || sslModeVerifiesCert || forceVerify;
const sslConfig = shouldUseSsl
    ? {
        ...(env_1.caCert ? { ca: env_1.caCert } : {}),
        rejectUnauthorized: shouldVerify,
    }
    : undefined;
if (shouldUseSsl && !env_1.caCert && !shouldVerify && allowInsecure) {
    console.warn("PG_SSL_ALLOW_SELF_SIGNED is enabled; TLS verification is disabled for this connection.");
}
const poolConfig = {
    connectionString: env_1.databaseUrl,
    ssl: sslConfig,
    family: 4,
};
exports.pool = new pg_1.Pool(poolConfig);
const adapter = new adapter_pg_1.PrismaPg(exports.pool);
exports.prisma = new prisma_1.PrismaClient({ adapter });
