# Sauce Demo – Automatización QA FrontEnd

Suite de pruebas E2E para [Sauce Demo](https://www.saucedemo.com/) construida con **Playwright + Cucumber (BDD)** en **TypeScript**, aplicando el patrón **Page Object Model**.

## Tecnologías

| Herramienta | Uso |
|---|---|
| [Playwright](https://playwright.dev/) | Automatización del navegador y aserciones (`expect` con auto-waiting) |
| [Cucumber.js](https://cucumber.io/docs/installation/javascript/) | Runner BDD y escenarios en Gherkin |
| TypeScript | Tipado estático y código mantenible |
| GitHub Actions | Integración continua (Chromium y Firefox) |

## Requisitos previos

- **Node.js 20 LTS o superior** (`node -v`)
- **npm** (incluido con Node.js)
- **Git**

## Instalación

```bash
git clone https://github.com/Angerret/saucedemo-qa-automation.git
cd saucedemo-qa-automation
npm install
npx playwright install chromium
```

Opcional: copia `.env.example` a `.env` para cambiar la configuración (navegador, modo headless, etc.).

## Ejecución

| Comando | Descripción |
|---|---|
| `npm test` | Ejecuta toda la suite (headless, 2 workers en paralelo) |
| `npm run test:smoke` | Solo escenarios críticos (`@smoke`) |
| `npm run test:login` | Escenarios de inicio de sesión |
| `npm run test:cart` | Escenarios del carrito |
| `npm run test:checkout` | Escenarios del proceso de compra |
| `npm run test:negative` | Solo escenarios negativos |
| `npm run test:headed` | Con el navegador visible y en cámara lenta |
| `npm run test:firefox` | En Firefox (requiere `npx playwright install firefox`) |
| `npm run typecheck` | Verificación de tipos de TypeScript |

Filtrar por cualquier combinación de tags:

```bash
npx cucumber-js --tags "@checkout and not @negativo"
```

## Reportes

Después de cada ejecución se generan:

- `reports/cucumber-report.html`: reporte visual (ábrelo en el navegador)
- `reports/cucumber-report.json`: formato para integraciones

Si un escenario falla, el reporte incluye un **screenshot** y la URL donde ocurrió el fallo.

## Estructura del proyecto

```
├── features/                  # Especificación en Gherkin (español)
│   ├── login.feature
│   ├── cart.feature
│   └── checkout.feature
├── src/
│   ├── pages/                 # Page Objects
│   │   ├── BasePage.ts
│   │   ├── components/HeaderComponent.ts
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutInfoPage.ts
│   │   ├── CheckoutOverviewPage.ts
│   │   └── CheckoutCompletePage.ts
│   ├── steps/                 # Step definitions
│   ├── support/               # World, hooks y configuración
│   ├── data/                  # Datos de prueba (usuarios)
│   └── utils/                 # Utilidades
├── docs/ESTRATEGIA.md         # Informe de estrategia de automatización
├── .github/workflows/         # Pipeline de CI
└── cucumber.js                # Configuración de Cucumber
```

## Cobertura de criterios de aceptación

| # | Criterio | Feature | Escenarios |
|---|---|---|---|
| 1 | Login con credenciales válidas | `login.feature` | Login exitoso con `standard_user` |
| 2 | Login con credenciales inválidas | `login.feature` | `locked_out_user`, contraseña incorrecta, usuario inexistente, campos vacíos |
| 3 | Agregar producto al carrito | `cart.feature` | Agregar producto y validar contador y botón |
| 4 | Ver productos en el carrito | `cart.feature` | Validar nombre y precio de varios productos; eliminar producto |
| 5 | Completar la compra | `checkout.feature` | Flujo E2E hasta la confirmación, validación de totales y de campos obligatorios |

**Tipos de usuario:** `standard_user` (flujos positivos) y `locked_out_user` (acceso denegado).

## Tags disponibles

`@login` `@carrito` `@checkout` `@smoke` `@e2e` `@positivo` `@negativo` `@standard_user` `@locked_out_user`

## Estrategia

La explicación de las decisiones de diseño está en [docs/ESTRATEGIA.md](docs/ESTRATEGIA.md).
