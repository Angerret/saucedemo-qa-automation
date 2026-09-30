import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { exactText } from '../utils/helpers';

export class InventoryPage extends BasePage {
  readonly items: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.locator('.inventory_item');
  }

  /** Tarjeta del producto con nombre exacto. */
  productCard(name: string): Locator {
    return this.items.filter({
      has: this.page.locator('.inventory_item_name', { hasText: exactText(name) }),
    });
  }

  /** Botón de acción (Add to cart / Remove) de un producto. */
  productButton(name: string): Locator {
    return this.productCard(name).locator('button');
  }

  async addToCart(name: string): Promise<void> {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(name: string): Promise<void> {
    await this.productCard(name).getByRole('button', { name: 'Remove' }).click();
  }
}
