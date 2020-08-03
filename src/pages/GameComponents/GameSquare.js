import React from 'react';
import GamePreview from './GamePreview';


class GameSquare extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			tileHover: false,
			titleHover: false,
			editHover: false
		
		}
	}
	selectGame(){
		if (this.state.editHover){

			this.props.openModal({
				"type": "EditName",
				"name" :  this.props.title
			});

		}else{

			this.props.onUpdate({ "currentGame" : this.props.title })
			this.props.goHome();

		}
		
	}


  render () {

	var linkStyle;
	if (!this.state.hover) {
	  linkStyle = {display: 'none'}
	}
	
	var editHover;
	if (!this.state.titleHover){
		editHover = {display: 'none'}
	}

    return (
		<div className="gameSquareContainer">

			<button 
				className="gameSquare active" 
				onClick={ () => this.selectGame()}
				onMouseEnter={() => this.setState({hover: true})} 
				onMouseLeave={() => this.setState({hover: false})} 
			>
				

				<div 
				className="gameTitle"
				onMouseEnter={() => this.setState({titleHover: true})} 
				onMouseLeave={() => this.setState({titleHover: false})} 
				>
					{this.props.title}

					<div 
						style={editHover} 
						id='editBtn'
						className="fas fa-pen circle"
						onMouseEnter={() => this.setState({titleHover: true, editHover: true})} 
						onMouseLeave={() => this.setState({titleHover: false, editHover: false})} 
					>
							
					</div>

				</div>
				<GamePreview tiles={this.props.tiles}/>
				
			</button>
			<button 
				style={linkStyle} 
				id='delBtn'
				className="fas fa-times-circle"
				onMouseEnter={() => this.setState({hover: true})} 
				onMouseLeave={() => this.setState({hover: false})} 
				onClick={ () => this.props.deleteGame(this.props.title) }
				>
					
			</button>
	

		</div>

    );     

  }
}

export default GameSquare;
