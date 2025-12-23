import { loadEnvConfig } from '@next/env';

const user = process.env.URL_USER!;
const pass = process.env.URL_PASS!;

loadEnvConfig(user);
loadEnvConfig(pass);