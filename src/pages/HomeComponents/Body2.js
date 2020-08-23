import React from "react";
import Board from "./Board.js"
import DashBoard from "./DashBoard.js"
import SolutionBox from "./SolutionBox.js"


export default class Body extends React.Component {

	render(){
		return(

		<div id="bodyContainer">

			<div id="buttonContainer">
				<button onClick={this.props.findOptimal}>Find Optimal</button>
			</div>

			<div id="boardAndBox">
				<SolutionBox 
					handleHover={this.props.handleHover}
					potientialWords={this.props.potientialWords} />
				
				<div id="boardandDash">
					<div id="board">
						<Board 
							tiles={this.props.tiles}
							handleInput={this.props.handleInput}
							highlighted={this.props.highlighted}
						/>
					</div>
					<DashBoard 
						hand={this.props.hand}
						updateHand={this.props.updateHand}
					/>
				</div>
			</div>

		</div>
		);

	}

}
