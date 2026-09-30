import { Locator, Page } from '@playwright/test';

/** Componente reutilizable: cabecera con el ícono del carrito. */
export class HeaderComponent {
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
