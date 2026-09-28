import { Page, Locator } from "@playwright/test";
export class InventoryPage {
  readonly page: Page;
  readonly sortSelect: Locator;
  readonly firstItemName: Locator;
  readonly firstItemPrice: Locator;
  readonly addToCartBackpackButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.firstItemName = page.locator(".inventory\_item\_name").first();
    this.firstItemPrice = page.locator(".inventory\_item\_price").first();
    this.addToCartBackpackButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.cartBadge = page.locator(".shopping\_cart\_badge");
    this.cartLink = page.locator(".shopping\_cart\_link");
  }

  async sortBy(optionValue: string) {
    // Valores de SauceDemo: 'az', 'za', 'lohi', 'hilo'
    await this.sortSelect.selectOption(optionValue);
  }

  async addBackpackToCart() {
    await this.addToCartBackpackButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
