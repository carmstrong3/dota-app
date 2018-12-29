import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import List from './pages/list/List';
import HeroesList from './pages/heroesList/HeroesList';
import Teams from './pages/teams/Teams';

class App extends Component {
  constructor(props) {
    super(props);
    this.addHeroRadiant = this.addHeroRadiant.bind(this);
    this.addHeroRadiant = this.addHeroRadiant.bind(this);
    this.state = {
      heroes: [],
      radiant: [],
      dire: [],
      bans: []
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
  
  // update win percentage on update
  componentDidUpdate() {
    this.getWinPercentage();
  }

  // Calculate the win percentage of the teams given the current picks
  getWinPercentage = () => {
    let radiant = this.state.radiant;
    let dire = this.state.dire;
    let bans = this.state.bans;
  }

  // Functionality to add hero
  addHeroToTeam = (hero) => {
    let radiant = this.state.radiant;
    let dire = this.state.dire;
    let bans = this.state.bans;
    
    return radiant.indexOf(hero) !== -1 
      ? this.setState({dire: dire.push(hero)}) && this.setState({radiant: radiant.splice(radiant.indexOf(hero), 1)})
      : (dire.indexOf(hero) !== -1
      ? this.setState({bans: bans.push(hero)}) && this.setState({dire: dire.splice(dire.indexOf(hero), 1)})
      : ((bans.indexOf(hero) !== -1)
      ? this.setState({bans: bans.splice(bans.indexOf(hero), 1)})
      : this.setState({radiant: radiant.push(hero)}))) 
  }

	
  // add hero selection handler
  addHeroRadiant = (hero) => { 
    let radiant = this.state.radiant;
    let newRadiant = radiant.concat(hero);
    this.setState({radiant: newRadiant})
  }
  
  // remove hero selection handler
  removeHeroRadiant = (hero) => {
    let radiant = this.state.radiant;
    console.log(radiant);
    let index = radiant.indexOf(hero);
    console.log(index);
    let newState = radiant.splice(index, 1);
    console.log(newState);
    console.log(radiant.indexOf(hero) === 0);
    console.log(radiant.indexOf(hero) === -1);
    this.setState({radiant: newState})
  }

  // add hero selection handler
  addHeroDire = (hero) => { 
    let dire = this.state.dire;
    let newDire = dire.concat(hero);
    this.setState({dire: newDire})
  }
  
  // remove hero selection handler
  removeHeroDire = (hero) => {
    let dire = this.state.dire;
    let index = dire.indexOf(hero);
    let newState = dire.splice(index, 1);
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
    let index = bans.indexOf(hero);
    let newState = bans.splice(index, 1);
    this.setState({bans: newState})
  }

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/heroesList' component={HeroesList} heroes={this.state.heroes}/>
        </Switch>
      </div>
    ) 
    return (
      <div>
        <Teams addHeroRadiant = {this.addHeroRadiant} removeHeroRadiant = {this.removeHeroRadiant} radiant={this.state.radiant} dire={this.state.dire} bans={this.state.bans}/>
        <HeroesList addHeroRadiant = {this.addHeroRadiant} removeHeroRadiant = {this.removeHeroRadiant} addHeroDire = {this.addHeroDire} removeHeroDire = {this.removeHeroDire} addHeroBans = {this.addHeroBans} removeHeroBans = {this.removeHeroBans} heroes={this.state.heroes} addHeroToTeam = {this.addHeroToTeam} radiant={this.state.radiant} dire={this.state.dire} bans={this.state.bans}/>
        <App/>
      </div>
   );
    
  }
}

export default App;
