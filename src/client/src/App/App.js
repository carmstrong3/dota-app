import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import List from './pages/list/List';
import HeroesList from './pages/heroesList/HeroesList';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/heroesList' component={HeroesList}/>
        </Switch>
      </div>
    ) 
    return (
      <Switch>
        <App/>
      </Switch>
   );
    
  }
}

export default App;
