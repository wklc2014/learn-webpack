'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    dot_env: resolveApp('.env'),
    app: appDirectory,
    app_build: resolveApp('build'),
    app_public: resolveApp('public'),
    app_public_path: '/',
    app_html: resolveApp('src/entries/index.html'),
    app_entries: resolveApp('src/entries/index.js'),
    app_src: resolveApp('src'),
    app_node_modules: resolveApp('node_modules'),
};
