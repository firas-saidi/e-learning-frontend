import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';

import Signout from '../../pages/Auth/signout';

class ProfileHeader extends Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0" className="text-center">
                    <Link to="/dashboard" className="black">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="1" className="text-center">
                    <Link to={`/profile/${this.props.session.getCurrentUser.userName}`} className="black">Profile</Link>
                </Menu.Item>
                <Menu.Item key="3" className="text-center">
                    <Link to={`/how-to-buy`} className="black">How To Buy</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2" className="text-center"><Signout /></Menu.Item>
            </Menu>
        );
        console.log(this.props.session.getCurrentUser.isUser)
        return (
            <div className="topnav navbar nav navbar-expand-sm" >
                <div className="container-fluid">
                    <ul>
                        <li><Link className="logo" to="/courses"><strong>LEVELUP SPACE</strong></Link></li>
                        <li><Link className="ml-4 logo" to="/my-courses"><strong>MY COURSES</strong></Link></li>
                        <li><Link className="logo" to="/blog"><strong>BLOG</strong></Link></li>
                    </ul>
                    <ul>
                        {this.props.session.getCurrentUser.isUser ? <li><strong><Link to="/shopping-cart"><Icon type="shopping-cart" style={{ fontSize: '22px', }} theme="outlined" /></Link></strong></li> : null}
                        <li><strong><Link to="/messages"><Icon type="message" style={{ fontSize: '22px', }} theme="outlined" /></Link></strong></li>
                        <li>

                            <Dropdown overlay={menu} trigger={['click']} className="navbar-right">
                                <Link className="ant-dropdown-link" to="#">
                                    <span className="ant-avatar ant-avatar-circle ant-avatar-icon mr-1" >
                                        <img src={this.props.session.getCurrentUser.profileImage} alt="profileImage" />
                                    </span>
                                    <strong> {this.props.session.getCurrentUser.userName}</strong>
                                </Link>
                            </Dropdown>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}

export default ProfileHeader;