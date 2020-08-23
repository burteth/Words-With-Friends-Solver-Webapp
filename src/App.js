import React from 'react';
import NavBarCustom from './components/NavBarCustom';
import {
	BrowserRouter,
    Switch,
	Route,
} from "react-router-dom";

import Login from './pages/Login.js'
import Games from './pages/Games.js'
import NewAccount from './pages/NewAccount.js'
import Home from './pages/Home.js'
import main from './DictTrie/LoadTrie';



export class App extends React.Component {
	constructor(){
		super()
		this.state = {
			loading: true,
			isLoggedIn: false,
			email: '',
			gameData: {"Game1": {'hand':[], 'tiles':[]}},
			currentGame : "",
			trie : {},
			tutorial: true
			};

	}

	

	componentDidMount() {

		main().then( (resp) => {
			this.setState({
				trie : resp
			})			
		});

		this.setState({
			loading: false,
			isLoggedIn: false
			});

		
	}

	updateState(changes) {
		this.setState(changes);
	}

	async updateGameData(payload){


		{/*
		Input:
			ex)
				{
					"type":"editGame",
					"gameData":{
						"Game1":{
							"hand":"bontbre",
							"tiles":"112E-113T-114H-115A-116N-117B-118U-119R-134T-130Q-145Q-160S-175D-190Q"
						},
						"Game2":{
							"hand":"",
							"tiles":""
						}
					}
				}


			*/}
		
		//If user is not logged then dont update the game data
		if (!this.state.isLoggedIn){
			return;
		}


		console.log('UPDATE GAME DATA');
		console.log(payload);
		console.log();
		
		try{

			const url = 'https://wwf-backend-server-api.sloppy.zone/update';
			const res = await fetch(url, {
				method: 'post',
				headers: {
					'Accept': 'application/json, text/plain',
					'Content-Type': 'application/json'
				},
				body : JSON.stringify({
					email: this.state.email,
					payload: payload
				})

			});

			let result = await res.json();
			if (result && result.success) {

				console.log('UPDATE GAME DATA RESULT');
				console.log(result);
				console.log();

			}

			else if (result && result.success === false){
				alert(result.msg);
			}

			}
			
		catch(e) {
			console.log(e);
		}

	}


	render() {
		return (
			<div>
				<BrowserRouter>

					<NavBarCustom  
						userLoggedIn={this.state.isLoggedIn} 
						email={this.state.email} 
						updateState={this.updateState.bind(this)}
					/>
					
					<Switch>
					
						<Route path="/login">
							
							<Login onUpdate={this.updateState.bind(this)} />
						</Route>

						<Route path="/createaccount">
							<NewAccount onUpdate={this.updateState.bind(this)}/>
						</Route>

						<Route path="/games">
							<Games 
								gameData={this.state.gameData} 
								onUpdate={this.updateState.bind(this)}
								updateGameData={this.updateGameData.bind(this)}
							/>
						</Route>

						<Route path="/">
							<Home 
								gameData={this.state.gameData} 
								currentGame={this.state.currentGame}
								updateGameData={this.updateGameData.bind(this)}
								isLoggedIn={this.state.isLoggedIn}
								trie={this.state.trie}
								tutorial={this.state.tutorial}
								updateState={this.updateState.bind(this)}
							/>
						</Route>



					</Switch>
        		</BrowserRouter>
			</div>
		);
	}
}

export default App;





