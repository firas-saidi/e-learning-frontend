import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Popover, Button } from 'antd';


class MainNav extends Component {
  state = {
    dropdownOpen: false,
    isOpen: false
  }
  togglle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter = () => {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave = () => {
    this.setState({ dropdownOpen: false });
  }
  render() {
    const text = <span>Title</span>;
    const content = (
      <div>
        <p><Link to="/courses" className="anchor-grey">Courses</Link></p>
        <p className="anchor-grey"><Link to="/bootcamp" className="anchor-grey">Online Bootcamp </Link></p>
      </div>
    );
    return (
      <div className="container-fluid">
        <Navbar color="transparent" light expand="md">
          <Link className="logo" to="/">Levelup Space</Link>
          <NavbarToggler onClick={this.togglle} className="navbar-dark" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/about">About</Link>
              </NavItem>
              <Popover placement="bottom" title={text} content={content}>
                <Button>Courses</Button>
              </Popover>
              <NavItem>
                <Link to="/blog">Blog</Link>
              </NavItem>
              <NavItem>
                <Link to="/contact">Contact</Link>
              </NavItem>
             
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MainNav;

