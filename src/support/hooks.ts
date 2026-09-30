import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, BrowserType, chromium, firefox, webkit } from '@playwright/test';
import { config, BrowserName } from './config';
import { CustomWorld } from './world';

setDefaultTimeout(config.stepTimeout);

const launchers: Record<BrowserName, BrowserType> = { chromium, firefox, webkit };
let browser: Browser;

// Un navegador por worker: se abre una sola vez (rápido).
BeforeAll(async function () {
  const launcher = launchers[config.browser];
  if (!launcher) throw new Error(`Navegador no soportado: ${config.browser}`);
  browser = await launcher.launch({ headless: config.headless, slowMo: config.slowMo });
});

// Un contexto nuevo por escenario: sin cookies ni sesión compartida (aislamiento).
Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({
    baseURL: config.baseUrl,
    viewport: { width: 1280, height: 720 },
  });
  this.page = await this.context.newPage();
  this.initPages();
});

// Evidencia: screenshot adjunto al reporte cuando un escenario falla.
After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
    this.attach(`URL al fallar: ${this.page.url()}`, 'text/plain');
  }
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
