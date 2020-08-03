<h1 align="center">Words With Friends Solver </h1>

<h2 align="center"><a  href="https://words-with-friends-solver.sloppy.zone/">Live Demo</a></h2>

## Description

Words with friends is a crossword-puzzle style game where players take turns playing words in a similar manner to Scrabble. This webapp was created in React Js and finds the highest scoring word possiable to place given the users current letters. Users can create an account and have up to 12 ongoing games per account. 

**The list of words used in this project was the [Enhanced North American Benchmark Lexicon](https://code.google.com/archive/p/dotnetperls-controls/downloads). This is a public domain list containing 173,000 words that is used by many games including [Words With Friends](https://www.zynga.com/games/words-with-friends-2/).** 


## How to play

### Input Letters:
- **Click** on the tile where you would like to input a letter
- **Type** the letter that you would like placed
- **Delete** letters my typing a space instead of a letter
- **Blank Tiles** can be used by typing in a question mark (?)
<p align="center">
<img  src="https://media.giphy.com/media/IgXWLeNcEuQPBr6VL1/giphy.gif" width="60%"></p>

### Finding Solutions:
- **Click** on the find solutions button under the board
- Navigate through the solutions using the arrow buttons
- Automatically input a suggested word by clicking on it
<p align="center">
<img  src="https://media.giphy.com/media/Wm8r2Ye1kiKe67EDm6/giphy.gif" width="60%"></p>

## About the project.

### Game Board

- The tiles of the board are all React components
- Each tile component utilizes HTML input boxes to get user input
  
### Finding Solutions

- When the website loads the [ENABLE](https://code.google.com/archive/p/dotnetperls-controls/downloads) is loaded into a trie class
- The custom trie class allows for the algorithim to find all playable words in a timely manner
- The score for each playable word is then calculated and displayed in decending order

## Project setup

```
npm install
npm run
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)