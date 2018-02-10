import React, { Component } from 'react';
import { Form } from 'antd';
// import moment from 'moment';
import uuid from 'node-uuid';
// import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

import HFormItem from '../common/HForm/HFormItem.jsx';
import HFormItemExt from '../common/HForm/HFormItemExt.jsx';
import HSimditor from '../common/HSimditor/HSimditor.jsx';

const editor_id = uuid.v1();

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 18,
            offset: 4,
        },
    },
};

class TestHFormItem extends Component {

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.state = {
            editor: '巴拉巴拉',
        }

    }

    onChange = ({ id, value }) => {
        const editor = this.inst.editor.getValue();
        this.setState({ editor })
    }

    onAceChange = (newValue) => {
        // console.log("newValue", newValue);
    }

    render() {
        const { form } = this.props;

        const HFormItemProps_1 = {
            config: {
                id: 'user_name_1',
                type: 'input',
                options: {
                    rules: [
                        { required: true, message: '内容必填' }
                    ]
                }
            },
            formItemParams: {
                label: '姓名',
            },
            formItemLayout,
            form,
        }

        const HFormItemProps_2 = {
            config: {
                id: 'user_name_2',
                type: 'input',
            },
            formItemParams: {
                label: '手机号',
            },
            formItemLayout,
            form,
        }

        const HFormItemProps_3 = {
            config: {
                id: 'user_name_3',
                type: 'button',
                params: {
                    type: 'primary',
                },
                extMap: {
                    label: '提交'
                },
            },
            formItemLayout: tailFormItemLayout,
            form,
        }

        return (
            <div style={{ padding: 16 }}>
                <Form>
                    <HFormItem {...HFormItemProps_1} />
                    <HFormItem {...HFormItemProps_2} />
                    <HFormItemExt
                        formItemParams={{ label: '内容', required: true }}
                        formItemLayout={formItemLayout}
                    >
                        <HSimditor
                            ref={inst => this.inst = inst}
                            id={editor_id}
                            value={this.state.editor}
                            onChange={this.onChange}
                        />
                    </HFormItemExt>
                    <HFormItemExt
                        formItemParams={{ label: '代码' }}
                        formItemLayout={formItemLayout}
                    >
                        <AceEditor
                            mode="java"
                            theme="github"
                            onChange={this.onAceChange}
                            name="UNIQUE_ID_OF_DIV"
                            width="100%"
                            style={{ border: '1px solid #ccc' }}
                            showPrintMargin={false}
                            editorProps={{ $blockScrolling: true }}
                          />
                    </HFormItemExt>
                    <HFormItem {...HFormItemProps_3} />
                </Form>
            </div>
        )
    }
}

const Wraper = Form.create()(TestHFormItem);

export default Wraper;