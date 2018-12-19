import React, { Component } from 'react';

class HeroesList extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      heroes: []
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

  render() {
    const { heroes } = this.state;
    console.log(heroes);
    return (
      <div className="App">
        <h1>List of Heroes</h1>
        {/* Check to see if any heroes are found*/}
        {heroes ? (
          <div>
            {/*Render the list of heroes */}
            {heroes.keys((item) => {
              console.log("heroes inside keys: " + item);
              return(
                <div>
                  {item.localized_name}
                  {item.primary_attr}
                  {item.roles}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No Heroes Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default HeroesList;

