# Actividad 5: Testing Automatizado con Playwright y QA Adaptativo

## 1 ¿Qué es Playwright y diferencias con Selenium y Cypress?

Playwright es un framework moderno de código abierto desarrollado por Microsoft para la automatización de pruebas End-to-End (E2E) e integración en aplicaciones web modernas. Permite ejecutar pruebas de forma nativa en los principales motores de renderizado: Chromium (Chrome, Edge), Firefox y WebKit (Safari).

### Diferencias principales:

#### Contra Selenium:

Selenium se comunica a través del protocolo HTTP mediante WebDriver, lo que requiere instalar drivers independientes e introduce latencia en cada interacción. Playwright se conecta directamente con las herramientas de depuración internas del navegador mediante WebSockets (Chrome DevTools Protocol / CDP), eliminando intermediarios y acelerando la ejecución. Ademas, Selenium suele requerir esperas explícitas para evitar fallos por elementos no cargados. Playwright incorpora espera automática (auto-waiting), verificando que un elemento sea visible, estable e interactivo antes de realizar una acción.

#### Contra Cypress:

Cypress se ejecuta dentro del propio bucle de eventos del navegador (in-browser), lo que genera limitaciones nativas para manejar múltiples pestañas, iframes o dominios cruzados. Playwright corre fuera del proceso del navegador (out-of-process), ofreciendo control multi-página y soporte nativo para iframes. Ademas, Playwright utiliza el concepto de BrowserContext, lo que permite ejecutar múltiples contextos paralelos sobre una sola instancia del navegador sin sobrecargar la memoria.
