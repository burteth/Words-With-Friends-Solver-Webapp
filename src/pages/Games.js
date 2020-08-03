import React from 'react';
import EmptyGameSquare from './GameComponents/EmptyGameSquare'
import GameSquare from './GameComponents/GameSquare'
import {encodeGameData} from '../helperFunctions/ProcessData';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from "react-router-dom";



var GAMES_LIMIT = 100;
export class Games extends React.Component {
	constructor(){
		super()

		this.state = {
			show : false,
			gameName : '',
			edit : {}
		}
	}

	openModal(typeObj) {
		this.setState({
			show : true,
			edit : typeObj
		})
		
	}

	

	closeModal() {

		this.setState({show : false})
		var gameData = this.props.gameData;

		if (this.state.edit.type === "NewGame"){
			gameData[this.state.gameName] = {'hand':[],'tiles':[]};
		}else if (this.state.edit.type === "EditName"){

			gameData[this.state.gameName] = gameData[this.state.edit.name];
			delete gameData[this.state.edit.name];

		}
		
		this.props.onUpdate({
			"gameData": gameData
		})

		this.props.updateGameData({
			'type':'editGame', 
			'gameData': encodeGameData(gameData)
		});

	}


	updateGameNameInput(e){
		
		var val = e.target.value;
		val = val.trim();
		if (val.length > 12){
			return;
		}
		this.setState({
			gameName : val
		});
		
	}

	checkEnter(e){
		if(e.key === 'Enter'){
			this.closeModal()
		}
		
	}
	chooseGame() {

		var curGames = this.props.gameData;
		var gameComp = [];


		Object.keys(curGames).map(key => 
			gameComp.push(
				<GameSquare
					key={key}
					title={key} 
					hand={curGames[key]['hand']} 
					tiles={curGames[key]['tiles']}
					onUpdate={this.props.onUpdate}
					deleteGame={this.deleteGame.bind(this)}
					openModal={this.openModal.bind(this)}
					goHome={this.goHome.bind(this)}
				/>
			)
		)
		if (gameComp.length < GAMES_LIMIT){
			gameComp.push(
				<EmptyGameSquare
					key="empty"
					onUpdate={this.props.onUpdate} 
					createNewGame={ () => this.createNewGame.bind(this) }
				/>
			);	
		}

		return gameComp;

	}

	createNewGame(){

		if (this.props.gameData.length >= GAMES_LIMIT){
			alert("Too many games")
			return;
		}
		this.setState({
			show : true,
			edit : {type:"NewGame"}
		})
		
	
		

	}

	deleteGame(name){
		var currentGames = this.props.gameData;

		delete currentGames[name];

		this.props.onUpdate({
			'gameData':currentGames
		});

		this.props.updateGameData({
			'type':"editGame", 
			'gameData': encodeGameData(currentGames)
		});

	}

	goHome(){
		this.props.history.push('/')
	}

	render() {
		return (
			<div id="gamesContainer">
				<Modal show={this.state.show} onHide={() => this.setState({show:false})}>

					<Modal.Header closeButton>
						<Modal.Title>Opponent's Name</Modal.Title>
					</Modal.Header>

					<Modal.Body>

					<div className="input-group mb-3">
						<input 
							type="text"
							className="form-control" 
							placeholder="Oponnent's Name" 
							aria-label="Oponnent's Name" 
							aria-describedby="basic-addon2"
							id="gameNameInput"
							onChange={ (e) => this.updateGameNameInput(e)}
							onKeyDown={ (e) => this.checkEnter(e)}
							value={this.state.gameName ? this.state.password : ''}
						>
						</input>
						<div className="input-group-append">
							<button 
								className="btn btn-primary" 
								type="submit" 
								id="gameNameBtn" 
								onClick={ () => this.closeModal()}
							>
								Submit
							</button>
						</div>
					</div>


					</Modal.Body>

				</Modal>
				{this.chooseGame()}
			</div>
		);
	}
}

export default withRouter(Games);
