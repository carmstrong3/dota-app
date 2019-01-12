import React, { Component } from 'react';
import './App.css';
import HeroesList from './pages/heroesList/HeroesList';
import Teams from './pages/teams/Teams';
import Picks from './pages/picks/Picks';

class App extends Component {
  constructor(props) {
    super(props);
    this.addHeroRadiant = this.addHeroRadiant.bind(this);
    this.removeHeroRadiant = this.removeHeroRadiant.bind(this);
    this.addHeroDire = this.addHeroDire.bind(this);
    this.removeHeroDire = this.removeHeroDire.bind(this);
    this.addHeroBans = this.addHeroBans.bind(this);
    this.removeHeroBans = this.removeHeroBans.bind(this);
    this.getWinPercentage = this.getWinPercentage.bind(this);

    this.state = {
      heroes: [],
      radiant: [],
      dire: [],
      bans: [],
      radiantWinrate: [],
      direWinrate: [],
      radiantPoints: 0,
      direPoints: 0,
      radiantTopPicks: [],
      radiantBottomPicks: [],
      direTopPicks: [],
      direBottomPicks: [],
      isRadiant: true,
   }
  }

  // Fetch the heroes on first mount
  componentDidMount() {
    this.getHeroes();
  }

/* // Need to make this logic work better. Need it to prevent multiple calls to this.getPointsRadiant when deleting heroes back down to 1 hero while allowing for initial rendering.

  shouldComponentUpdate(nextState){
    return nextState.radiantPoints !== 0 && this.state.radiantPoints !== 0
  }
*/

  


  // Retrieves the list of items from the Express App
  getHeroes = () => {
    fetch('/api/heroes')
    .then(res => res.json())
    .then(heroes => this.setState({ heroes }))
  }
 
  // Calculate the win percentage of the teams given the current picks
  getWinPercentage = () => {
    let radiant = this.state.radiant;
    let dire = this.state.dire;
    let radiantWinrateCopy = [];
    let direWinrateCopy = [];


    const heroMatchupVsAll = (heroId, teamWinrate) => {
      fetch(`api/heroes/${heroId}/matchups`)
      .then(res => res.json())
      .then(response => {
        for(let i=0; i < response.length; i++) {
          teamWinrate.push(response[i].wins/response[i].games_played)
        };
      })
      .catch((err) => console.log(err));
    };
 
    const heroMatchupVsOne = (heroId, matchupId, teamWinrate) => {
      fetch(`api/heroes/${heroId}/matchups/${matchupId}`)
      .then(res => res.json())
      .then(response => teamWinrate.push(response[0].wins/response[0].games_played))
      .catch((err) => console.log(err));
    };

    const getHeroWinrates = (hero, enemyTeam, teamWinrate) => {
      if (enemyTeam === null || undefined || enemyTeam.length === 0) {
        heroMatchupVsAll(hero.hero_id, teamWinrate)
      } else {
        for(let j=0; j < enemyTeam.length; j++) {
          heroMatchupVsOne(hero.hero_id, enemyTeam[j].hero_id, teamWinrate); 
        } 
      }
    };

    const getRadiantWinrate = (callback) => {
      if (radiant.length === 0) {
      }
      for(let i=0; i < radiant.length; i++) {
        getHeroWinrates(radiant[i], dire, radiantWinrateCopy);
      };
      callback()
    };
   
    const getDireWinrate = (callback) => {
      if (dire.length === 0) {
      }
      for(let i=0; i < dire.length; i++) {
        getHeroWinrates(dire[i], radiant, direWinrateCopy);
      };
      callback()
    };

    let setRadiant = () => {
      this.setState({radiantWinrate: radiantWinrateCopy})
    };

    let setDire = () => {
      this.setState({direWinrate: direWinrateCopy});
    };

    getRadiantWinrate(setRadiant);
    getDireWinrate(setDire);
     
  }

  getPointsRadiant = (winrate) => {
    if (winrate.length === 0) {
      return 0
    } else {
      let count = winrate[0];
      for (let i=1; i < winrate.length; i++) {
        count += winrate[i];
      };
      let points = count/winrate.length
      this.setState({radiantPoints: points});
    }
  }

   getPointsDire = (winrate) => {
    if (winrate.length === 0) {
      return 0
    } else {
      let count = winrate[0];
      for (let i=1; i < winrate.length; i++) {
        count += winrate[i];
      };
      let points = count/winrate.length
      this.setState({direPoints: points});
    }
  }

  
  // add hero selection handler
  addHeroRadiant = (hero) => { 
    let radiant = this.state.radiant;
    let newRadiant = radiant.concat(hero);
    this.setState({radiant: newRadiant}, this.getWinPercentage)
  }
  
  // remove hero selection handler
  removeHeroRadiant = (hero) => {
    let radiant = this.state.radiant;
    let newState = radiant.filter((radiantTeam) => radiantTeam.id !== hero.id);
    this.setState({radiant: newState}, this.getWinPercentage)
  }

  // add hero selection handler
  addHeroDire = (hero) => { 
    let dire = this.state.dire;
    let newDire = dire.concat(hero);
    this.setState({dire: newDire}, this.getWinPercentage);
  }
  
  // remove hero selection handler
  removeHeroDire = (hero) => {
    let dire = this.state.dire;
    let newState = dire.filter((direTeam) => direTeam.id !== hero.id);
    this.setState({dire: newState})
  }

  // add hero selection handler
  addHeroBans = (hero) => { 
    let bans = this.state.bans;
    let newBans = bans.concat(hero);
    this.setState({bans: newBans})
  }
  
  // remove hero selection handler
  removeHeroBans = (hero) => {
    let bans = this.state.bans;
    let newState = bans.filter(bansList => bansList.id !== hero.id);
    this.setState({bans: newState})
  }
/*
  getTopPicksRadiant = (dire) => {
    let topMatchups = [];
    let topPicks = [];
    let radiantTopPicks = this.state.radiantTopPicks;
    if (dire.length === 0) {
      console.log("Dire team is empty")
    } else {
// clear the state
      this.setState({radiantTopPicks: this.state.radiantTopPicks.filter(x => !x)});
// iterate over dire team
      for(let i=0; i < dire.length; i++){
// grab top picks vs the current dire team
        fetch(`api/heroes/${dire[i].hero_id}/picks/top`)
        .then(res => res.json())
// translate matchup_id to hero name for each of the picks
        .then(picks => { 
          picks.forEach(pick => topMatchups.push(pick));
          topMatchups.forEach(matchup => {
            fetch(`api/heroes/${matchup.matchup_id}`)
            .then(res => res.json())
            .then(hero => this.setState({radiantTopPicks: [...this.state.radiantTopPicks, hero[0].localized_name]}))
            .catch(err => console.log(err));
          });
         
        });
      }
  
    }
    console.log(topPicks);
  }
*/
  getTopPicks = (dire, radiant) => {
    if (dire.length === 0) {
      this.setState({radiantTopPicks: this.state.radiantTopPicks.filter(x => !x)}); 
      console.log("Dire team is empty");
    } else {

      let topPicks = [];
// clear the state

      const getMatchupId = (dire) => { 
// iterate over dire team
        for(let i=0; i < dire.length; i++){

        let topMatchups = [];
// grab top picks vs the current dire team
          fetch(`api/heroes/${dire[i].hero_id}/picks/top`)
          .then(res => res.json())
// translate matchup_id to hero name for each of the picks
          .then(picks => { picks.forEach(pick => topMatchups.push(pick))})
          .then(() => topMatchups.forEach(matchup => getHeroId(matchup.matchup_id)))
          .then(() => setRadiantPicks())
          .catch(err => console.log(err))
        };
      };
      
      const getHeroId = (heroId) => {
        fetch(`api/heroes/${heroId}`)
        .then(res => res.json())
        .then(hero => topPicks.push(hero[0].localized_name))
        .catch(err => console.log(err));
      };
    
      const setRadiantPicks = () => {
        this.setState({radiantTopPicks: topPicks});
      };   

      getMatchupId(dire);
    }

    if (radiant.length === 0) {
      this.setState({direTopPicks: this.state.direTopPicks.filter(x => !x)});
      console.log("Radiant team is empty")
    } else {

      let topPicks = [];

      const getMatchupId = (radiant) => { 
// iterate over radiant team
        for(let i=0; i < radiant.length; i++){

        let topMatchups = [];
// grab top picks vs the current radiant team
          fetch(`api/heroes/${radiant[i].hero_id}/picks/top`)
          .then(res => res.json())
// translate matchup_id to hero name for each of the picks
          .then(picks => { picks.forEach(pick => topMatchups.push(pick))})
          .then(() => topMatchups.forEach(matchup => getHeroId(matchup.matchup_id)))
          .then(() => setDirePicks())
          .catch(err => console.log(err))
        };
      };
      
      const getHeroId = (heroId) => {
        fetch(`api/heroes/${heroId}`)
        .then(res => res.json())
        .then(hero => topPicks.push(hero[0].localized_name))
        .catch(err => console.log(err));
      };
    
      const setDirePicks = () => {
        this.setState({direTopPicks: topPicks});
      };   

      getMatchupId(radiant);
    } 

  }

  getBottomPicks = (dire, radiant) => {
    if (dire.length === 0) {
      this.setState({radiantBottomPicks: this.state.radiantBottomPicks.filter(x => !x)});
      console.log("Dire team is empty")
    } else {

      let bottomPicks = [];

      const getMatchupId = (dire) => { 
// iterate over dire team
        for(let i=0; i < dire.length; i++){

        let bottomMatchups = [];
// grab top picks vs the current dire team
          fetch(`api/heroes/${dire[i].hero_id}/picks/bottom`)
          .then(res => res.json())
// translate matchup_id to hero name for each of the picks
          .then(picks => { picks.forEach(pick => bottomMatchups.push(pick))})
          .then(() => bottomMatchups.forEach(matchup => getHeroId(matchup.matchup_id)))
          .then(() => setRadiantPicks())
          .catch(err => console.log(err))
        };
      };
      
      const getHeroId = (heroId) => {
        fetch(`api/heroes/${heroId}`)
        .then(res => res.json())
        .then(hero => bottomPicks.push(hero[0].localized_name))
        .catch(err => console.log(err));
      };
    
      const setRadiantPicks = () => {
        this.setState({radiantBottomPicks: bottomPicks});
      };   

      getMatchupId(dire);
    }

    if (radiant.length === 0) {
      this.setState({direBottomPicks: this.state.direBottomPicks.filter(x => !x)});
      console.log("Radiant team is empty");
    } else {

      let bottomPicks = [];
// clear the state
      this.setState({direBottomPicks: this.state.direBottomPicks.filter(x => !x)});

      const getMatchupId = (radiant) => { 
// iterate over radiant team
        for(let i=0; i < radiant.length; i++){

        let bottomMatchups = [];
// grab top picks vs the current radiant team
          fetch(`api/heroes/${radiant[i].hero_id}/picks/bottom`)
          .then(res => res.json())
// translate matchup_id to hero name for each of the picks
          .then(picks => { picks.forEach(pick => bottomMatchups.push(pick))})
          .then(() => bottomMatchups.forEach(matchup => getHeroId(matchup.matchup_id)))
          .then(() => setDirePicks())
          .catch(err => console.log(err))
        };
      };
      
      const getHeroId = (heroId) => {
        fetch(`api/heroes/${heroId}`)
        .then(res => res.json())
        .then(hero => bottomPicks.push(hero[0].localized_name))
        .catch(err => console.log(err));
      };
    
      const setDirePicks = () => {
        this.setState({direBottomPicks: bottomPicks});
      };   

      getMatchupId(radiant);
    } 

  }

  setRadiant = () => {
    if(this.state.isRadiant !== true){
      this.setState({isRadiant: true});
    }
  }

  setDire = () => {
    if(this.state.isRadiant === true){
      this.setState({isRadiant: false});
    }
  }

  render() {
    return (
      <div className="App"> 
        <div className="TeamsContainer">
        <Teams setRadiant={this.setRadiant} setDire={this.setDire} isRadiant={this.state.isRadiant} getPointsDire={this.getPointsDire} getPointsRadiant = {this.getPointsRadiant} direPoints = {this.state.direPoints} radiantPoints = {this.state.radiantPoints} radiantWinrate = {this.state.radiantWinrate} direWinrate = {this.state.direWinrate} showRadiantWinrate = {this.showRadiantWinrate} getPoints = {this.getPoints} getWinPercentage = {this.getWinPercentage} removeHeroBans = {this.removeHeroBans} removeHeroDire = {this.removeHeroDire} addHeroRadiant = {this.addHeroRadiant} removeHeroRadiant = {this.removeHeroRadiant} radiant={this.state.radiant} dire={this.state.dire} bans={this.state.bans}/>
        </div> 
        <div className="PicksContainer">
          <Picks getBottomPicks={this.getBottomPicks} direBottomPicks={this.state.direBottomPicks} radiantBottomPicks={this.state.radiantBottomPicks} isRadiant={this.state.isRadiant} direTopPicks={this.state.direTopPicks} getTopPicks={this.getTopPicks} radiantTopPicks={this.state.radiantTopPicks} heroes={this.state.heroes} radiant={this.state.radiant} dire={this.state.dire}/>
        </div>
        <div className="HeroesListContainer">
          <HeroesList getWinPercentage = {this.getWinPercentage} addHeroRadiant = {this.addHeroRadiant} removeHeroRadiant = {this.removeHeroRadiant} addHeroDire = {this.addHeroDire} removeHeroDire = {this.removeHeroDire} addHeroBans = {this.addHeroBans} removeHeroBans = {this.removeHeroBans} heroes={this.state.heroes} radiant={this.state.radiant} dire={this.state.dire} bans={this.state.bans}/>
        </div>
      </div>
   );
    
  }
}

export default App;
