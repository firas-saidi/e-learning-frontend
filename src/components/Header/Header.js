import React, { Component } from 'react';
import TopBar from './TopBar';
import MainNav from './MainNav';

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <TopBar />
                <header>
                    <MainNav />
                </header>
            </React.Fragment>
        );
    }
}

export default Header;