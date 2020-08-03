import React from "react";
import Row from "./Row"
import {indexToPos} from '../../helperFunctions/MiscHelper';


export default class Board extends React.Component {

  createBoard() {
    var rowList = [];
	var layout = [['', '', '', 'TW', '', '', 'TL', '', 'TL', '', '', 'TW', '', '', ''],
				['', '', 'DL', '', '', 'DW', '', '', '', 'DW', '', '', 'DL', '', ''],
				['', 'DL', '', '', 'DL', '', '', '', '', '', 'DL', '', '', 'DL', ''],
				['TW', '', '', 'TL', '', '', '', 'DW', '', '', '', 'TL', '', '', 'TW'],
				['', '', 'DL', '', '', '', 'DL', '', 'DL', '', '', '', 'DL', '', ''],
				['', 'DW', '', '', '', 'TL', '', '', '', 'TL', '', '', '', 'DW', ''],
				['TL', '', '', '', 'DL', '', '', '', '', '', 'DL', '', '', '', 'TL'],
				['', '', '', 'DW', '', '', '', '+', '', '', '', 'DW', '', '', ''],
				['TL', '', '', '', 'DL', '', '', '', '', '', 'DL', '', '', '', 'TL'],
				['', 'DW', '', '', '', 'TL', '', '', '', 'TL', '', '', '', 'DW', ''],
				['', '', 'DL', '', '', '', 'DL', '', 'DL', '', '', '', 'DL', '', ''],
				['TW', '', '', 'TL', '', '', '', 'DW', '', '', '', 'TL', '', '', 'TW'],
				['', 'DL', '', '', 'DL', '', '', '', '', '', 'DL', '', '', 'DL', ''],
				['', '', 'DL', '', '', 'DW', '', '', '', 'DW', '', '', 'DL', '', ''],
				['', '', '', 'TW', '', '', 'TL', '', 'TL', '', '', 'TW', '', '', '']];
    var rowNum;
	var colNum;
	var pos;
    for (var i = 0; i < this.props.tiles.length; i++){

		pos = indexToPos(this.props.tiles[i][0]);
		colNum = pos['col'];
      	rowNum = pos['row'];
		layout[rowNum][colNum] = this.props.tiles[i][1];

	}

	for (i = 0; i < this.props.highlighted.length; i++){

		pos = indexToPos(this.props.highlighted[i][0]);
		colNum = pos['col'];
		rowNum = pos['row'];
		
		layout[rowNum][colNum] = this.props.highlighted[i][1];

	}

    for (i = 0; i < 15; i++) {
		
        rowList.push(
			<Row 
				key={"Row " + i.toString()} 
				rowNum={i} rowChars={layout[i]} 
				handleInput={this.props.handleInput} 
				highlighted={this.props.highlighted}
			/>
		);
    }
    return rowList;
  }

  render(){

    return(
		<div id="board">
      		{this.createBoard()}
      	</div>
    );

  }

}
