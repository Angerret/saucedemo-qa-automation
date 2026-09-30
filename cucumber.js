// Configuración de Cucumber. Playwright se usa como librería: el runner es Cucumber.
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    paths: ['features/**/*.feature'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: Number(process.env.PARALLEL ?? 2),
    retry: Number(process.env.RETRY ?? 0),
  },
};
