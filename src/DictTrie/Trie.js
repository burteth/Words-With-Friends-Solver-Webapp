const helper = require('./helperFunctions');


function TrieNode(char){

    this.char = char;

    this.parent = null;

    this.children = {};

    this.endOfWord = false;
}

export function Trie(){
	this.root = new TrieNode(null);
	this.findOptimal = function(filledTiles, startHand){
		
		var board = createBoard(filledTiles);

		//For First Turn
		if (filledTiles.length === 0){

			var solutionArray = [];
			var item;
			var pastLetters;
			var hand;
			var curNode;
			var usedLetters;

			var queue = [
				[ '', startHand, this.root ]
			];

			while( queue.length !== 0 ){
				
				item = queue.pop();

				pastLetters = item[0];
				hand = item[1];
				curNode = item[2];

				if (curNode.endOfWord){

					solutionArray.push({
						"row" : 7,
						"col" : 7,
						"isVertical" : false,
						"word" : pastLetters,
						"score" : helper.calcScore(7, 7, false, pastLetters, board, startHand)
					});		
				}

				usedLetters = new Set();
				for (var i = 0; i < hand.length; i++){
					if (curNode.children[hand[i]] && !usedLetters.has(hand[i])){

						usedLetters.add(hand[i]);
						queue.push(
							[ pastLetters.concat(hand[i]), hand.slice(0,i).concat(hand.slice(i + 1)), curNode.children[hand[i]]  ]
						);

					}
				}

			}

			solutionArray.sort(function(a, b) {
				if (a.score < b.score){
					return(1)
				}else{
					return(-1)
				}
			});

			return solutionArray

		}
		var curHand = [];
		var starterHand = []
		
		for (var indx = 0; indx < startHand.length; indx++){
			if (startHand[indx] !== ""){
				curHand.push(startHand[indx].toLowerCase());
				starterHand.push(startHand[indx].toLowerCase());
			}
		}
	
	
	
		/*Preprocessing*/{
		var availableTiles = {};
			/*ex)
				{
					t: [
						{ row: 1, col: 0, leftLimit: 1, isVertical: true },
						{ row: 8, col: 14, leftLimit: 2, isVertical: false },
						{ row: 12, col: 10, leftLimit: 6, isVertical: false }
					],
					a: [
						{ row: 7, col: 1, leftLimit: 7, isVertical: true },
						{ row: 7, col: 10, leftLimit: 7, isVertical: true }
					]
				}
			*/
		var placedQueue = [];
			/*ex)
					[
						{
							remainingTiles: [ '', '',  '', '',  '', '', '', '',  '', 'q', '', '', '', 't' ],
							remainingHand: [ 'a', 'b', 'c', 'd', 'a', 's', 'f' ],
							row: 8,
							col: 0,
							isVertical: false,
							curNode: TrieNode {
								char: 'e',
								parent: [TrieNode],
								children: [Object],
								endOfWord: false
							},
							pastLetters: 'e'
						}...
					]
				*/
	
		var currentLetter;
	
		for (var rowIndex = 0; rowIndex < 15; rowIndex++){
			for (var colIndex = 0; colIndex < 15; colIndex++){
	
				currentLetter = board[rowIndex][colIndex];
				if (currentLetter !== ""){
	
					//Check the letter Horizontally
					if (colIndex === 0) {
	
						placedQueue.push({
							"remainingTiles" : helper.getRemainingTiles(board, rowIndex, colIndex, false),
							"remainingHand" : curHand,
							"row" : rowIndex,
							"col" : colIndex,
							"isVertical" : false,
							"curNode" : this.root.children[currentLetter],
							"pastLetters" : currentLetter
						});
	
					}else if (helper.isValidHorizontal(board, rowIndex, colIndex)) {
						
	
						//If the letter is not in the object yet
						if (!(availableTiles[currentLetter])){
							availableTiles[currentLetter] = [];
						}
						
						availableTiles[currentLetter].push({
							"row" : rowIndex,
							"col" : colIndex,
							"leftLimit" : helper.calcLeftLimit(board, rowIndex, colIndex, false),
							"isVertical" : false
						});
						
					}
					
					//Check the letter Vertically
					if (rowIndex === 0) {
	
						placedQueue.push({
							"remainingTiles" : helper.getRemainingTiles(board, rowIndex, colIndex, true),
							"remainingHand" : curHand,
							"row" : rowIndex,
							"col" : colIndex,
							"isVertical" : true,
							"curNode" : this.root.children[currentLetter],
							"pastLetters" : currentLetter
						});
	
					}else if (helper.isValidVertical(board, rowIndex, colIndex)){
	
						//If the letter is not in the object yet
						if (!(availableTiles[currentLetter])){
							availableTiles[currentLetter] = [];
						}
						
						availableTiles[currentLetter].push({
							"row" : rowIndex,
							"col" : colIndex,
							"leftLimit" : helper.calcLeftLimit(board, rowIndex, colIndex, true),
							"isVertical" : true
						});
						
					}
				}
			}
		}
	
		}
	
		
		
		/*Queue #1: HandQueue
			-this figures out all the prefixes that are created
			 completely out of words from the current hand
		*/{
		var listofHandWords = [];
	
		//Set the initial item in the queue to the topmost level of the trie
		var handQueue = [
			{
				'remainingHand' : curHand,
				'pastLetters' : '',
				'curNode' : this.root,
			}
		];
	
		var availableLetter;
		var potLetter;
		while ( handQueue.length !== 0 ){
			
			item = handQueue.pop();

			//console.log(item);
	
			if (item.curNode.endOfWord){
				listofHandWords.push(item.pastLetters);
			}
			
			//Check Hand letters
			usedLetters = new Set();
			for (var handIndex = 0; handIndex < item.remainingHand.length; handIndex++){
				availableLetter = item.remainingHand[handIndex];
	
				if (usedLetters.has(availableLetter)){
					continue;
				}
				usedLetters.add(availableLetter);
	
				//check if the next letter is a possiable next letter
				//for the given prefix
				if (item.curNode.children[availableLetter]){
					
					handQueue.push(
						{
							'remainingHand' : item.remainingHand.slice(0,handIndex).concat(item.remainingHand.slice(handIndex+1)),
							'pastLetters' : item.pastLetters.concat(availableLetter),
							'curNode' : item.curNode.children[availableLetter]
						}
					);
	
				}else if (availableLetter === "?"){

					for (var key in item.curNode.children) {

						handQueue.push(
							{
								'remainingHand' : item.remainingHand.slice(0,handIndex).concat(item.remainingHand.slice(handIndex+1)),
								'pastLetters' : item.pastLetters.concat(key),
								'curNode' : item.curNode.children[key]
							}

						);

					}


				}
	
			}
	
			//Check available tiles
			var avblKeys = Object.keys(availableTiles); //Array of keys from the available Tiles object
			var tileObjOfLetter;
	
			//Loops through every item in the object and if the letter can work
			//with the current prefix, then it is added to the placedQueue
			for (var avblTileIndex = 0; avblTileIndex < avblKeys.length; avblTileIndex++){
				potLetter = avblKeys[avblTileIndex]; //String
	
				if (item.curNode.children[potLetter]){
					
					/*loops through all locatons of that specific letter
					ex) a: [{ row: 7, col: 1, leftLimit: 7, isVertical: true },
							{ row: 7, col: 10, leftLimit: 7, isVertical: true }]
					*/
					for (i = 0; i < availableTiles[potLetter].length; i++){
						tileObjOfLetter = availableTiles[potLetter][i];
						
						
						if (tileObjOfLetter.leftLimit >= item.pastLetters.length 
							&& helper.checkPrefixAdjacents(board, tileObjOfLetter.row, tileObjOfLetter.col, tileObjOfLetter.isVertical,
								item.pastLetters, this )){				
	
							placedQueue.push({
								"remainingTiles" : helper.getRemainingTiles(board, tileObjOfLetter.row, tileObjOfLetter.col, tileObjOfLetter.isVertical),
								"remainingHand" : item.remainingHand,
								"row" : tileObjOfLetter.row,
								"col" : tileObjOfLetter.col,
								"isVertical" : tileObjOfLetter.isVertical,
								"curNode" : item.curNode.children[potLetter],
								"pastLetters" : item.pastLetters.concat(potLetter)
							});
							
						}
					}
				}
			}
		}
	
		  }
		
		
	
	
	
		/*Queue #2: PlacedQueue*/{
		var solutionObj = {};
		var startRow;
		var startCol;
		var curSolution;

		//Dup is used to figure out if the word has already been played
		var isDup = false;
		while (placedQueue.length !== 0){
			item = placedQueue.pop();
			
			
			//If the current word is the end of a word 
			//then add it to the solutions set
			if (item.curNode.endOfWord){

				//If the next tile isnt placed then continue
				if ((item.remainingTiles.length > 0 && item.remainingTiles[0] === '') || (item.remainingTiles.length === 0)) {

					//Check if the word has already been placed
					if (item.remainingHand.length !== starterHand.length){

						startRow = item.row - ( (item.pastLetters.length - 1) * item.isVertical);
						startCol = item.col - ( (item.pastLetters.length - 1) * !item.isVertical);
						
						if (solutionObj[item.pastLetters]){
							for (i = 0; i < solutionObj[item.pastLetters].length; i++){
								curSolution = solutionObj[item.pastLetters][i]
	
								//Check if word is already played
								if (curSolution["row"] === startRow && curSolution["col"] === startCol && curSolution["isVertical"] === item.isVertical){
									isDup = true;
									break;
								}
							}
							if (!isDup){
	
								isDup = false
								solutionObj[item.pastLetters].push({
									"row" : startRow,
									"col" : startCol,
									"isVertical" : item.isVertical,
									"score" : helper.calcScore(startRow, startCol, item.isVertical, item.pastLetters, board, startHand)
								})
	
							}
						}else{
							solutionObj[item.pastLetters] = [{
								"row" : startRow,
								"col" : startCol,
								"isVertical" : item.isVertical,
								"score" : helper.calcScore(startRow, startCol, item.isVertical, item.pastLetters, board, startHand)
							}];
						}

					}
			


				}
			}
	
			//If there arent any tiles left then stop
			if (item.remainingTiles.length === 0){
				continue;			
			}
	
			//If the next tile is empty then check all the 
			//remaining letters in your hand
			if (item.remainingTiles[0] === ''){
				

				usedLetters = new Set();
				for (handIndex = 0; handIndex < item.remainingHand.length; handIndex++){
					potLetter = item.remainingHand[handIndex]
					
					//Set is used so that there arent any duplicates 
					if (usedLetters.has(potLetter)){
						continue;
					}
					usedLetters.add(potLetter);
	
					
					if (item.curNode.children[potLetter] && helper.checkAdjacent(board, item.row + item.isVertical, item.col + !(item.isVertical), item.isVertical, potLetter, this)){
						
						placedQueue.push({
							"remainingTiles" : item.remainingTiles.slice(1),
							"remainingHand" : item.remainingHand.slice(0,handIndex).concat(item.remainingHand.slice(handIndex+1)),
							"row" : item.row + (item.isVertical),
							"col" : item.col + !(item.isVertical),
							"isVertical" : item.isVertical,
							"curNode" : item.curNode.children[potLetter],
							"pastLetters" : item.pastLetters.concat(potLetter)
						});
	
					}else if (potLetter === "?"){

						for (key in item.curNode.children){

							if (helper.checkAdjacent(board, item.row + item.isVertical, item.col + !(item.isVertical), item.isVertical, key, this)){

								placedQueue.push({
									"remainingTiles" : item.remainingTiles.slice(1),
									"remainingHand" : item.remainingHand.slice(0,handIndex).concat(item.remainingHand.slice(handIndex+1)),
									"row" : item.row + (item.isVertical),
									"col" : item.col + !(item.isVertical),
									"isVertical" : item.isVertical,
									"curNode" : item.curNode.children[key],
									"pastLetters" : item.pastLetters.concat(key)
								});

							}

						}


					}
				}
			}else if (item.curNode.children[item.remainingTiles[0]] && helper.checkAdjacent(board, item.row + item.isVertical, item.col + !(item.isVertical), item.isVertical, item.remainingTiles[0], this)){
	
				potLetter = item.remainingTiles[0]
				//If the next letter in remaining letters is 
				//actually possiable with the current prefix
				
				placedQueue.push({
					"remainingTiles" : item.remainingTiles.slice(1),
					"remainingHand" : item.remainingHand,
					"row" : item.row + (item.isVertical),
					"col" : item.col + !(item.isVertical),
					"isVertical" : item.isVertical,
					"curNode" : item.curNode.children[potLetter],
					"pastLetters" : item.pastLetters.concat(potLetter)
				});
				
			}
		}
	
	
		}

		solutionArray = [];
		for (key in solutionObj){
			for (i = 0; i < solutionObj[key].length; i++){
				solutionArray.push({
					"row" : solutionObj[key][i]["row"],
					"col" : solutionObj[key][i]["col"],
					"isVertical" : solutionObj[key][i]["isVertical"],
					"word" : key,
					"score" : solutionObj[key][i]["score"],
				})
			}
		}


		solutionArray.sort(function(a, b) {
			if (a.score < b.score){
				return(1)
			}else{
				return(-1)
			}
		});

		return(solutionArray);
	
	
	
	}
}


Trie.prototype.insert = function(word) {

    var currNode = this.root;

    for (var index = 0; index < word.length; index++){

        // If the node doesnt have that letter as a child currently
        if ( !currNode.children[word[index]] ){

            currNode.children[word[index]] = new TrieNode(word[index]);
            currNode.children[word[index]].parent = currNode;

        }

        currNode = currNode.children[word[index]];

		if (index === word.length-1) {
			currNode.endOfWord = true;
		  }
    }
   

}

Trie.prototype.contains = function(word) {

    var currNode = this.root;

    for (var index = 0; index < word.length; index++){

        // If the node doesnt have that letter as a child currently
        if ( !currNode.children[word[index]] ){

            return false

        }

        currNode = currNode.children[word[index]];

    }
    if (currNode.endOfWord){
        return true;
    }
    return false;
    
}

Trie.prototype.find = function(prefix) {

    var currNode = this.root;
    var out = [];

    for (var index = 0; index < prefix.length; index++){


        if (currNode.children[prefix[index]]){

			currNode = currNode.children[prefix[index]]
	
        }else{
			return out;

		}
		
	}
	findAllWords(currNode, out);

	return out;

}

TrieNode.prototype.getWord = function() {
	var out = []
	var currNode = this;

	while( currNode !== null ){
		out.unshift(currNode.char)
		currNode = currNode.parent
	}

	return out.join('');
}


function findAllWords(currNode, out) {

	if (currNode.endOfWord){
		out.unshift(currNode.getWord())
	}

	for (var child in currNode.children) {
		findAllWords(currNode.children[child], out)
	}
}

function createBoard(filledTiles){

    var board = [];

    for (var i = 0; i < 15; i++){
        board.push([]);
        for (var j = 0; j < 15; j++){
            board[i].push('')
        }

    }

    var colNum;
    var rowNum;
    var letter;
    for (i = 0; i < filledTiles.length; i++){

        rowNum = Math.floor(filledTiles[i][0] / 15);
        colNum = filledTiles[i][0] % 15;
        letter = filledTiles[i][1].toLowerCase();

        board[rowNum][colNum] = letter;
        
    }
    return board;
}


//module.exports = { Trie, findSolutions };
