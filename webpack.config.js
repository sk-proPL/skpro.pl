const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/page')
    .setPublicPath('/build/page')
    .addEntry('app-page', './assets/page/entry.js')
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSassLoader()
    .enableVersioning()
;

const pageConfig = Encore.getWebpackConfig();

pageConfig.externals = Object.assign({}, pageConfig.externals, { window: 'window', document: 'document' });
pageConfig.name = 'page';

Encore.reset();

Encore
    .setOutputPath('public/build/dashboard')
    .setPublicPath('/build/dashboard')
    .addEntry('app-dashboard', './assets/dashboard/entry.js')
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSassLoader()
    .enableVersioning()
;

const dashboardConfig = Encore.getWebpackConfig();

dashboardConfig.externals = Object.assign({}, dashboardConfig.externals, { window: 'window', document: 'document' });
dashboardConfig.name = 'dashboard';

module.exports = [pageConfig, dashboardConfig];