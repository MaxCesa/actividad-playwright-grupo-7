# Actividad 5: Testing Automatizado con Playwright y QA Adaptativo

## 1 ¿Qué es Playwright y diferencias con Selenium y Cypress?

Playwright es un framework moderno de código abierto desarrollado por Microsoft para la automatización de pruebas End-to-End (E2E) e integración en aplicaciones web modernas. Permite ejecutar pruebas de forma nativa en los principales motores de renderizado: Chromium (Chrome, Edge), Firefox y WebKit (Safari).

### Diferencias principales:

#### Contra Selenium:

Selenium se comunica a través del protocolo HTTP mediante WebDriver, lo que requiere instalar drivers independientes e introduce latencia en cada interacción. Playwright se conecta directamente con las herramientas de depuración internas del navegador mediante WebSockets (Chrome DevTools Protocol / CDP), eliminando intermediarios y acelerando la ejecución. Ademas, Selenium suele requerir esperas explícitas para evitar fallos por elementos no cargados. Playwright incorpora espera automática (auto-waiting), verificando que un elemento sea visible, estable e interactivo antes de realizar una acción.

#### Contra Cypress:

Cypress se ejecuta dentro del propio bucle de eventos del navegador (in-browser), lo que genera limitaciones nativas para manejar múltiples pestañas, iframes o dominios cruzados. Playwright corre fuera del proceso del navegador (out-of-process), ofreciendo control multi-página y soporte nativo para iframes. Ademas, Playwright utiliza el concepto de BrowserContext, lo que permite ejecutar múltiples contextos paralelos sobre una sola instancia del navegador sin sobrecargar la memoria.

## 2 QA Adaptativo y Desafíos en Single Page Applications (SPAs)

### El problema de las SPAs para el Testing Tradicional:

En una Single Page Application (desarrollada con RWeact, Vue, Angular, etc), la navegación y el renderizado ocurren en el cliente (client-side routing) y el DOM cambia dinámicamente sin recargar la página completa. Esto introduce tres grandes problemas:

1. Selectores indefinidos o fragiles: El uso de clases CSS generadas en tiempo de compilación (ej. .css-1x8zq9) o IDs dinámicos cambia entre despliegues, haciendo que los selectores XPATH o CSS tradicionales se rompan con frecuencia.
2. Contenido asincrónico: Las peticiones de datos en segundo plano provocan que los elementos aparezcan o se modifiquen en momentos impredecibles.
3. Rutas en el cliente: Al cambiar de vista mediante window.history.pushState, no se dispara el evento tradicional window.onload, por lo que las herramientas de test tradicionales no saben con certeza cuándo la pantalla terminó de renderizarse.

### QA Adaptativo:

El QA Adaptativo es un paradigma de testing donde los scripts de prueba no dependen de estructuras de código rígidas del DOM, sino que son capaces de tolerar y adaptarse a cambios en la interfaz. Utiliza selectores orientados a la accesibilidad e intención del usuario (roles ARIA, etiquetas, texto, etc) y mecanismos de auto-reparación (self-healing) para garantizar la mantenibilidad y resiliencia de la suite de pruebas a lo largo del ciclo de vida del sitio.
