import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Form } from 'antd';

import HTable from '../common/HForm/HTable.jsx';
import * as CONFIG_TABLE from './common/';

class TestHTable extends Component {

    static defaultProps = {
    }

    onChange = ({ id, value, order }) => {
        actions._report.updateHTable({ id, value, order })
    }

    render() {
        const { values } = this.props;

        return (
            <div style={{ padding: 16 }}>
                <HTable
                    configs={CONFIG_TABLE.Assess}
                    form={this.props.form}
                    dataSource={values}
                    onChange={this.onChange}
                    pagination={false}
                    isTotal
                />
            </div>
        )
    }
}

const Wraper = Form.create()(TestHTable);

export default Wraper;
