    


function decodeTiles(tileString){

/*
Decode:

    Input:
        string of occupied tiles
            ex) "1A-15V-199D"...
    Output:
        Array of Tupeles
            ex) [ [1, "A"], [15, "V"], [199, "D"] ]
*/    
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

function decodeTilesExtended(tileString){
    let decodedTiles = decodeTiles(tileString);
    var extendedTileArray = [];
    for ( var i = 0; i < decodedTiles.length; i++ ){

        extendedTileArray.push([
            decodedTiles[i][0] % 15,
            Math.floor(decodedTiles[i][0] / 15),
            decodedTiles[i][1]
        ])
    }
    return extendedTileArray;
}
/*

function decodeHand(handString){
    return(handString.split(""))
}

function encodeTiles(tileArray){

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

function encodeHand(handArray){
	
	return(handArray.join(''))
}


function decodeGameData(gameData){
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



            

}
 


function encodeGameData(gameData){
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
*/ 
function encodeDataForDataBase(gameData){

    /*
    Input:
    ex)
    {
        "Game1" : {
            "hand": "aerteaa", 
            "tiles": "125E-126T-127H-128A-129N-144B-159U-174R-189T"
        }, 
        "Game2": {
            "hand": "dghjkl", 
            "tiles": "100Y-088B-150S"
        }
    }

    Output:
    ex)
    {
        Game1: [ 'aerteaa', '125E-126T-127H-128A-129N-144B-159U-174R-189T' ],
        Game2: [ 'dghjkl', '100Y-088B-150S' ]
    }


    */
    
    var encodedData = {};
    var jsonGameData = gameData;
    Object.keys(jsonGameData).map((key, index) => ( 

        encodedData[key] = [
            jsonGameData[key]['hand'],
            jsonGameData[key]['tiles']
        ]

    ));

    encodedData = JSON.stringify(encodedData);

    return(encodedData);

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function isValidHorizontal(board, rowIndex, colIndex){
    /*
        Checks if the current letter can be processed Horizontally
    */
    return(board[rowIndex][colIndex - 1] === "")
}

function isValidVertical(board, rowIndex, colIndex){
    /*
        Checks if the current letter can be processed vertically
    */
    return(board[rowIndex - 1][colIndex] === "")
}

function calcLeftLimit(board, rowIndex, colIndex, isVertical){
    /*
    Calculates the left or top limit of a row or col

    returns integer
    */

    //Counter starts at zero because we know the one on the left/top is empty
    var counter = 1;

    if (isVertical){

        while ( (rowIndex - counter) > 0 ){

            if ( board[rowIndex - counter][colIndex] === "" ){
                counter += 1;
            }
            //If a letter is found return left limit with space of one
            else{
                return counter - 2;
            }
            
        }

        return rowIndex;

    }else{

        while ( (colIndex - counter) > 0 ){

            if ( board[rowIndex][colIndex - counter] === "" ){
                counter += 1;
            }
            //If a letter is found return left limit with space of one
            else{
                return counter - 2;
            }
            
        }

        return colIndex;

    }

}

function getRemainingTiles(board, rowIndex, colIndex, isVertical){
    /*
        returns list

        ex) 
            Input: ['', '','', '','', '','', 'A','', '','B', 'E','A', '']
            returns: ['', '','B', 'E','A', '']

    */


    var curRemaining = [];
    var pos;
    if (isVertical){

        for (pos = rowIndex + 1; pos < 15; pos++){
            curRemaining.push(board[pos][colIndex]);
        }

        return curRemaining;

    } else {

        for (pos = colIndex + 1; pos < 15; pos++){
            curRemaining.push(board[rowIndex][pos]);
        }

        return curRemaining;

    }

}

function checkPrefixAdjacents(board, rowIndex, colIndex, isVertical, pastLetters, trie){

    var curRow = rowIndex;
    var curCol = colIndex;

    for (var potWordIdx = pastLetters.length - 1; potWordIdx >= 0; potWordIdx--){

        curRow -= isVertical;
        curCol -= !(isVertical);

        if (!checkAdjacent(board, curRow, curCol, isVertical, pastLetters[potWordIdx], trie)) {
            return false;
        }
    }

    return true;

}

function checkAdjacent(board, rowIndex, colIndex, isVertical, letter, trie){

    //Check if it is a normal single letter

    if (isVertical){
        if ( (colIndex === 14 || board[rowIndex][colIndex + 1] === "") &&  (colIndex === 0 || board[rowIndex][colIndex - 1] === "") ){
            return true;
        }
    }else{
        if ( (rowIndex === 14 || board[rowIndex + 1][colIndex] === "") &&  (rowIndex === 0 || board[rowIndex - 1][colIndex] === "") ){
            return true;
        }

    }


    //Adjacent word and potiential word are perpendicular
    var isAdjVertical = !(isVertical);

    //Find start of word
    var curRow = rowIndex;
    var curCol = colIndex;

    curRow -= isAdjVertical;
    curCol -= !(isAdjVertical);

    while (curRow >= 0 && curCol >= 0 && board[curRow][curCol] !== "") {
        curRow -= isAdjVertical;
        curCol -= !(isAdjVertical);
    }


    //Set current pos to starting point
    curRow += isAdjVertical;
    curCol += !(isAdjVertical);

    var curNode = trie.root;
    var curLetter;
    while (curRow < 15 && curCol < 15){        

        //if the next tile isnt placed
        if (board[curRow][curCol] === ""){

            //if its the starting position the continue
            if (curRow === rowIndex && curCol === colIndex){
                curLetter = letter;

            //if it is the end of the word
            }else{
                break;
            }
        
        }else{
            curLetter = board[curRow][curCol];
        }        
        
        if (curNode.children[curLetter]){
            
            curNode = curNode.children[curLetter];
            curRow += isAdjVertical;
            curCol += !(isAdjVertical);

        }else{
            return false;
        }

    }
    
    return(curNode.endOfWord);
}


function checkAdjacentScore(rowIndex, colIndex, isVertical, letter, board) {

    const charValues = {'?' : 0, 'a': 1,'b': 4,'c': 4,'d': 2,'e': 1,'f': 4,'g': 3,'h': 3,'i': 1,'j': 10,'k': 5,'l': 2,'m': 4,'n': 2,'o': 1,'p': 4,'q': 10,'r': 1,'s': 1,'t': 1,'u': 2,'v': 5,'w': 4,'x': 8,'y': 3,'z': 10};

    //If there isnt any adjacent tiles then return 0
    if (isVertical){
        if ( (colIndex === 14 || board[rowIndex][colIndex + 1] === "") &&  (colIndex === 0 || board[rowIndex][colIndex - 1] === "") ){
            return 0;
        }
    }else{
        if ( (rowIndex === 14 || board[rowIndex + 1][colIndex] === "") &&  (rowIndex === 0 || board[rowIndex - 1][colIndex] === "") ){
            return 0;
        }
    }


    //Adjacent word and potiential word are perpendicular
    var isAdjVertical = !(isVertical);

    //Find start of word
    var curRow = rowIndex;
    var curCol = colIndex;

    curRow -= isAdjVertical;
    curCol -= !(isAdjVertical);

    while (curRow >= 0 && curCol >= 0 && board[curRow][curCol] !== "") {
        curRow -= isAdjVertical;
        curCol -= !(isAdjVertical);
    }


    //Set current pos to starting point
    curRow += isAdjVertical;
    curCol += !(isAdjVertical);

    var curLetter;
    var wordScore = 0;
    while (curRow < 15 && curCol < 15){        

        //if the next tile isnt placed
        if (board[curRow][curCol] === ""){

            //if its the starting position then continue
            if (curRow === rowIndex && curCol === colIndex){
                curLetter = letter;

            //if it is the end of the word
            }else{
                break;
            }
        
        }else{
            curLetter = board[curRow][curCol];
        }        


        wordScore += charValues[curLetter]
        curRow += isAdjVertical;
        curCol += !(isAdjVertical);


    }
    
    return(wordScore);
}

function calcScore(rowIndex, colIndex, isVertical, word, board, startHand){
    
    const charValues = {'a': 1,'b': 4,'c': 4,'d': 2,'e': 1,'f': 4,'g': 3,'h': 3,'i': 1,'j': 10,'k': 5,'l': 2,'m': 4,'n': 2,'o': 1,'p': 4,'q': 10,'r': 1,'s': 1,'t': 1,'u': 2,'v': 5,'w': 4,'x': 8,'y': 3,'z': 10};
    

    const tripleWord = new Set([3, 11, 45, 59, 165, 179, 213, 221]);
    const tripleLetter = new Set([6, 8, 48, 56, 80, 84, 90, 104, 120, 134, 140, 144, 168, 176, 216, 218]);
    const doubleWord = new Set([20, 24, 52, 76, 88, 108, 116, 136, 148, 172, 200, 204]);
    const doubleLetter = new Set([17, 27, 31, 34, 40, 43, 62, 66, 68, 72, 94, 100, 124, 130, 152, 156, 158, 162, 181, 184, 190, 193, 197, 207]);

    var totalScore = 0;
    var scoreMultiplier = 1;
    var letterVal;
    var letter;
    var curRow = rowIndex;
    var curCol = colIndex;
    var placedCounter = 0;
    var numBlank = 0;
    
    for (var i = 0; i < startHand.length; i++){
        if (startHand[i] === '?'){
            numBlank += 1;
        }
    }


    for (i = 0; i < word.length; i++){
        
        letter = word[i].toLowerCase();
        
        letterVal = charValues[letter];

        if (board[curRow][curCol] === ""){
            if (tripleLetter.has(curRow*15 + curCol )){
                letterVal *= 3;
            }else if (doubleLetter.has(curRow*15 + curCol )){
                letterVal *= 2;
            }else if (doubleWord.has(curRow*15 + curCol )){
                scoreMultiplier *= 2;
            }else if (tripleWord.has(curRow*15 + curCol )){
                scoreMultiplier *= 3;
            }

            if (numBlank > 0 && !startHand.includes(letter)){
                
                letterVal = 0
                numBlank -= 1;
                letterVal += checkAdjacentScore(curRow, curCol, isVertical, "?", board);
            }else{
                letterVal += checkAdjacentScore(curRow, curCol, isVertical, letter, board);
            }

            

            
        }else{
            placedCounter += 1;
        }

        totalScore += letterVal;

        curRow += isVertical;
        curCol += !isVertical;
        

    }

    totalScore *= scoreMultiplier;

    if (word.length - placedCounter >= 7){
        totalScore += 35;
    }

    return(totalScore)

}




module.exports = { calcScore, checkPrefixAdjacents, checkAdjacent, getRemainingTiles, calcLeftLimit, isValidHorizontal, isValidVertical, encodeDataForDataBase, getRandomInt, decodeTilesExtended}
