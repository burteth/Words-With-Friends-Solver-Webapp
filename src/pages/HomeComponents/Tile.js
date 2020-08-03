import React from "react";


export default class Tile extends React.Component {
  
  handleUserInput(e){
		this.props.handleInput(this.props.pos[0], this.props.pos[1], e.target.value.toUpperCase());
		e.target.value = "";
  	}	
  	createTile()
	{
		var tileType = this.props.type.replace(/\s/g, '');
		var tileClass;

		if (tileType[0] === "_"){
			tileClass = "tile highlighted";
			tileType = tileType[1];
		}else{
			tileClass = "tile";
		}

		var out;

		if (tileType === ""){
			out = [<input key={"tile"} className={tileClass} id="generic" placeholder=" " onChange={this.handleUserInput.bind(this)} value={tileType}></input>]
		}else if (tileType === "DL"){
			out = [<input key={"tile"} className={tileClass} id="doubleLetter" placeholder="DL" onChange={this.handleUserInput.bind(this)} ></input>]
		}else if (tileType === "TL"){
			out = [<input key={"tile"} className={tileClass} id="tripleLetter" placeholder="TL" onChange={this.handleUserInput.bind(this)} ></input>]
		}else if (tileType === "DW"){
			out = [<input key={"tile"} className={tileClass} id="doubleWord" placeholder="DW" onChange={this.handleUserInput.bind(this)}></input>]
		}else if (tileType === "TW"){
			out = [<input key={"tile"} className={tileClass} id="tripleWord" placeholder="TW" onChange={this.handleUserInput.bind(this)} ></input>]
		}else if (tileType === "+"){
			out = [<input key={"tile"} className={tileClass} id="center" placeholder="+" onChange={this.handleUserInput.bind(this)} ></input>]
		}else{
			out = [<input key={"tile"} className={tileClass} id="activeWord" placeholder={tileType} onChange={this.handleUserInput.bind(this)}></input>]
		}
		return out
	}

  render(){

    return(
      	<div className="tile">
      		{this.createTile()}
      	</div>
    );

  }

}
