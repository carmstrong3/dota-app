import React, {Component} from 'react';

class WinCalc extends Component {
  // Initialize the state


  render() {
    return(
      <div className="App">
        <div>
          <h2>Radiant Winrate</h2>
          <p>{this.props.getRadiantPoints}</p>
        </div>
      </div>
);

  }
}

export default WinCalc;
