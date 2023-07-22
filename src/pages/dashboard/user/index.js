import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Claims from '../Claim/claim';
import BootCampList from '../Bootcamp/bootCampList';


const { Sider, Content } = Layout;

class User extends Component {
    state = {
        collapsed: false,
        current: 'Claim',
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    }
    layoutContent = (props) => {
        if (this.state.current === "Claim") {
            return (
                <Claims  {...props} />
            )
        } else if (this.state.current === "bootcamp") {
            return (
                <BootCampList {...props} />
            )
        }
    }
    render() {
        console.log(this.state.current)
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark"
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="inline">
                        <Menu.Item key="Claim">
                            <Icon type="exception" />
                            Claim
                        </Menu.Item>
                        <Menu.Item key="bootcamp">
                            <Icon type="video-camera" />
                            Live Session
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.layoutContent(this.props)}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default User;