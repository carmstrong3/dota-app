import React, { Component } from 'react';

class HeroesList extends Component {
  // Initialize the state

  filterHeroes() {
    // Declare variables
    let input, filter, ul, li, p, i, txtValue;
    input = document.getElementById('heroesSearchbar');
    filter = input.value.toUpperCase();
    ul = document.getElementById("unorderedHeroesList");
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
  


  render() {

    return (
      <div className="App">
        <div className="HeroesList">
          <h1>List of Heroes</h1>
          <input type="text" id="heroesSearchbar" onkeyup="{() => this.filterHeroes()}" placeholder="Enter Hero Name" title="Enter name here"/>
          {/* Check to see if any heroes are found*/}
          {this.props.heroes ? (
            <ul id="unorderedHeroesList">
              {/*Render the list of heroes */}
              {this.props.heroes.map((hero) => {
               return(
                  <li onClick="{() => addHeroToTeam()}">
                    <p>{hero.localized_name}</p>
                    <img src={hero.image} alt="hero"/>
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
      </div>
    );
  }
}

export default HeroesList;

