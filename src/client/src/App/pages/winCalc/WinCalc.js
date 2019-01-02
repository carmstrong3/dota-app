import React, {Component} from 'react';

class WinCalc extends Component {
  // Initialize the state

  render() {
    return(
      <div className="App">
        <div>
          <h2>Radiant Winrate</h2>
          {this.props.radiantWinrate ? (
            <div>
              {this.props.showRadiantWinrate}
            </div>
          ) : (
            <div>
              No winrate yet
            </div>
          )}

        </div>
      </div>
);

  }
}

export default WinCalc;
