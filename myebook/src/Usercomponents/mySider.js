import React from 'react';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

class MySider extends React.Component {
    constructor(props) {
        super(props);
        this.handleAbout = this.handleAbout.bind(this);
        this.handleCart = this.handleCart.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleRecord = this.handleRecord.bind(this);
    }

    handleAbout = () => {
        this.props.history.replace({pathname: '/about'});
    };

    handleCart = () => {
        this.props.history.replace({pathname: '/cart'});
    }

    handleHome = () => {
        this.props.history.replace({pathname: '/home'});
    }

    handleRecord = () => {
        this.props.history.replace({pathname: '/record'});
    }

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
                    <Menu.Item key="setting:4" text-align="center" onClick={this.handleAbout}>About</Menu.Item>

                </Menu>
            </Sider>
        );
    }
}

export default MySider ;