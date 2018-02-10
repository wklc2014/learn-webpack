import React from 'react';
import { Spin } from 'antd';
import { connect, withRouter } from 'mirrorx';

function Loading ({ children, loading }) {

    return (
        <Spin size="large" spinning={ loading }>
            { children }
        </Spin>
    )
};

function mapStateToProps(state, ownProps) {
    return {
        loading: false,
    }
}

export default withRouter(connect(mapStateToProps)(Loading));
