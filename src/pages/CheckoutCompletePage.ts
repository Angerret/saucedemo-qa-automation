import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Paso final: confirmación de la orden. */
export class CheckoutCompletePage extends BasePage {
  readonly confirmationHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }
}
