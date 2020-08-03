import React from "react";


export default class DashTile extends React.Component {
  handleDashInput(e){
	  
	this.props.updateHand(this.props.pos, e.target.value);
	e.target.placeholder = e.target.value.slice(-1).toUpperCase();
    e.target.value = "";

  }
  createTile()
	{
		var handContent = this.props.content.replace(/\s/g, '')
		if ( handContent === '' ){
			return (
				<input 
					className="tile dash" 
					id="generic" 
					onChange={this.handleDashInput.bind(this)} 
					placeholder=''
				></input>
			)
		}else{
			return(
				<input 
					className="tile dash" 
					id="activeWord" 
					placeholder={this.props.content}
					onChange={this.handleDashInput.bind(this)} 
				></input>
			)
		}
  }

  render(){
    return(
		<div className="tile">
			{this.createTile()}
		</div>
    );

  }

}
