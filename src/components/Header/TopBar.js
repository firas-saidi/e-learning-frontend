import React, { Component } from 'react';
import { Link } from 'react-router-dom';




class TopBar extends Component {
    render() {
        return (
            <div className="topnav navbar nav navbar-expand-sm" >
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item"><i className="far fa-calendar"></i>   MON - FRI : 9.00AM - 06.00PM</li>
                        <li className="nav-item"><i className="fas fa-phone-volume"></i>  +(216) 54 723 008</li>
                        <li className="nav-item"><i className="far fa-envelope"></i>  admin@levelupspace.com</li>
                    </ul>
                    <ul className="navbar-nav nav navbar-right">
                        <li className="nav-item fas fa-lock"></li>
                        <li className="nav-item"><Link className="auth" to="/register">Register</Link></li>
                        <li className="nav-item"><Link className="auth" to="/login">Login</Link></li>
                    </ul>
                </div>
            </div>
        );
    };
}


export default TopBar;