import React, {Component} from 'react';

class Picks extends Component {
  constructor(props){
    super(props);
    this.state = {
      radiantTeam: [],
      direTeam: [],
      direTopPicks: [],
      direBottomPicks: [],
      radiantTopPicks: [],
      radiantBottomPicks: []
   }
  }

  getHello(){
    return "Hello"
  }

  showWorstPicks(){
    console.log("called showWorstPicks");
    const radiantTopPicks = this.props.radiantTopPicks;
    const showList = radiantTopPicks.map((pick) => {
      console.log(pick);
      return (<li key={radiantTopPicks.indexOf(pick)}>{pick}</li> )
      }
    );
    
    return <ul>{showList}</ul>
  }
  
  showEmpty(){
    return <p>This is empty</p>
  }

  toggleWorstPicks(){
    if(this.props.radiantTopPicks.length > 0) {
      return this.showWorstPicks()
    } else {
      return this.showEmpty()
    }
  }
  render() {
         
    return(
      <div className="App">
        <div className="WorstPicks">
          <h2>!!!</h2>
          {this.props.radiantTopPicks ? (
            <ul id="WorstPicks">
              {this.props.radiantTopPicks.map((el, index) => {
               return(
                  <li key={index}>
                    <p>{el}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h2>No Picks Found</h2>
            </div>
          )}


        </div>
      </div>

    )
  }
}

export default Picks;
