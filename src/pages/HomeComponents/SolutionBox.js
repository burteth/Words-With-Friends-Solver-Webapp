import React from "react";
import SolutionRect from './SolutionRect'

export default class solutionBox extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			hover : false
		}
	}

    displaySolutions(){
      
	  var solutions = this.props.potientialWords;

      var solutionsList = [];
      if (solutions.length === 0){

        for (var i = 20; i > 0; i--) {

          	solutionsList.push(
				<SolutionRect
					key={"Solution ".concat( i.toString() )} 
					score={" "} 
					word={" "} 
				/>)
		}

      }else{

        for (var j = 0; j < solutions.length; j++) {

        	solutionsList.push(
				<SolutionRect
					key={"Solution ".concat( j.toString() )} 
					id={j}
					isVertical={solutions[j]["Vertical"]} 
					start={solutions[j]["start"]} 
					score={solutions[j]["score"]} 
					word={solutions[j]["word"]} 
					handleHover={this.props.handleHover}
				/>
			)
		}
		
      }
      return solutionsList;
	}
	
	handleHoverOver(){
		this.setState({
			hover: false
		});
		this.props.handleHover(-1)
	}

  render(){
	if (this.props.potientialWords.length !== 0){

		return(
			<div id="solutionBox" 
				onMouseEnter={() => this.setState({hover: true})} 
				onMouseLeave={this.handleHoverOver.bind(this)}
			>
				{this.displaySolutions()}
			</div>
		);
	}else{
		return null;
	}
  }

}
