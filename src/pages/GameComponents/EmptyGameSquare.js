import React from 'react';

class EmptyGameSquare extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			hover: false
		}
	}

  render () {

    return (
      <div className="gameSquareContainer">
         	<button 
				className="gameSquare empty" 
				onClick={ this.props.createNewGame()}
				onMouseEnter={() => this.setState({hover: true})} 
				onMouseLeave={() => this.setState({hover: false})} 
	        >

			New Game
			</button>



		</div>
    
    );     

  }
}

export default EmptyGameSquare;
