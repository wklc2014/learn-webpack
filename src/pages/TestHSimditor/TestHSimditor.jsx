import React, { Component } from 'react';
import { connect, actions } from 'mirrorx';
import { Button } from 'antd';
import HSimditor from '../common/HSimditor/HSimditor.jsx';

class TestHSimditor extends Component {

    static defaultProps = {}

    onClick = () => {
        const value = this.inst.simditor.getValue();
        console.log("value", value);
    }

    componentWillReceiveProps(nextProps) {
        const value = this.inst.simditor.sync();
        console.log("value", value);
        if (nextProps.value && nextProps.value !== value) {
            this.inst.simditor.setValue(nextProps.value);
        }
    }


    onAjax = () => {
        actions._report.example({ m: 1, n: 2 });
    }

    onChange = (value) => {
        actions._report.update({ content: value });
    }

    render() {

        return (
            <div style={{ padding: 16 }}>
                <div style={{ marginBottom: 16 }}>
                    <HSimditor
                        id="test_h_editor"
                        ref={inst => this.inst = inst}
                        params={{
                            placeholder: "请输入内容"
                        }}
                    />
                </div>
                <Button
                    type="primary"
                    onClick={this.onClick}
                    style={{ marginRight: 16 }}
                >
                    按钮
                </Button>
                <Button
                    type="primary"
                    onClick={this.onAjax}
                >
                    ajax
                </Button>
            </div>
        )
    }

}

TestHSimditor.propTypes = {

}

export default connect((state) => {
    return {
        value: state._report.content,
    }
})(TestHSimditor)
