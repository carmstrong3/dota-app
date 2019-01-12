import React, { Component } from 'react';

class HeroesList extends Component {
  // Initialize the state

  filterHeroes() {
    // Declare variables
    let input, filter, ul, li, p, i, txtValue;
    input = document.getElementById('heroesSearchbar');
    filter = input.value.toUpperCase();
    ul = document.getElementById("HeroesList");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      p = li[i].getElementsByTagName("p")[0];
      txtValue = p.textContent || p.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  toggleRadiantButton(hero) {
    return this.props.radiant.indexOf(hero) !== -1
      ? (<button type="button" onClick={(e) => this.props.removeHeroRadiant(hero)}>Remove Radiant</button>)
      : (<button type="button" onClick={(e) => this.props.addHeroRadiant(hero)}>Radiant</button>)
  }

  toggleDireButton(hero) {
    return this.props.dire.indexOf(hero) !== -1
      ? (<button type="button" onClick={(e) => this.props.removeHeroDire(hero)}>Remove Dire</button>)
      : (<button type="button" onClick={(e) => this.props.addHeroDire(hero)}>Dire</button>)
  }

  toggleBansButton(hero) {
    return this.props.bans.indexOf(hero) !== -1
      ? (<button type="button" onClick={(e) => this.props.removeHeroBans(hero)}>Remove Ban</button>)
      : (<button type="button" onClick={(e) => this.props.addHeroBans(hero)}>Bans</button>)
  }

  render() {

    return (
        <div className="HeroesListContainer">
          <h1>List of Heroes</h1>
          <input type="text" id="heroesSearchbar" onKeyUp={() => this.filterHeroes()} placeholder="Enter Hero Name" title="Enter name here"/>
          {/* Check to see if any heroes are found*/}
          {this.props.heroes ? (
            <ul id="HeroesList">
              {/*Render the list of heroes */}
              {this.props.heroes.map((hero) => {
               return(
                  <li key={hero.id}>
                    <p>{hero.localized_name}</p>
                    {this.toggleRadiantButton(hero)}
                    {this.toggleDireButton(hero)}
                    {this.toggleBansButton(hero)}                     
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h2>No Heroes Found</h2>
            </div>
          )}
        </div>
    );
  }
}

export default HeroesList;

