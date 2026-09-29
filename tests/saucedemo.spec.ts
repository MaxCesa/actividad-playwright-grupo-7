import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.describe("Suite de Automatización E2E - SPA SauceDemo", () => {
  test("Flujo 1: Inicio de sesión exitoso y acceso al catálogo", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");

    // Tiene que redireccionar a la URL de inventario
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("Flujo 2: Ordenar productos por precio de menor a mayor (Low to High)", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");

    // Aplicar ordenamiento por precio menor a mayor ('lohi')
    await inventoryPage.sortBy("lohi");

    // El primer producto listado tiene que ser el más económico ($7.99)
    await expect(inventoryPage.firstItemPrice).toHaveText("$7.99");
    await expect(inventoryPage.firstItemName).toHaveText("Sauce Labs Onesie");
  });

  test("Flujo 3: Agregar producto al carrito y completar la orden de compra", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");

    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await cartPage.fillCustomerInfo("Juan", "Pérez", "1425");
    await cartPage.completeOrder();

    // Tiene que visualizar el mensaje de confirmación de orden
    await expect(cartPage.completeHeader).toHaveText(
      "Thank you for your order!",
    );
  });
});
