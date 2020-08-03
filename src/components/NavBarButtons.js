import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';


export class NavBarButtons extends React.Component {

	render() {

        if (this.props.userLoggedIn){
            return(
                <Navbar.Collapse className="justify-content-end">
                    
                    <Nav className="mr-auto">
                        <LinkContainer to="/games">
                                <Nav.Link>Games</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    {/*<Button 
                        onClick={() => this.props.updateState(
                            {    
                                loading: false,
                                isLoggedIn: false,
                                username: '',
                                gameData: ''
                            })
                        }
                    > 
                        Logout 
                    </Button>

                    <Navbar.Text>
                        {this.props.username}
                    </Navbar.Text>*/}

                </Navbar.Collapse>
            )
        }
        else{
            return(
                <Navbar.Collapse className="justify-content-end" variant="dark" bg="dark">
                    <Nav className="mr-auto">
                        <LinkContainer to="/login">
                            <Nav.Link variant="light">Login</Nav.Link>
                        </LinkContainer>

                        <LinkContainer  to="/createaccount">
                            <Nav.Link>Create Account</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            )
        }
	}
}


export default NavBarButtons;
