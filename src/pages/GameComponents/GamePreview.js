import React from 'react';
import {indexToPos} from '../../helperFunctions/MiscHelper';



class GamePreview extends React.Component{

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

        for (var i = 0; i < this.props.tiles.length; i++){
            var pos = indexToPos(this.props.tiles[i][0]);
            colNum = pos['col'];
            rowNum = pos['row'];
            layout[rowNum][colNum] = this.props.tiles[i][1];
        }
        
        for (i = 0; i < 15; i++) {
            rowList.push( previewRow( layout[i], i ) );
            
        }
        return rowList;
      }


  render () {

    return (
		<div id="gamePreview">
            {this.createBoard()}
		</div>

    );     

  }
}

export default GamePreview;


function previewRow(rowList, rowNum) {

    var tileList = [];
    var out;
    for (var i = 0; i < 15; i++) {

        if (rowList[i] === ""){
            out = [<div key={"tile"} className="previewTile" id="generic">{rowList[i]}</div>]
		}else if (rowList[i] === "DL"){
            out =  [<div key={"tile"} className="previewTile" id="doubleLetter">{rowList[i]}</div>]
		}else if (rowList[i] === "TL"){
            out =  [<div key={"tile"} className="previewTile" id="tripleLetter">{rowList[i]}</div>]
		}else if (rowList[i] === "DW"){
            out =  [<div key={"tile"} className="previewTile" id="doubleWord">{rowList[i]}</div>]
		}else if (rowList[i] === "TW"){
            out =  [<div key={"tile"} className="previewTile" id="tripleWord">{rowList[i]}</div>]
        }else if (rowList[i] === "+"){
            out = [<div key={"tile"} className="previewTile" id="center">{rowList[i]}</div>]
        }else{
            out =  [<div key={"tile"} className="previewTile" id="activeWord">{rowList[i]}</div>]
		}
        tileList.push(out);
    }
        return (
            <div className="previewRow" key={rowNum}>
                {tileList}
            </div>
        );

    }