import React, {Component} from 'react';

class WinCalc extends Component {
  // Initialize the state
 
 
  render() {
    return(
      <div className="App">
        <div className="WinrateContainer">
          <h2>Radiant Winrate</h2>
          {this.props.radiantWinrate ? (
            <div>
            <p>winRate is</p>
            {this.props.getRadiantPoints()}
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
