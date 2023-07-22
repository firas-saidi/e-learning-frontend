import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TopFooter from './topFooter';
import BottomFooter from './BottomFooter';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <TopFooter />
                <div className="sectionContainer">
                    <div className="footersection container">
                        <div className="row">
                            <div className="col">
                                <p className="footerSectionTitle">CUSTOMER CARE</p>
                                <ul className="navbar-nav">
                                    <li className="nav-item"><Link to="/help">Help Center</Link></li>
                                    <li className="nav-item"><Link to="/faq">FAQ</Link></li>
                                    <li className="nav-item"><Link to="/how-to-buy">How To Buy</Link></li>
                                    <li className="nav-item"><Link to="/delivery">Delivery</Link></li>
                                </ul>
                            </div>
                            <div className="col">
                                <p className="footerSectionTitle">ABOUT US</p>
                                <ul className="navbar-nav">
                                    <li className="nav-item"><Link to="/our-story">Our Stories</Link></li>
                                    <li className="nav-item"><Link to="/press">Press</Link></li>
                                    <li className="nav-item"><Link to="/career">Career</Link></li>
                                    <li className="nav-item"><Link to="/contact">Contact</Link></li>
                                </ul>
                            </div>
                            <div className="col">
                                <p className="footerSectionTitle">MY ACCOUNT</p>
                                <ul className="navbar-nav">
                                    <li className="nav-item"><Link to="/login">Login</Link></li>
                                    <li className="nav-item"><Link to="/cart">My Cart</Link></li>
                                    <li className="nav-item"><Link to="/order-history">Order History</Link></li>
                                    <li className="nav-item"><Link to="/checkout">Payment</Link></li>
                                </ul>
                            </div>
                            <div className="col-4">
                                <p className="footerSectionTitle story">OUR STORES</p>
                                <ul className="navbar-nav contactAdress">
                                    <li className="nav-item"><i className="fas fa-map-marker-alt"></i>Tunisia,Bizert,Menzel-Bourguiba </li>
                                    <li className="nav-item"><i className="fas fa-phone"></i>+216 50 091 452</li>
                                    <li className="nav-item"><i className="far fa-envelope"></i>Levelup@help.com</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomFooter />
            </div>
        );
    }
}

export default Footer;