'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const paths = require('./paths.js');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error(
        'The NODE_ENV environment variable is required but was not specified.'
    );
}

const add_config_path = path.resolve(paths.app, `config/dotenv/.env.${process.env.NODE_ENV}`);
const add_config = dotenv.parse(fs.readFileSync(add_config_path));

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

for (var k in add_config) {
    process.env[k] = add_config[k];
}

const APP_ENV = /^APP_ENV_/i;

function getClientEnvironment() {
    const raw = {};
    const stringified = {};

    Object.keys(process.env)
        .filter(key => APP_ENV.test(key))
        .forEach((key, i) => {
            raw[key] = process.env[key];
        });

    Object.assign(raw, {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: process.env.PUBLIC_URL || './',
    })

    Object.keys(raw).forEach((key, i) => {
        stringified[key] = JSON.stringify(raw[key]);
    });

    return { raw, stringified };
}

module.exports = getClientEnvironment;
