import React from 'react';
import { Link } from "react-router-dom";

const BottomFooter = () => {
    return (
        <div className="footernav">
            <div className="navbar navbar-expand-sm">
                <div className="container bottomNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">©2021 Levelup Space</li>
                        <li className="nav-item">Terms & Condition</li>
                        <li className="nav-item"><Link to="/Privacy-Policy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BottomFooter;