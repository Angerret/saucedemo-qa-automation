import 'dotenv/config';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  browser: (process.env.BROWSER ?? 'chromium') as BrowserName,
  headless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO ?? 0),
  stepTimeout: Number(process.env.STEP_TIMEOUT ?? 30_000),
};
