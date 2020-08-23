import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import NavBarButtons from './NavBarButtons'


export class NavBarCustom extends React.Component {

	render() {
		return (
			<div>

				<Navbar variant="dark" bg="dark" expand="sm">

                    <LinkContainer to="/">
					    <Navbar.Brand >Words with Friends Solver </Navbar.Brand>
                    </LinkContainer>


					<Navbar.Toggle aria-controls="responsive-navbar-nav" />

					<NavBarButtons userLoggedIn={this.props.userLoggedIn} updateState={this.props.updateState}/>

				</Navbar>

			</div>
		);
	}
}


export default NavBarCustom;
