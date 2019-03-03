import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import {  Redirect } from 'react-router'

class NavbarProfile extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        if(this.props.userType=="mainAdmin"){
            return (
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Library</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/admin_page">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/admin_control">Admin settings</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/upload">Game settings</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/statistics">Statistics</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            );
        }
        else{
            return (
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Library</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/admin_page">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/upload">Game settings</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/statistics">Statistics</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            );
        }
    }
}

export default NavbarProfile;