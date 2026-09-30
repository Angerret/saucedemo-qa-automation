import { Locator, Page } from '@playwright/test';

/** Comportamiento común a todas las páginas. */
export abstract class BasePage {
  readonly pageTitle: Locator;

  constructor(protected readonly page: Page) {
    this.pageTitle = page.locator('.title');
  }

  async navigate(path = '/'): Promise<void> {
    await this.page.goto(path);
  }
}
