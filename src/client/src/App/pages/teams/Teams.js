import React, {Component} from 'react';

class Teams extends Component {

  toggleBansButton(hero) {
    return this.props.bans.indexOf(hero) !== -1
      ? (<button type="button" onClick={(e) => this.props.removeHeroBans(hero)}>Remove</button>)
      : (<button type="button" onClick={(e) => this.props.addHeroBans(hero)}>Bans</button>)
  }

  toggleTeamsButton() {
    return this.props.isRadiant
      ? (<button type="button" className="teamToggleButton" onClick={(e) => this.props.setDire()}>Radiant</button>)
      : (<button type="button" className="teamToggleButton" onClick={(e) => this.props.setRadiant()}>Dire</button>)
  }



  toggleWinrateContainer() {
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
    
    return (
        <div id="teamsContainer">
          <div className="WinCalc-Container">
            <h2>Set your team</h2>
            {this.toggleTeamsButton()}
            <h3>Check your current odds</h3>
            {this.toggleWinrateContainer()}     
          </div>         
          <div id="teams"> 
          <div id="radiantTeam">
            <h2>Radiant</h2>
            {this.props.radiant ? (
              <div id="radiantTeamMap">
              {this.props.radiant.map((hero) => {
                return(
	                <div key={hero.id} className="teamMember">
                    <p>{hero.localized_name}</p>
                    <button type="button" onClick={(e) => this.props.removeHeroRadiant(hero)}>Remove</button>          
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
       <div id="direTeam">
          <h2>Dire</h2>
            {this.props.dire ? (
              <div id="direTeamMap">
              {this.props.dire.map((hero) => {
                return(
	          <div key={hero.id} className="teamMember">
                    <p>{hero.localized_name}</p>
                    <button type="button" onClick={(e) => this.props.removeHeroDire(hero)}>Remove</button>
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
        <div id="bans">
          <h2>Bans</h2>
            {this.props.bans ? (
              <div>
              {this.props.bans.map((hero) => {
                return(
	          <div key={hero.id} className="teamMember">
                    <p>{hero.localized_name}</p>
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
    );
  }
}

export default Teams;
 
