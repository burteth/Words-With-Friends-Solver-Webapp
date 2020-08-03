import React from "react";
import Tile from "./Tile"


export default class Row extends React.Component {

	createRow() {
		var tileList = [];
		var key;


		for (var i = 0; i < 15; i++) {
			key = this.props.rowNum * 15 + i;

			tileList.push(
				<Tile 
					key={ "Tile ".concat( key.toString() )} 
					pos={[this.props.rowNum,i]} 
					type={this.props.rowChars[i]} 
					handleInput={this.props.handleInput}
				/>
			);
		}
		return tileList;
		}


		render(){
			
			return(
				<div className="rowComp">
					{this.createRow()}
				</div>
		);
		

	}

}
