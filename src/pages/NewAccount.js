import React from 'react';
import {decodeGameData} from '../helperFunctions/ProcessData'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { withRouter } from 'react-router-dom';




export class NewAccount extends React.Component {
	constructor(props){

		super(props);
			this.state = {
				firstName: '',
				lastName: '',
				email: '',
      			password: '',
        		retypedPassword: '',
				ButtonDisabled: false,
		}
	}

	setInputValue(property, val, limit = 12) {
		val = val.trim();
		if (val.length > limit){
			return;
		}
		this.setState({
			[property]: val
		});
	}

	resetForm() {
		this.setState({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			retypedPassword: '',
			ButtonDisabled: false,
		});
	}

	async createAccount() {

		if (
			!this.state.firstName || 
			!this.state.lastName || 
			!this.state.email || 
			!this.state.password || 
			!this.state.retypedPassword
		){
			return;
		}

		if (this.state.password !== this.state.retypedPassword){
		alert('Passwords do not match')
				return;
		}

		this.setState({
			ButtonDisabled: true
		})


		try{
			
			const url = 'https://wwf-backend-server-api.sloppy.zone/newacc';
			const res = await fetch(url, {
				method: 'post',
				headers: {
					'Accept': 'application/json, text/plain',
					'Content-Type': 'application/json'
				},
				body : JSON.stringify({
					first: this.state.firstName,
					last: this.state.lastName,
					email: this.state.email,
					password: this.state.password
				})
			});

			let result = await res.json();
			if (result && result.success) {

				console.log(result)

				this.props.onUpdate({
					'isLoggedIn': true,
					'email': result.email,
					'loading': false,
					'gameData': decodeGameData(JSON.parse(result.gameData))
				});
				this.setState({ButtonDisabled :false})
				this.props.history.push('/home');

			}

			else if (result && result.success === false){
				this.resetForm();
				alert(result.msg);
				this.setState({ButtonDisabled :false})
			}

		}
			
		catch(e) {
			console.log(e);
			this.resetForm();
		}
				
	}



	render() {
		return (
			<Container>
				<div className="auth-inner">
					<form>
						<h3 className="loginHeader">Sign Up</h3>

						<Row xs="1" sm="2"> 
							<Col>
								<div className="form-group">
									<label>First name</label>
									<input 
										type="text" 
										className="form-control" 
										placeholder="First name" 
										value={this.state.firstName ? this.state.firstName : ''}
										onChange={ (e) => this.setInputValue('firstName', e.target.value) }
									/>
								</div>
							</Col>
							<Col>
								<div className="form-group">
									<label>Last name</label>
									<input 
										type="text" 
										className="form-control" 
										placeholder="Last name" 
										value={this.state.lastName ? this.state.lastName : ''}
										onChange={ (e) => this.setInputValue('lastName', e.target.value) }
									/>
								</div>
							</Col>
						</Row>

						


						<div className="form-group">
							<label>Email address</label>
							<input 
								type="email" 
								className="form-control" 
								placeholder="Enter email" 
								value={this.state.email ? this.state.email : ''}
								onChange={ (e) => this.setInputValue('email', e.target.value, 35 ) }
							/>
						</div>

						<div className="form-group">
							<label>Password</label>
							<input 
								type="password" 
								className="form-control" 
								placeholder="Enter password" 
								value={this.state.password ? this.state.password : ''}
								onChange={ (e) => this.setInputValue('password', e.target.value) }
							/>
						</div>

						<div className="form-group">
							<label>Confirm Password</label>
							<input 
								type="password" 
								className="form-control" 
								placeholder="Confirm password" 
								value={this.state.retypedPassword ? this.state.retypedPassword : ''}
								onChange={ (e) => this.setInputValue('retypedPassword', e.target.value) }
							/>
						</div>

						<button 
							type="submit" 
							className="btn btn-primary btn-block"
							disabled={this.state.ButtonDisabled}
                    		onClick={ () => this.createAccount() }
						>
							Submit
						</button>
					</form>
				</div>
			</Container>
		);
	}
}

export default withRouter(NewAccount);