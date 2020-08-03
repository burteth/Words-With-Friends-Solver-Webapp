import React from "react";



export default class MobileSolutionBox extends React.Component {
	constructor(props){
		super(props)
		this.state = {
            currentSolution : 0,
            wordSize : "normal"
		}
    }
    componentDidMount(){
        this.props.handleHover(0);
    }
    
    incrementSolution(increment){

        var newID = this.state.currentSolution + ( 1*increment );
        if (newID < this.props.potientialWords.length && newID >= 0){
            this.setState({ currentSolution : newID });
            this.props.handleHover(newID);
            if (this.props.potientialWords[newID]["word"].length > 10){
                this.setState({wordSize : 'large'});
            }else if (this.state.wordSize === 'large'){
                this.setState({wordSize : 'normal'});
            }
        }
        

    }

  render(){
    return(
        <div id="mobileSolutionBox">

            {
                this.state.currentSolution !== 0
                && 
                <button 
                    className="arrowbtn fas fa-arrow-left" id="left" 
                    onClick={() => this.incrementSolution(-1)}
                >   
                </button>
            }


            <div id="mobileSolutionBoxLabel">
            
                <div 
                    className="potientialWord" 
                    id={this.state.wordSize}
                    onClick={() => this.props.handlePotientialWordFill(this.state.currentSolution)}
                >
                    {this.props.potientialWords[this.state.currentSolution]['word']}
                </div>

                <div id="potientialWordScore">
                    {this.props.potientialWords[this.state.currentSolution]['score']}
                </div>

            </div>

            
            {
                this.props.potientialWords.length !== this.state.currentSolution + 1 
                && 
                <button 
                    className="arrowbtn fas fa-arrow-right" id="right" 
                    onClick={() => this.incrementSolution(1)}
                >   
                </button>
            }
        
        </div>
    );
	
  }

}
