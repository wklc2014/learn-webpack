/**
 * 侧边导航内容
 */
import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink, withRouter } from 'mirrorx';
import Logo from '../common/Logo/Logo.jsx';
import config_routes from './common/config_routes.js';

const Sidebar = (props) => {
    const { collapsed, location } = props;
    const { pathname } = location;

    const menuItemEle = config_routes.filter((route) => route.show).map((route, i) => {
        const iconEle = route.icon ? <Icon type={ route.icon } /> : null;
        const spanEle = route.className ? <span className={`${route.className}`} /> : null;
        return (
            <Menu.Item key={ route.path }>
                <NavLink to={ route.path } replace={ route.path === pathname }>
                    { iconEle }
                    { spanEle }
                    { !collapsed && route.label }
                </NavLink>
            </Menu.Item>
        );
    });

    return (
        <section>
            <Logo />
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[ pathname ]}
            >
                { menuItemEle }
            </Menu>
        </section>
    );
};

export default withRouter(Sidebar);
