import React, { Component } from 'react';
import './App.css';
import HeroesList from './pages/heroesList/HeroesList';
import Teams from './pages/teams/Teams';
import WinCalc from './pages/winCalc/WinCalc';

class App extends Component {
  constructor(props) {
    super(props);
    this.addHeroRadiant = this.addHeroRadiant.bind(this);
    this.removeHeroRadiant = this.removeHeroRadiant.bind(this);
    this.addHeroDire = this.addHeroDire.bind(this);
    this.removeHeroDire = this.removeHeroDire.bind(this);
    this.addHeroBans = this.addHeroBans.bind(this);
    this.removeHeroBans = this.removeHeroBans.bind(this);

    this.state = {
      heroes: [],
      radiant: [],
      dire: [],
      bans: [],
      radiantWinrate: [],
      direWinrate: []
   }
  }

  // Fetch the heroes on first mount
  componentDidMount() {
    this.getHeroes();
  }


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
        console.log("radiant team is empty")
      }
      for(let i=0; i < radiant.length; i++) {
        getHeroWinrates(radiant[i], dire, radiantWinrateCopy);
      };
      callback()
    };
   
    const getDireWinrate = (callback) => {
      if (dire.length === 0) {
        console.log("dire team is empty")
      }
      for(let i=0; i < dire.length; i++) {
        getHeroWinrates(dire[i], radiant, direWinrateCopy);
      };
      callback()
    };

    let setRadiant = () => {
      console.log("setRadiant called");
      this.setState({radiantWinrate: radiantWinrateCopy}, () => console.log(this.state.radiantWinrate));
    };

    let setDire = () => {
      console.log("setDire called");
      this.setState({direWinrate: direWinrateCopy}, () => console.log(this.state.direWinrate));
    };

    getRadiantWinrate(setRadiant);
    getDireWinrate(setDire);
     
  }

  showRadiantWinrate = () => {
    let copy = [...this.state.radiantWinrate];
    let sum = (acc, val) => acc + val;
    let answer = copy.reduce(sum)
    return answer
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
    this.setState({dire: newDire}, this.getWinPercentage)
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

  render() {
    return (
      <div> 
        <WinCalc radiantWinrate = {this.state.radiantWinrate} direWinrate = {this.state.direWinrate} showRadiantWinrate = {this.showRadiantWinrate}/>
        <Teams getWinPercentage = {this.getWinPercentage} removeHeroBans = {this.removeHeroBans} removeHeroDire = {this.removeHeroDire} addHeroRadiant = {this.addHeroRadiant} removeHeroRadiant = {this.removeHeroRadiant} radiant={this.state.radiant} dire={this.state.dire} bans={this.state.bans}/>
        <HeroesList getWinPercentage = {this.getWinPercentage} addHeroRadiant = {this.addHeroRadiant} removeHeroRadiant = {this.removeHeroRadiant} addHeroDire = {this.addHeroDire} removeHeroDire = {this.removeHeroDire} addHeroBans = {this.addHeroBans} removeHeroBans = {this.removeHeroBans} heroes={this.state.heroes} radiant={this.state.radiant} dire={this.state.dire} bans={this.state.bans}/>
      </div>
   );
    
  }
}

export default App;
