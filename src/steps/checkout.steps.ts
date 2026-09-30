import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('procede al checkout', async function (this: CustomWorld) {
  await this.cartPage.proceedToCheckout();
  await expect(this.page).toHaveURL(/checkout-step-one\.html/);
});

When(
  'completa la información de envío con nombre {string}, apellido {string} y código postal {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await this.checkoutInfoPage.fillCustomerInfo({ firstName, lastName, postalCode });
  },
);

Then(
  'debería ver el resumen de la orden con el producto {string}',
  async function (this: CustomWorld, product: string) {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.checkoutOverviewPage.pageTitle).toHaveText('Checkout: Overview');
    await expect(this.checkoutOverviewPage.itemNames).toContainText([product]);
  },
);

Then('el total de la orden debería calcularse correctamente', async function (this: CustomWorld) {
  const prices = await this.checkoutOverviewPage.getItemPrices();
  const summary = await this.checkoutOverviewPage.getSummary();
  const expectedItemTotal = prices.reduce((sum, price) => sum + price, 0);

  expect(summary.itemTotal).toBeCloseTo(expectedItemTotal, 2);
  expect(summary.tax).toBeGreaterThan(0);
  expect(summary.total).toBeCloseTo(summary.itemTotal + summary.tax, 2);
});

When('finaliza la compra', async function (this: CustomWorld) {
  await this.checkoutOverviewPage.finish();
});

Then('debería ver el mensaje de confirmación {string}', async function (this: CustomWorld, message: string) {
  await expect(this.page).toHaveURL(/checkout-complete\.html/);
  await expect(this.checkoutCompletePage.confirmationHeader).toHaveText(message);
});

Then('el formulario de envío debería mostrar el error {string}', async function (this: CustomWorld, message: string) {
  await expect(this.checkoutInfoPage.errorMessage).toHaveText(message);
  await expect(this.page).toHaveURL(/checkout-step-one\.html/);
});
