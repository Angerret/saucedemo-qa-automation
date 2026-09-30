# Informe de estrategia de automatización

## 1. Enfoque general

La suite sigue un enfoque **BDD (Behavior-Driven Development)**. La historia de usuario y sus criterios de aceptación se tradujeron primero a escenarios Gherkin en español, legibles por perfiles no técnicos, y después se implementó el código que los ejecuta. Así, los feature files funcionan como documentación viva del comportamiento esperado.

Se eligió **Playwright** como motor de automatización por su auto-waiting (que reduce la inestabilidad o *flakiness*), su soporte multinavegador (Chromium, Firefox y WebKit) y su velocidad. **Cucumber.js** actúa como runner y Playwright se usa como librería; las aserciones se hacen con el `expect` de Playwright, que reintenta automáticamente hasta que se cumple la condición.

## 2. Patrones de diseño

**Page Object Model (POM).** Cada pantalla de la aplicación tiene su clase en `src/pages/`, que encapsula sus localizadores y acciones. Los step definitions nunca contienen selectores: solo invocan métodos de negocio (`login()`, `addToCart()`, `fillCustomerInfo()`). Si cambia la interfaz, el ajuste se hace en un único lugar.

- **Herencia:** `BasePage` agrupa el comportamiento común (navegación y título de página).
- **Composición (Page Component):** la cabecera con el carrito aparece en varias páginas, así que se modeló como `HeaderComponent` en lugar de duplicarla.
- **Separación de responsabilidades:** los Page Objects exponen acciones y localizadores; las **aserciones viven en los steps**, lo que mantiene las páginas reutilizables en distintos contextos de validación.

**World de Cucumber (contexto compartido / inyección de dependencias).** `CustomWorld` crea una instancia nueva por escenario con la página y todos los Page Objects, lo que da un aislamiento total entre escenarios y permite ejecutarlos en paralelo.

**Data-Driven Testing.** Se usan `Esquema del escenario` con `Ejemplos` y `DataTable` para cubrir muchas variantes (credenciales inválidas, campos obligatorios, varios productos) sin duplicar pasos.

## 3. Decisiones técnicas

| Decisión | Motivo |
|---|---|
| Selectores `data-test` y clases estables | Resisten cambios de estilo o de estructura del DOM |
| Productos localizados por nombre exacto | Los escenarios expresan intención de negocio y no dependen de IDs técnicos |
| Un navegador por worker y un contexto por escenario | Equilibrio entre velocidad y aislamiento (sin sesión compartida) |
| Screenshot automático al fallar | Evidencia inmediata para diagnosticar fallos |
| Configuración por variables de entorno | El mismo código corre en local y en CI con distintos navegadores |
| Datos de prueba centralizados en `src/data` | Sin credenciales hardcodeadas en los steps |
| Tags (`@smoke`, `@negativo`, etc.) | Ejecuciones selectivas según la necesidad (smoke o regresión) |

## 4. Cobertura

Se cubren los cinco criterios de aceptación con escenarios **positivos** y **negativos**: login válido; login bloqueado e inválido (4 variantes); agregar un producto; ver varios productos con precios; eliminar un producto; compra E2E con validación matemática de totales; y validación de campos obligatorios en el checkout. En total son 13 escenarios, con dos tipos de usuario: `standard_user` y `locked_out_user`.

## 5. Integración continua

Un workflow de GitHub Actions ejecuta la suite en **Chromium y Firefox** en cada push o pull request a `main` y publica el reporte HTML como artefacto.

## 6. Mejoras futuras

- Cubrir los demás usuarios de Sauce Demo (`problem_user`, `performance_glitch_user`, `error_user`, `visual_user`).
- Añadir pruebas de ordenamiento y filtros de productos.
- Incorporar pruebas de regresión visual y de accesibilidad (axe-core).
- Reutilizar la sesión autenticada (`storageState`) para acelerar los escenarios que no prueban el login.
- Añadir reportes enriquecidos (Allure) y linting con ESLint y Prettier.
