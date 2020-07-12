import React from 'react';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

class ADSider extends React.Component {

    handleAbout = () => {
        this.props.history.replace({pathname: '/ADabout'});
    };

    handleCart = () => {
        this.props.history.replace({pathname: '/ADcart'});
    };

    handleHome = () => {
        this.props.history.replace({pathname: '/ADhome'});
    };

    handleRecord = () => {
        this.props.history.replace({pathname: '/ADrecord'});
    };

    handleUserList = () => {
        this.props.history.replace({pathname: '/UserList'});
    };

    handleSaleList = () => {
        this.props.history.replace({pathname: '/SaleList'});
    };

    render() {
        return (
            <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                    <Menu.Item key="setting:1" text-align="center" onClick={this.handleHome}>Home</Menu.Item>
                    <Menu.Item key="setting:2" text-align="center" onClick={this.handleCart}>Cart</Menu.Item>
                    <Menu.Item key="setting:3" text-align="center" onClick={this.handleRecord}>Record</Menu.Item>
                    <Menu.Item key="setting:4" text-align="center" onClick={this.handleSaleList}>Sales</Menu.Item>
                    <Menu.Item key="setting:5" text-align="center" onClick={this.handleUserList}>Users</Menu.Item>
                    <Menu.Item key="setting:6" text-align="center" onClick={this.handleAbout}>About</Menu.Item>

                </Menu>
            </Sider>
        );
    }
}

export default ADSider ;