import React from "react";
import blank_tiles from "./images/WWF_blank_tiles.png";
import game_page from "./images/WWF_game_page.png";

const MAX_PAGES = 6;

export default class Tutorial extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pageNum : 0
    }
  }


  renderPage(pageNum){
    if (pageNum === 0){
      return(
        <div className="pageBlock">
          <div className="pageHeader" id='tutorialHeader'>Welcome to Words with Friends Solver!</div>  
          <h4>This tutorial will walk you through how to use the application</h4>
          
        </div>
      )
    }else if (pageNum === 1){
      return(
        <div className="pageBlock">
          	<div className="pageHeader">Input Letters</div>  

			<div className="pagePartitionBox">

				<div className="pagePartition" id="pageLeftPartition">
				<h6>
					<li>Click on the tile where you would like to input a letter</li>
					<li>Type the letter that you would like placed</li>
					<li>Delete letters my typing a space instead of a letter</li>
					<li>Blank Tiles can be used by typing in a question mark (?)</li>
				</h6>
				</div>
				<div className="pagePartition" id="pageRightPartition">
					<img id="pageGif"src="https://media.giphy.com/media/eJM9rvg8Y6QppkAbdU/giphy.gif"/>
				</div>
			</div>
        </div>
      )
    }else if (pageNum === 2){
		return(
		  <div className="pageBlock">
				<div className="pageHeader">Deleting Letters</div>  
  
			  <div className="pagePartitionBox">
  
				  <div className="pagePartition" id="pageLeftPartition">
				  	<h6>
					  <li>You can remove a letter by typing a space instead of a letter</li>
					</h6>
				  </div>
				  <div className="pagePartition" id="pageRightPartition">
					  <img id="pageGif" src="https://media.giphy.com/media/RKNc13CG8X0sL4QGke/giphy.gif"/>
				  </div>
			  </div>
		  </div>
		)
	  }else if (pageNum === 3){
		return(
		  <div className="pageBlock">
				<div className="pageHeader">Blank Tiles</div>  
  
			  <div className="pagePartitionBox">
  
				  <div className="pagePartition" id="pageLeftPartition">
				  <h6>
					  <li>Blank Tiles can be input by typing a question mark</li>
				  </h6>
				  </div>
				  <div className="pagePartition" id="pageRightPartition">
					  <img src={blank_tiles}/>
				  </div>
			  </div>
		  </div>
		)
	  }else if (pageNum === 4){
		return(
		  <div className="pageBlock">
				<div className="pageHeader">Finding Solutions</div>  
  
			  <div className="pagePartitionBox">
  
				  <div className="pagePartition" id="pageLeftPartition">
				  <h6>
					  <li>Click on the find solutions button under the board</li>
					  <li>Navigate through the solutions using the arrow buttons</li>
					  <li>Automatically input a suggested word by clicking on it</li>
				  </h6>
				  </div>
				  <div className="pagePartition" id="pageRightPartition">
					  <img id="pageGif" src="https://media.giphy.com/media/Wm8r2Ye1kiKe67EDm6/giphy.gif"/>
				  </div>
			  </div>
		  </div>
		)
	  }else if (pageNum === 5){
		return(
		  <div className="pageBlock">
				<div className="pageHeader">Switching between games</div>  
  
			  <div className="pagePartitionBox">
  
				  <div className="pagePartition" id="pageLeftPartition">
				  <h6>
					  <li>Once you have made an account you can save up to 20 active Words with Friends Games</li>					
				  </h6>
				  </div>
				  <div className="pagePartition" id="pageRightPartition">
					  <img id="pageGif" src={game_page}/>
				  </div>
			  </div>
		  </div>
		)
	  }else if (pageNum === 6){
		return(
		  <div className="pageBlock">
				<div className="pageHeader">Add a New Game</div>  
  
			  <div className="pagePartitionBox">
  
				  <div className="pagePartition" id="pageLeftPartition">
				  <h6>
					  <li>Click on the New Game box </li>
					  <li>Fill out your Opponent’s Name</li>
				  </h6>
				  </div>
				  <div className="pagePartition" id="pageRightPartition">
					  <img id="pageGif" src="https://media.giphy.com/media/IhDR0KGReNA0D1q4xx/giphy.gif"/>
				  </div>
			  </div>
		  </div>
		)
	  }

  }

  incrementPage() {
    if (this.state.pageNum !== MAX_PAGES){
      this.setState({
        pageNum : this.state.pageNum + 1
      })
    }
  }

  decreasePage() {
    if (this.state.pageNum !== 0){
      this.setState({
        pageNum : this.state.pageNum - 1
      })
    }
  }

  render(){
    return(
      	<div id="tutorialBlock">
          
          {this.renderPage(this.state.pageNum)}
          <div id="tutorialButtonContainer">
            <button className="tutorialButton" id="skipBtn" onClick={() => this.props.updateState({tutorial : false})}>Skip Tutorial</button>
            <button className="tutorialButton" onClick={this.decreasePage.bind(this)}>Previous</button>

			{this.state.pageNum !== MAX_PAGES ? 
            <button className="tutorialButton" onClick={this.incrementPage.bind(this)}>Next</button>
			:
			<button className="tutorialButton"onClick={() => this.props.updateState({tutorial : false})}>Finish</button>
		}
          </div>
      	</div>
    );

  }

}

