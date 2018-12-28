import React, {Component} from 'react';

class Teams extends Component {

  componentDidUpdate() {
    this.getWinPercentages();
  }

  getWinPercentages = () => {
   
  }

  
  render() {
    
    return (
      <div className="App">
        <div id="teams container">
          <div id="radiant">
            <h2>Radiant</h2>
            {this.props.radiant ? (
              {this.props.radiant.map((hero) => {
                return(
                  <div>
                    <p>{hero.localized_name}</p>
                    <img src={hero.image} alt="radiant hero">
                  </div>
                );
              })}
            ) : (
              <div>
                <p>No hero selected yet</p>
              </div>
            )} 
          </div>
        <div id="win">
           
        </div>
        <div id="dire">

        </div> 
        <div id="bans">

        </div>
      </div>
      </div>
    );
  }
}

export default Teams;
 
