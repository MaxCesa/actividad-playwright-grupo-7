# Actividad 5: Testing Automatizado con Playwright y QA Adaptativo

## 1 ¿Qué es Playwright y diferencias con Selenium y Cypress?

Playwright es un framework moderno de código abierto desarrollado por Microsoft para la automatización de pruebas End-to-End (E2E) e integración en aplicaciones web modernas. Permite ejecutar pruebas de forma nativa en los principales motores de renderizado: Chromium (Chrome, Edge), Firefox y WebKit (Safari). Playwright simula a un usuario: Una de las cosas más importantes para entender es que Playwright interactúa con la aplicación desde el navegador. 

Las tres herramientas permiten realizar testing End-to-End (E2E) de aplicaciones web. La diferencia principal entre ellas no está en el objetivo general, sino en cómo están diseñadas, cómo interactúan con el navegador, qué funcionalidades ofrecen y qué tipo de escenarios pueden manejar con mayor facilidad. 

### Diferencias principales:

#### Contra Selenium:

Selenium se comunica a través del protocolo HTTP mediante WebDriver, lo que requiere instalar drivers independientes e introduce latencia en cada interacción. Playwright se conecta directamente con las herramientas de depuración internas del navegador mediante WebSockets (Chrome DevTools Protocol / CDP), eliminando intermediarios y acelerando la ejecución. Ademas, Selenium suele requerir esperas explícitas para evitar fallos por elementos no cargados. Playwright incorpora espera automática (auto-waiting), verificando que un elemento sea visible, estable e interactivo antes de realizar una acción. 

#### Contra Cypress:

Cypress se ejecuta dentro del propio bucle de eventos del navegador (in-browser), lo que genera limitaciones nativas para manejar múltiples pestañas, iframes o dominios cruzados. Esta especialmente orientada al frontend, a los lenguajes de JavaScript y TypeScript. Playwright corre fuera del proceso del navegador (out-of-process), ofreciendo control multi-página y soporte nativo para iframes. Ademas, Playwright utiliza el concepto de BrowserContext, lo que permite ejecutar múltiples contextos paralelos sobre una sola instancia del navegador sin sobrecargar la memoria. 

## 2 QA Adaptativo y Desafíos en Single Page Applications (SPAs)

### El problema de las SPAs para el Testing Tradicional:

En una Single Page Application (desarrollada con RWeact, Vue, Angular, etc), la navegación y el renderizado ocurren en el cliente (client-side routing) y el DOM cambia dinámicamente sin recargar la página completa. Esto hace que el testing tradicional sea mas dificil porque la interfaz ya no es estatica. Esto introduce tres grandes problemas: 

1. Selectores indefinidos o fragiles: El uso de clases CSS generadas en tiempo de compilación (ej. .css-1x8zq9) o IDs dinámicos cambia entre despliegues, haciendo que los selectores XPATH o CSS tradicionales se rompan con frecuencia. Por eso se habla de selectores fragiles. Esto genera una cantidad importante de falsos positivos de fallo.   

2. Contenido asincrónico: Las peticiones de datos en segundo plano provocan que los elementos aparezcan o se modifiquen en momentos impredecibles. Esto quiere decir que existe un intervalo en el que el elemento no esta disponible o su contenido todavia no esta actualizado. Para los test tradicionales esto es un problema ya que puede intentar verificar algo antes de que la aplicacion haya terminado de actualizarse. Si la prueba no maneja de manera correcta esa asincronica, fallara de manera intermitente. Estas fallas se conocen como flaky tests. Por eso herramientas modernas como playwright utilizan mecanismos de espera automatica y sincronizacion con el estado de la aplicacion.   

3. Rutas client-side: Al cambiar de vista mediante window.history.pushState, no se dispara el evento tradicional window.onload, por lo que las herramientas de test tradicionales no saben con certeza cuándo la pantalla terminó de renderizarse. Aca hay una diferencia respecto del modelo tradicional de navegacion. En este sentido el sistema de testing debe ser capaz de reconocer correctamente: cambios de url, cambios de contenido, diferentes vistas, etc. 

### QA Adaptativo:

El QA Adaptativo es un paradigma de testing donde los scripts de prueba no dependen de estructuras de código rígidas del DOM, sino que son capaces de tolerar y adaptarse a cambios en la interfaz. Lo que se busca es que las herramientas y estrategias de testing se adapten a las caracteristicas de la aplicacion que se esta probando. Utiliza selectores orientados a la accesibilidad e intención del usuario (roles ARIA, etiquetas, texto, etc) y mecanismos de auto-reparación (self-healing) para garantizar la mantenibilidad y resiliencia de la suite de pruebas a lo largo del ciclo de vida del sitio. 

Playwright se presenta justamente como un QA adaptativo, diseñado para trabajar mejor con aplicacion dinámicas. Entre sus aportes se pueden destacar el auto-waiting (para esperar a que los elementos estén disponibles) los locators (que permiten utilizar formas más robustas de identificar elementos) manejo de diferentes estados de la página, control de navegación y urls, entre otros. Esto permite crear pruebas menos dependientes de la estructura interna de la aplicación y más enfocadas en su comportamiento.


## 3 Como se puede combinar Playwright con un modelo de lenguaje (LLM) para generar o ajustar selectores y casos de prueba de forma dinámica ante cambios en la interfaz. 

LLM (Large Language Model) es un modelo de la IA capaz de comprender y generar lenguaje natural y, en este contexto, tambien puede analizar codigo. Al combinarlo con Playwright se puede construir un sistema en el que Playwright detecta un problema durante la ejecucion de una prueba y el LLM analiza la situacion para proponer una solucion, como un nuevo selector o una modificacion del caso de prueba. 

¿Como funcionaria? Se puede dividir en distintas etapas: 

1. Playwright ejecuta la prueba y encuentra un problema, por ejemplo, que un elemento que el test intenta localizar ya no se encuentra en la pagina.
   
2. Cuando ocurre el error, el sistema puede recopilar informacion relevante de la aplicacion como por ejemplo: selector que utilizaba el test. Esta informacion proporciona al LLM el contexto necesario para analizar que cambio. 

3. El LLM recibe esta informacion y puede comparar lo que el test esperaba con lo que actualmente existe en la interfaz.  A partir de esto puede proponer un selector alternativo que sea mas adecuado. 

4. El LLM puede generar un nuevo selector utilizando informacion mas estable de la interfaz.  

5. Playwright vuelve a ejecutar la prueba y, si funciona correctamente, el sistema puede considerar que el cambio permitio recuperar la automatizacion. Si vuelve a fallar, el LLM puede analizar nuevamente la informacion y proponer otra modificacion. Esto puede generar un proceso iterativo:  

### Ejecutar -> detectar fallo -> analizar -> adaptar -> volver a ejecutar. 

Tambien puede utilizarse para generar casos de prueba a partir de informacion sobre la aplicacion. Puede, por ejemplo, analizar: requisitos funcionales, historias de usuario, documentacion, codigo, estructura de la interfaz, casos de prueba existentes. A partir de esta informacion puede proponer escenarios que deberian ser comprobados y generar el codigo correspondiente para Playwright. 

El principal beneficio es reducir el problema de tests fragiles. Playwright se encarga de ejecutar las pruebas y controlar el navegador, mientras que el LLM aporta inteligencia para analizar cambios y generar o ajustar selectores y casos de prueba. De esta forma, los tests pueden adaptarse más fácilmente a los cambios de la interfaz, dando lugar a un enfoque de QA más adaptativo.
