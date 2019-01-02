import React, {Component} from 'react';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radiantTeam: [],
      direTeam: [],
      bansList: []
    }
  }
 
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.radiantTeam !== nextProps.radiant) {
      return {
        radiant: nextProps.radiant,
        radiantTeam: nextProps.radiant
      }
    } else return null
  }

  toggleBansButton(hero) {
    return this.props.bans.indexOf(hero) !== -1
      ? (<button type="button" onClick={(e) => this.props.removeHeroBans(hero)}>Remove Ban</button>)
      : (<button type="button" onClick={(e) => this.props.addHeroBans(hero)}>Bans</button>)
  }

 
  render() {
    
    return (
      <div className="App">
        <div id="teams container">
          <div id="radiant">
            <h2>Radiant</h2>
            {this.state.radiantTeam ? (
              <div>
              {this.state.radiantTeam.map((hero) => {
                return(
	          <div key={hero.id}>
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
	          <div key={hero.id}>
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
	          <div key={hero.id}>
                    <p>{hero.localized_name}</p>
                    <img src={hero.image} alt="banned hero"/>
                    {this.toggleBansButton(hero)}
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
 
