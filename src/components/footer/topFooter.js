import React from 'react';
import { Link } from "react-router-dom";

const TopFooter = () => {
    return (
        <div className="socialMediaBox">
            <div className="container">
                <p>FOLLOW US ON</p>
                <Link to="" target="_blank" className="socialMedia"><i className="fab fa-facebook-f"></i></Link>
                <Link to="" target="_blank" className="socialMedia"><i className="fab fa-twitter"></i></Link>
                <Link to="" target="_blank" className="socialMedia"><i className="fab fa-google-plus-g"></i></Link>
                <Link to="" target="_blank" className="socialMedia"><i className="fab fa-instagram"></i></Link>
                <Link to="" target="_blank" className="socialMedia"><i className="fab fa-pinterest"></i></Link>
                <div className="newsLetter">
                    <input type="text" placeholder="Enter your email to join our newsletter" />
                    <button>JOIN</button>
                </div>
            </div>
        </div>
    );
};

export default TopFooter;