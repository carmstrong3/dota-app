import React, {Component} from 'react';

class WinCalc extends Component {
  // Initialize the state

  render() {
    return(
      <div className="App">
        <div className="WinrateContainer">
          <div className="RadiantWinrateContainer">
          <h2>Radiant Winrate</h2>
          {this.props.radiantWinrate ? (
            <div>
            <p>winRate is</p>
            {this.props.radiantPoints}
            </div>
          ) : (
            <div>
            <p>radiantWinrate length is</p>
            {this.props.radiantWinrate.length}
            </div>
          )}
          </div>
          <div className="DireWinrateContainer">
          <h2>Dire Winrate</h2>
          {this.props.direWinrate ? (
            <div>
            <p>winRate is</p>
            {this.props.direPoints}
            </div>
          ) : (
            <div>
            <p>radiantWinrate length is</p>
            {this.props.direWinrate.length}
            </div>
          )}
          </div>


        </div>


      </div>
);

 }
}

export default WinCalc;
