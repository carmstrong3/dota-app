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
              <div>
              {this.props.radiant.map((hero) => {
                return(
	          <div>
                    <p>{hero.localized_name}</p>
                    <img src={hero.image} alt="radiant hero"/>
		  </div>
                );
	      })}
	      </div>
            ) : (
              <div>
                <p>No hero selected yet</p>
              </div>
            )} 
          </div>
        <div id="win">
           
        </div>
        <div id="dire">
          <h2>Dire</h2>
            {this.props.dire ? (
              <div>
              {this.props.dire.map((hero) => {
                return(
	          <div>
                    <p>{hero.localized_name}</p>
                    <img src={hero.image} alt="dire hero"/>
		  </div>
                );
	      })}
	      </div>
            ) : (
              <div>
                <p>No hero selected yet</p>
              </div>
            )}           
        </div> 
        <div id="bans">
          <h2>Bans</h2>
            {this.props.bans ? (
              <div>
              {this.props.bans.map((hero) => {
                return(
	          <div>
                    <p>{hero.localized_name}</p>
                    <img src={hero.image} alt="banned hero"/>
		  </div>
                );
	      })}
	      </div>
            ) : (
              <div>
                <p>No hero selected yet</p>
              </div>
            )} 
        </div>
      </div>
      </div>
    );
  }
}

export default Teams;
 
