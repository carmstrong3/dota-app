import React, {Component} from 'react';

class Picks extends Component {

  toggleContainerWorst() {
    if(this.props.isRadiant) {
      return (
        <div className="WorstPicks">
          {this.props.radiantTopPicks.length > 0 ? (
            <ul id="WorstPicksRadiant">
              {this.props.radiantTopPicks.map((el, index) => {
               return(
                  <li key={index}>
                    <p>{el}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h2>No Picks Found</h2>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className="WorstPicks">
          {this.props.direTopPicks.length > 0 ? (
            <ul id="WorstPicksDire">
              {this.props.direTopPicks.map((el, index) => {
               return(
                  <li key={index}>
                    <p>{el}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h2>No Picks Found</h2>
            </div>
          )}
        </div>
      )
    }
  }  

  toggleContainerBest() {
    if(this.props.isRadiant) {
      return (
        <div className="BestPicks">
          {this.props.radiantBottomPicks.length > 0 ? (
            <ul id="BestPickRadiant">
              {this.props.radiantBottomPicks.map((el, index) => {
               return(
                  <li key={index}>
                    <p>{el}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h2>No Picks Found</h2>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div className="BestPicks">
          {this.props.direBottomPicks.length > 0 ? (
            <ul id="BestPicksDire">
              {this.props.direBottomPicks.map((el, index) => {
               return(
                  <li key={index}>
                    <p>{el}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h2>No Picks Found</h2>
            </div>
          )}
        </div>
      )
    }
  }
 
  render() {
     
    return(
      <div className="Picks">
        <div>
          <h2>Best Picks</h2>
          <button type="button" onClick={() => this.props.getTopPicks(this.props.dire, this.props.radiant)}>Get Best Picks</button>
          {this.toggleContainerBest()}
        </div>
        <div>
          <h2>Worst Picks</h2>
          <button type="button" onClick={() => this.props.getTopPicks(this.props.dire, this.props.radiant)}>Get Worst Picks</button>
          {this.toggleContainerWorst()}
        </div>

      </div>

    )
  }
}

export default Picks;
