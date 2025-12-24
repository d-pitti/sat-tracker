import { loadEnvConfig } from '@next/env';

const host = process.env.DB_HOST!;
const port = process.env.DB_PORT!;
const user = process.env.DB_USER!;
const pass = process.env.DB_PASS!;
const table = process.env.DB_NAME!;

loadEnvConfig(host);
loadEnvConfig(port);
loadEnvConfig(user);
loadEnvConfig(pass);
loadEnvConfig(table);



