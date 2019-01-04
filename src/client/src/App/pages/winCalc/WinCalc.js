import React, {Component} from 'react';

class WinCalc extends Component {
  // Initialize the state
  constructor(props){
    super(props);

  } 
 
  render() {
    return(
      <div className="App">
        <div className="WinrateContainer">
          <h2>Radiant Winrate</h2>
          {this.props.radiantWinrate ? (
            <div>
            <p>winRate is</p>
            {this.props.getPoints(this.props.radiantWinrate)}
            </div>
          ) : (
            <div>
            <p>radiantWinrate length is</p>
            {this.props.radiantWinrate.length}
            </div>
          )}
        </div>
      </div>
);

  }
}

export default WinCalc;
