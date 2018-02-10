import React, { Component } from 'react';
import propTypes from 'prop-types';
import Simditor from "simditor";
import SIMDITOR_INIT_OPTIONS from './common/';
import './simditor.less';

export default class HSimditor extends Component {

    static defaultProps = {}

    componentDidMount() {
         this.onInit();
    }

    componentWillUnmount() {
        this.simditor.destroy();
    }

    onInit = () => {
        const { params = {}, value, id, onChange } = this.props;
        this.simditor = new Simditor({
            ...SIMDITOR_INIT_OPTIONS,
            ...params,
            textarea: `#${id}`,
        });

        if (value) {
            this.simditor.setValue(value);
        }

        //监听改变
        this.simditor.on('valuechanged', (e, src) => {
            const newValue = this.simditor.getValue();
            onChange && onChange(newValue);
        });

    }

    render() {
        const { id } = this.props;

        return (
            <div id={`HSimditor_${id}_Wraper`}>
                <textarea id={id} />
            </div>
        )
    }

}

HSimditor.propTypes = {
    id: propTypes.string.isRequired,
    params: propTypes.object,
}
