import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('agrega el producto {string} al carrito', async function (this: CustomWorld, product: string) {
  await this.inventoryPage.addToCart(product);
});

When('agrega los siguientes productos al carrito:', async function (this: CustomWorld, table: DataTable) {
  for (const row of table.hashes()) {
    await this.inventoryPage.addToCart(row.producto);
  }
});

When('abre el carrito', async function (this: CustomWorld) {
  await this.header.openCart();
  await expect(this.page).toHaveURL(/\/cart\.html/);
  await expect(this.cartPage.pageTitle).toHaveText('Your Cart');
});

When('elimina el producto {string} del carrito', async function (this: CustomWorld, product: string) {
  await this.cartPage.removeItem(product);
});

Then('el contador del carrito debería mostrar {int}', async function (this: CustomWorld, count: number) {
  await expect(this.header.cartBadge).toHaveText(String(count));
});

Then(
  'el botón del producto {string} debería mostrar {string}',
  async function (this: CustomWorld, product: string, label: string) {
    await expect(this.inventoryPage.productButton(product)).toHaveText(label);
  },
);

Then('el carrito debería contener los siguientes productos:', async function (this: CustomWorld, table: DataTable) {
  const expected = table
    .hashes()
    .map((row) => ({ name: row.producto, price: row.precio }))
    .sort((a, b) => a.name.localeCompare(b.name));

  await expect(this.cartPage.items).toHaveCount(expected.length);
  const actual = (await this.cartPage.getItems()).sort((a, b) => a.name.localeCompare(b.name));
  expect(actual).toEqual(expected);
});

Then('el carrito debería estar vacío', async function (this: CustomWorld) {
  await expect(this.header.cartBadge).toHaveCount(0);
  if (this.page.url().includes('cart.html')) {
    await expect(this.cartPage.items).toHaveCount(0);
  }
});
