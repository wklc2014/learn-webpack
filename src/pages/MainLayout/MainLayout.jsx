/**
 * 主体布局
 */
import React, { Component } from 'react';
// import { connect, withRouter } from 'mirrorx';
import { Layout } from 'antd';
import Sidebar from './Sidebar.jsx';

const { Sider } = Layout;

class MainLayout extends Component {

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    handleCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        const { collapsed } = this.state;
        const { location } = this.props;

        return (
            <Layout className="MainLayoutWraper" style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible={true}
                    collapsed={collapsed}
                    onCollapse={this.handleCollapse}
                >
                    <Sidebar
                        collapsed={collapsed}
                        location={location}
                    />
                </Sider>
                <Layout style={{ backgroundColor: '#fff' }}>
                    <div className="MainLayoutContent">
                        { this.props.children }
                    </div>
                </Layout>
            </Layout>
        );
    }
}

MainLayout.propTypes = {
};

export default MainLayout;
