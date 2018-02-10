import React, { Component } from 'react';
import lodash from 'lodash';
import propTypes from 'prop-types';
import { Table } from 'antd';
import HFormItem from './HFormItem.jsx';

import getSortedConfigs from './common/getSortedConfigs.js';

class HTable extends Component {

    static defaultProps = {
        configs: []
    }

    getTableColumns = () => {
        const { configs, form, isSort } = this.props;
        const newConfigs = getSortedConfigs(isSort, configs);
        const newColumns = [];
        newConfigs.forEach((val, i) => {
            const { column, config, extMap = {} } = val;
            if (!extMap.isHide) {
                newColumns.push({
                    ...column,
                    key: `HTable-${i}`,
                    dataIndex: config.id,
                    render: (text, record) => {
                        switch (record.key) {
                            case 'ts':
                                return text;
                            default:
                                const HFormItemProps = {
                                    form,
                                    config: {
                                        ...config,
                                        id: `${config.id}__${record.key}`,
                                    },
                                    onChange: ({ id, value }) => {
                                        this.props.onChange({
                                            id: id.split('__')[0],
                                            value,
                                            order: record.key,
                                        });
                                    },
                                    formItemLayout: null,
                                    value: { base: text },
                                }
                                return <HFormItem {...HFormItemProps} />;
                        }
                    }
                });
            }
        })

        return newColumns;
    }

    getTableDataSource = () => {
        const { dataSource, configs, isTotal, isSort } = this.props;
        if (!isTotal || !dataSource.length) {
            return dataSource;
        }
        let newDataSource = [...dataSource];
        const newConfigs = getSortedConfigs(isSort, configs);
        const totalId = lodash.get(newConfigs, '[0].config.id');
        const totalData = { [totalId]: '汇总：' };
        newConfigs.forEach((val, i) => {
            const { config, extMap = {} } = val;
            if (extMap.eval) {
                newDataSource = newDataSource.map((m) => {
                    // eslint-disable-next-line
                    const evalText = eval(extMap.eval.replace(/\$/g, 'm'));
                    if (!isNaN(evalText)) {
                        m[config.id] = parseFloat(evalText).toFixed(2);
                    }
                    return m;
                })
            }
            if (extMap.total) {
                totalData[config.id] = 0;
            }
        });
        Object.keys(totalData).forEach((m) => {
            if (m !== totalId) {
                dataSource.forEach((v) => {
                    if (v[m]) {
                        totalData[m] += parseFloat(v[m]);
                    }
                });
            }
        });
        const newTotalData = {...totalData};
        Object.keys(totalData).forEach((m) => {
            if (m !== totalId) {
                newTotalData[m] = parseFloat(totalData[m]).toFixed(2);
            } else {
                newTotalData[m] = totalData[m];
            }
        })
        newDataSource.push({ key: 'ts', ...newTotalData });
        // console.log(JSON.stringify(newDataSource))
        return newDataSource;
    }

    render() {
        const { rowKey, pagination } = this.props;
        const newColumns = this.getTableColumns();
        const newDataSource = this.getTableDataSource();

        return (
            <Table
                rowKey={rowKey}
                pagination={pagination}
                columns={newColumns}
                dataSource={newDataSource}
                bordered
            />
        )
    }
}


HTable.propTypes = {
    form: propTypes.object.isRequired,
    configs: propTypes.arrayOf(propTypes.shape({
        column: propTypes.object.isRequired,
        config: propTypes.object.isRequired,
        extMap: propTypes.object,
    })),
    dataSource: propTypes.array.isRequired,
    onChange: propTypes.func,
    isSort: propTypes.bool,
    isTotal: propTypes.bool,
};

export default HTable;
