import React from 'react';
import { Form } from 'antd';

import HForm from '../common/HForm/HForm.jsx';
import configs from './common/';

function TestHFormLayout({ form }) {
    return (
        <section style={{ padding: 16 }}>
            <div>
                <HForm
                    configs={configs}
                    form={form}
                    columns={4}
                />
            </div>
        </section>
    )
}

export default Form.create()(TestHFormLayout);
