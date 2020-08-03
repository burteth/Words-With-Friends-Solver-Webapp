import React from 'react';
import {decodeGameData} from '../helperFunctions/ProcessData'
import Container from 'react-bootstrap/Container';
import { withRouter } from "react-router-dom";




export class Login extends React.Component {
	constructor(props){

		super(props);
			this.state = {
				email: '',
				password: '',
				ButtonDisabled: false,
		}
	}

	setInputValue(property, val) {
		val = val.trim();
		if (val.length > 12){
			return;
		}
		this.setState({
			[property]: val
		});
	}

	resetForm() {
		this.setState({
			email: '',
			password: '',
			buttonDisabled: false
		});
	}

	async doLogin() {

		 if (!this.state.email){
			 return;
		 }
		 if (!this.state.password){
			return;
		}

		this.setState({
			ButtonDisabled: true
		})


		try{
			
			const url = 'https://wwf-backend-server-api.sloppy.zone/login';
			const res = await fetch(url, {
				method: 'post',
				headers: {
					'Accept': 'application/json, text/plain',
					'Content-Type': 'application/json'
				},
				body : JSON.stringify({
					email: this.state.email,
					password: this.state.password
				})
			});

			let result = await res.json();
			if (result && result.success) {

				this.props.onUpdate({
					'isLoggedIn': true,
					'email': result.email,
					'loading': false,
					'gameData': decodeGameData(JSON.parse(result.gameData))
				});
				this.props.history.push('/games');
			
			}

			else if (result && result.success === false){
				this.resetForm();
				alert(result.msg);
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
						<h3 className="loginHeader">Sign In</h3>

						<div className="form-group">
							<label>Email address</label>
							<input 
								type="email" 
								className="form-control" 
								placeholder="Enter email" 
								value={this.state.email ? this.state.email : ''}
								onChange={ (e) => this.setInputValue('email', e.target.value) }
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

						<button 
							type="submit" 
							className="btn btn-primary btn-block"
							disabled={this.state.ButtonDisabled}
                    		onClick={ () => this.doLogin() }
						>
							Submit
						</button>
					</form>
				</div>
			</Container>
		)
	}
}

export default withRouter(Login);

