
/*
Decode:

    Input:
        string of occupied tiles
            ex) "1A-15V-199D"...
    Output:
        Array of Tupeles
            ex) [ [1, "A"], [15, "V"], [199, "D"] ]
*/        

function decodeHand(handString){
    return(handString.split(""))
}

function decodeTiles(tileString){
    if (!tileString.length){
        return([]);
    }
    var splitTileArray = tileString.split("-");
    var occupiedList = [];

    for (var i = 0; i < splitTileArray.length; i++){
        occupiedList.push( [ parseInt (splitTileArray[i].slice(0,-1), 10 ), splitTileArray[i].slice(-1) ] )
    }
    return(occupiedList)
}

export function encodeTiles(tileArray){

    var tiles = tileArray;
    var tileString = ""

    for (var i = 0; i < tiles.length; i++) {

		var number = zeroFill(tiles[i][0], 3);
		tileString = tileString.concat(number.toString().concat(tiles[i][1]));

		if (i !== tiles.length - 1){

			tileString = tileString.concat("-");

		}
    }
	return(tileString)
}

export function encodeHand(handArray){
	
	return(handArray.join(''))
}


export function decodeGameData(gameData){
    var organizedData = {};

    Object.keys(gameData).map((key, index) => ( 

        organizedData[key] = {
            'hand': decodeHand(gameData[key][0]),
            'tiles': decodeTiles(gameData[key][1])
        }

    ))

    return(organizedData)

/*
organizeGameData:
    Input:
        Json Object
        All the current Games
            Name of Each Game
            string of occupied tiles
                ex) "1A-15V-199D"...
            string of current hand
                ex) "1A-15V-199D"...
        ex) {'Game1': ["abcdesf", "1A-15V-199D"] }

    Output:
        Game Json object
        ex) {'Game1':
                {
                    'hand':['a','b','c']
                    'tiles': [ [1, "A"], [15, "V"], [199, "D"] ]
                }
            }

*/  

            

}


export function encodeGameData(gameData){
    var encodedData = {};

    Object.keys(gameData).map((key, index) => ( 

        encodedData[key] = {
            'hand': encodeHand(gameData[key]['hand']),
            'tiles': encodeTiles(gameData[key]['tiles'])
        }

    ))

    return(encodedData)

}

function zeroFill( number, width ){
    width -= number.toString().length;
    if ( width > 0 )
    {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
  }

