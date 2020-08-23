import React from 'react';
import {posToIndex} from '../helperFunctions/MiscHelper';
import {encodeGameData} from '../helperFunctions/ProcessData';

import Board from "./HomeComponents/Board";
import DashBoard from "./HomeComponents/DashBoard";
import MobileSolutionBox from "./HomeComponents/MobileSolutionBox";
import Tutorial from './HomeComponents/Tutorial';


export class Home extends React.Component {

	constructor(props){
		super(props)
		
		this.state = {
			tiles : [],
			hand : [],
			potientialWords : [],
			ButtonDisabled : false,
			highlighted : {},
			tutorialState : 0
		}

		{/*Data formats
			tiles: 
				first item in each list is the index and second is the letter
				ex) [[123, "A"],[66, "B"]...]
			hand:
				string of letters
				ex) "absjhdh"
			potentialWords:
				list of objects
				ex)[{
						"start": [7,7], 
						"Vertical": true, 
						"score": 100, 
						"word": "ethan"
					},{
						"start": [1,7], 
						"Vertical": false, 
						"score": 100, 
						"word": "etaan"
					}]
			highlighted:
			first item in each list is the index and second is the letter
				ex) [[123, "A"],[66, "B"]...]*/
		}

	}

	componentDidMount(){


		var gameName;
		if (this.props.currentGame === ""){
			var keys = Object.keys(this.props.gameData)
			gameName = keys[0];
		}else{
			gameName = this.props.currentGame;
		}
	
		var adjustedhand = this.props.gameData[gameName]['hand'];
		for (var i = adjustedhand.length; i < 8; i++){
			adjustedhand.push('');
		}
		this.setState({
			hand : adjustedhand,
			tiles : this.props.gameData[gameName]['tiles']
		})
	}

	handleTileInput(rowNum, colNum, letter) {
		if (this.state.potientialWords.length !== 0){
			this.setState({
				potientialWords : [],
				highlighted : {}
			});
		}
		var curTiles = this.state.tiles;
		for (var i = 0; i < curTiles.length; i++){
			if (curTiles[i][0] === posToIndex( rowNum, colNum )){
				
				
				if (letter === "" || letter === " "){
					curTiles.splice(i,1);
					this.setState({ tiles: curTiles });
					return;
				}
				
				curTiles[i][1] = letter
				this.setState({ tiles: curTiles });
				return;
			}
		}

		if (letter !== "" && letter !== " "){
			curTiles.push([posToIndex( rowNum, colNum ), letter ]);
			this.setState({ tiles: curTiles });
		}
		

		return;

	}

	handleHover(wordId) {
		
		//Handle the user hovering over a potiential word
		if (wordId === -1){
			this.setState({
				highlighted : []
			});
			return;
		}
		

		var highlightedWord = this.state.potientialWords[wordId];
		
		var highlighedWordList = [];
		var curPos = [highlightedWord['col'], highlightedWord['row']];

		//Update the highlighted word list
		for (var i = 0; i < highlightedWord['word'].length; i++) {

			highlighedWordList.push(
				[ this.makeIndex(curPos), "_".concat(highlightedWord['word'][i]) ]
			);

			if ( highlightedWord["isVertical"] ){
				curPos[1] += 1;
			}else{
				curPos[0] += 1;
			}
		}
		
		
		//Set highlighted state
		this.setState({
			highlighted : highlighedWordList
		});

		/*
		if ( highlightedWord["isVertical"] ){
			curPos[1] -= highlightedWord['word'].length;
		}else{
			curPos[0] -= highlightedWord['word'].length;
		}
		*/
	}

	handlePotientialWordFill(index){

		var gameTiles = this.state.tiles;
		var newWord = this.state.potientialWords[index];
		var curRow = newWord.row;
		var curCol = newWord.col;



		for (var i = 0; i < newWord.word.length; i++){
			gameTiles.push([
				curRow * 15 + curCol,
				newWord.word[i].toUpperCase()
			]);
			curRow += newWord.isVertical;
			curCol += !newWord.isVertical;

		}
		
		this.setState({ 
			tiles : gameTiles,
			potientialWords : [],
			highlighted : {}
		});

		if (this.props.isLoggedIn){

			this.props.updateGameData({
				type : 'editGame',
				gameData : encodeGameData(this.props.gameData)
			});

		}
		
	}

	makeIndex(position){
		var index = position[1]*15 + position[0];
		return index;
	  }

	async findOptimal() {

		this.setState({
			ButtonDisabled: true
		})

		
		
		this.setState({
			potientialWords : this.props.trie.findOptimal(this.state.tiles, this.state.hand)
		});
		

		if (this.props.isLoggedIn){
			
			this.props.updateGameData({
				type : 'editGame',
				gameData : encodeGameData(this.props.gameData)
			});

		}
		
				
	}

	updateHand( position, value ){

		if (this.state.potientialWords.length !== 0){
			this.setState({
				potientialWords : [],
				highlighted : {}
			});
		}

		var currentHand = this.state.hand;
		currentHand[position] = value;
		this.setState({
			hand: currentHand
		})
		
	}

	tutorialHelper() {
		if (this.props.tutorial){
			return(
				<Tutorial
					updateState={this.props.updateState}
				/>
			)
		}return;

	}

	render() {
		return (
			<div id="bodyContainer">
				{this.tutorialHelper.bind(this)()}
				<div id="boardandDash">
					<Board 
						tiles={this.state.tiles}
						handleInput={this.handleTileInput.bind(this)}
						highlighted={this.state.highlighted}
					/>
					<DashBoard 
						hand={this.state.hand}
						updateHand={this.updateHand.bind(this)}
					/>
					{this.state.potientialWords.length === 0 ?
						<div id="buttonContainer">
							<button id="findOptimalButton" onClick={this.findOptimal.bind(this)}>Find Solutions</button>
						</div>
						: 
						<MobileSolutionBox 
							handleHover={this.handleHover.bind(this)}
							potientialWords={this.state.potientialWords} 
							handlePotientialWordFill={this.handlePotientialWordFill.bind(this)}
						/>
					}
					
				</div>
			</div>
		);
	}
	
}

export default Home;