import React from "react";


export default class SolutionRect extends React.Component {
    highlightWord(){

      if (this.props.word === " "){
        return
      }
      
      var hoverIndecies = [];
      var curPos = this.props.start;
      for (var i = 0; i < this.props.word.length; i++) {
        hoverIndecies.push(this.makeIndex(curPos))
        if (this.props.isVertical){
          curPos[1] += 1;
        }else{
          curPos[0] += 1;
        }
      }
      this.props.handleHover(this.props.id);

	  //Resets current position
      if (this.props.isVertical){
        curPos[1] -= this.props.word.length;
      }else{
        curPos[0] -= this.props.word.length;
      }

	}
	
    makeIndex(position){
      var index = position[1]*15 + position[0];
      return index;
    }
	
  render(){
    return(
      <div className="solutionRect" onMouseOver={() => this.props.handleHover(this.props.id)}>

			<div className="solutionWord">
				{this.props.word}
			</div>

			<div className="solutionScore">
				{this.props.score}
			</div>
			
      </div>
	);
	
  }

}
