/* eslint-disable global-require */

module.exports = (config) => {
    const BUILD_ENV = process.env.BUILD_ENV;
    const ktk = BUILD_ENV === 'ktk';
    const v2 = BUILD_ENV === 'v2';

    require('react-app-rewire-postcss')(config, true);

    const path = require('path');
    const template_default = path.resolve(__dirname, './public/index.html');
    const template_ktk = path.resolve(__dirname, './public/index_ktk.html');
    const template_v2 = path.resolve(__dirname, './public/index_v2.html');

    let template = ktk ? template_ktk : template_default;
    template = v2 ? template_v2 : template;

    const htmlPlugin = require('html-webpack-plugin');
    const pluginIndex = config.plugins.findIndex((plugin) => {
        return plugin.constructor && plugin.constructor.name && /HtmlWebpackPlugin/i.test(plugin.constructor.name);
    });

    if (pluginIndex !== -1) {
        const nextPlugins = config.plugins.filter((el, index) => index !== pluginIndex);
        nextPlugins.unshift(new htmlPlugin({
            template:      template,
            templateParameters: { version: new Date().toJSON(), },
            scriptLoading: 'defer',
        }));

        config.plugins = nextPlugins;
    }

    return config;
};
