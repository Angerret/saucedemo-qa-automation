import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { getUser } from '../data/users';

async function expectInventoryPage(world: CustomWorld): Promise<void> {
  await expect(world.page).toHaveURL(/\/inventory\.html/);
  await expect(world.inventoryPage.pageTitle).toHaveText('Products');
}

Given('que el usuario está en la página de login', async function (this: CustomWorld) {
  await this.loginPage.open();
  await expect(this.loginPage.loginButton).toBeVisible();
});

Given('que el usuario ha iniciado sesión como {string}', async function (this: CustomWorld, username: string) {
  const user = getUser(username);
  await this.loginPage.open();
  await this.loginPage.login(user.username, user.password);
  await expectInventoryPage(this);
});

When(
  'inicia sesión con usuario {string} y contraseña {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

Then('debería ver la página de productos', async function (this: CustomWorld) {
  await expectInventoryPage(this);
  await expect(this.inventoryPage.items.first()).toBeVisible();
});

Then('debería ver el mensaje de error {string}', async function (this: CustomWorld, message: string) {
  await expect(this.loginPage.errorMessage).toBeVisible();
  await expect(this.loginPage.errorMessage).toHaveText(message);
});

Then('debería permanecer en la página de login', async function (this: CustomWorld) {
  await expect(this.page).not.toHaveURL(/inventory\.html/);
  await expect(this.loginPage.loginButton).toBeVisible();
});
