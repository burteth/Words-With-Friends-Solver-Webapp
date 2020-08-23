import React from "react";

const MAX_PAGES = 4;

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
          	<div className="pageHeader">How to Play</div>  

			<div className="pagePartitionBox">

				<div className="pagePartition" id="pageLeftPartition">
				<h6>Input Letters:</h6>
				<h7>
					<li>Click on the tile where you would like to input a letter</li>
					<li>Type the letter that you would like placed</li>
					<li>Delete letters my typing a space instead of a letter</li>
					<li>Blank Tiles can be used by typing in a question mark (?)</li>
				</h7>
				</div>
				<div className="pagePartition" id="pageRightPartition">
					<img id="pageGif"src="https://media.giphy.com/media/IgXWLeNcEuQPBr6VL1/giphy.gif"/>
				</div>
			</div>
        </div>
      )
    }else if (pageNum === 2){
      return(
        <div className="pageBlock">
          	<div className="pageHeader">How to Play</div>  

			<div className="pagePartitionBox">

				<div className="pagePartition" id="pageLeftPartition">
				<h6>Finding Solutions:</h6>
				<h7>
					<li>Click on the find solutions button under the board</li>
					<li>Navigate through the solutions using the arrow buttons</li>
					<li>Automatically input a suggested word by clicking on it</li>
				</h7>
				</div>
				<div className="pagePartition" id="pageRightPartition">
					<img id="pageGif" src="https://media.giphy.com/media/Wm8r2Ye1kiKe67EDm6/giphy.gif"/>
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

