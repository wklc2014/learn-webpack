process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const getClientEnvironment = require('./env.js');
const paths = require('./paths.js');

const env = getClientEnvironment();

module.exports = {
    entry: [
        'babel-polyfill',
        paths.app_entries,
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: paths.app_build,
        publicPath: paths.app_public_path,
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     include: paths.app_src,
            //     enforce: 'pre',
            //     use: [
            //         {
            //             options: {
            //                 formatter: eslintFormatter,
            //                 eslintPath: require.resolve('eslint'),
            //             },
            //             loader: require.resolve('eslint-loader'),
            //         }
            //     ]
            // },
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/,
                        include: paths.app_src,
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true,
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [
                            "style-loader",
                            "css-loader"
                        ]
                    },
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'images/[name].[hash:8].[ext]',
                        },
                    },
                ]
            }

        ]
    },
    plugins: [
        new InterpolateHtmlPlugin(env.raw),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.app_html,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin(env.stringified),
        new webpack.HotModuleReplacementPlugin(),
        new WatchMissingNodeModulesPlugin(paths.app_node_modules),
        new CleanWebpackPlugin([ paths.app_build ], { root: paths.app }),
        new CopyWebpackPlugin([{ from: paths.app_public, to: paths.app_build }]),
    ],
    devServer: {
        contentBase: paths.app_public,
        publicPath: paths.app_public_path,
        watchContentBase: true,
        compress: true,
        https: process.env.HTTPS === 'true' ? true : false,
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 12000,
        open: process.env.OPEN === 'true' ? true : false,
        stats: "errors-only",
        hot: true,
        watchOptions: {
            ignored: ignoredFiles(paths.app_src),
            poll: 1000
        },
        before(app) {
            app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware());
        },
    }
}
