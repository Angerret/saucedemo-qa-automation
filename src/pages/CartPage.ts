import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { exactText } from '../utils/helpers';

export interface CartItem {
  name: string;
  price: string;
}

export class CartPage extends BasePage {
  readonly items: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  itemByName(name: string): Locator {
    return this.items.filter({
      has: this.page.locator('.inventory_item_name', { hasText: exactText(name) }),
    });
  }

  async getItems(): Promise<CartItem[]> {
    const result: CartItem[] = [];
    const count = await this.items.count();
    for (let i = 0; i < count; i++) {
      const item = this.items.nth(i);
      result.push({
        name: (await item.locator('.inventory_item_name').innerText()).trim(),
        price: (await item.locator('.inventory_item_price').innerText()).trim(),
      });
    }
    return result;
  }

  async removeItem(name: string): Promise<void> {
    await this.itemByName(name).getByRole('button', { name: 'Remove' }).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
