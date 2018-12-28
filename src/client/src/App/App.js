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

  }

  // Functionality to add hero
  addHeroToTeam = (hero) => {
    let radiant = this.radiant;
    let dire = this.dire;
    let bans = this.bans;
    
    return radiant.indexOf(hero) !== -1 
      ? dire.push(hero) & radiant.splice(radiant.indexOf(hero), 1)
      : (dire.indexOf(hero) !== -1
      ? bans.push(hero) & dire.splice(dire.indexOf(hero), 1)
      : ((bans.indexOf(hero) !== -1)
      ? bans.splice(bans.indexOf(hero), 1)
      : radiant.push(hero))) 
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
        <Teams addHeroToTeam = {this.addHeroToTeam} radiant={this.state.radiant} dire={this.state.dire} bans={this.state.bans}/>
        <HeroesList heroes={this.state.heroes} addHeroToTeam = {this.addHeroToTeam}/>
        <App/>
      </div>
   );
    
  }
}

export default App;
