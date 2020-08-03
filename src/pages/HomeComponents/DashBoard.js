import React from "react";
import DashTile from "./DashTile"

export default class DashBoard extends React.Component {

  createDash() {
	var tileList = [];
	
    for (var i = 0; i < this.props.hand.length; i++) {

        tileList.push(
			<DashTile 
				key={"DashBoardTile " + i.toString()} 
				pos={i} content={this.props.hand[i]} 
				updateHand={this.props.updateHand} 
			/>
		);
	  }
	  
    for (var j = this.props.hand.length; j < 7; j++){

     	tileList.push(
			<DashTile 
				key={"DashBoardTile " + j.toString()} 
				pos={j} content={''} 
				updateHand={this.props.updateHand} 
			/>
		);

	}
	
    return tileList;
  }

  render(){
    return(
      <div id="dashboard">
      {this.createDash()}
      </div>
    );

  }

  }
