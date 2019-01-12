import React, {Component} from 'react';

class WinCalc extends Component {
  // Initialize the state

  toggleContainer() {
    const roundHundredth = (num) => {
      return Math.ceil(num * 10000) / 100;
    }

    if(this.props.isRadiant) {
      return (
        <div className="RadiantWinrateContainer">
          <button type="button" onClick={() => this.props.getPointsRadiant(this.props.radiantWinrate)}>Get Radiant Winrate</button>
{/* eslint-disable-next-line */}
          {this.props.radiantWinrate != 0 ? (
            <div>
            {roundHundredth(this.props.radiantPoints)} 
            </div>
          ) : (
            <div>
            <p>no calculation yet</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="DireWinrateContainer">
          <button type="button" onClick={() => this.props.getPointsDire(this.props.direWinrate)}>Get Dire Winrate</button>
{/* eslint-disable-next-line*/}
          {this.props.direWinrate != 0 ? (
            <div>
            {roundHundredth(this.props.direPoints)}
            </div>
          ) : (
            <div>
            <p>no calculation yet</p>
            </div>
          )}
        </div>
      )
    }
  }  

  render() {
    return(
      <div className="WinCalc-Container">
        <button type="button" onClick={(e) => this.props.setRadiant()}>I am Radiant</button>
        {this.toggleContainer()}     
        <button type="button" onClick={(e) => this.props.setDire()}>I am Dire</button>
      </div>   
    );

 }
}

export default WinCalc;
