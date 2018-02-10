import React from 'react';
import mirror, { render } from 'mirrorx';
import { createLogger } from 'redux-logger';
import moment from 'moment';
import 'moment/locale/zh-cn';

import App from './containers/App.jsx';
import './assets/less/common.less';

import * as env from './utils/env.js';

moment.locale('zh-cn');

const mirrorDefaults = {
    historyMode: 'hash',
    middlewares: [],
}

if (env.NODE_ENV === "development") {
    mirrorDefaults.middlewares.push(
        createLogger({
            collapsed: true,
        })
    )
}

mirror.defaults(mirrorDefaults);

render(<App />, document.getElementById('root'));
