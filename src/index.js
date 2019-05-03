import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Move(props) {
  return (
    <button
      className={"move" + (props.isWinning ? "--winning" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hp: 500,
      choice:"",
      reverse: false,
      HIT_POINTS: 500,
      SOFT_DAMAGE: 100,
      HARD_DAMAGE: 200,
      softCounter: 100,
      hardCounter: 200,
    };
  }

  renderPlayer(i) {
    return (
      <Move
        isWinning={this.props.winningPlayers.includes(i)}
        key={"player " + i}
        value={this.props.players[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  handleResolve(event) {
    if(this.state.choice == "") {

      if (document.getElementById('attack1').checked) {
        this.state.choice = document.getElementById('attack1').value;
      } else if (document.getElementById('attack2').checked) {
        this.state.choice = document.getElementById('attack2').value;
      } else if (document.getElementById('attack3').checked) {
        this.state.choice = document.getElementById('attack3').value;
      } else if (document.getElementById('attack4').checked) {
        this.state.choice = document.getElementById('attack4').value;
      } else if (document.getElementById('attack5').checked) {
        this.state.choice = document.getElementById('attack5').value;
      } else {
        alert("No attack selected!");
      }

    } else {
      alert("Both players have chosen!");
    }
    
    let damage = resolve(this);
    alert('The loser of the battle took this much damage: ', damage);
    event.preventDefault();
  }

  render() {

    return (
      <div>
        <div>
          <div className="player-column">
            {this.renderPlayer(0)}
          </div>
          <div className="player-column">
            {this.renderPlayer(1)}
          </div>
        </div>
        <div className="battle-resolve">
          <button onClick={this.handleResolve} id="resolveButton">Resolve</button>
        </div>
      </div>
    )
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'attack1',
      history: [{
        players: Array(2).fill(null),
      }],
      stepNumber: 0,
      p1IsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const players = current.players.slice();

    let p1Choice = 'X';
    let p2Choice = 'O';

    players[i] = this.state.p1IsNext ? p1Choice : p2Choice;

    this.setState({
      history: history.concat([{
        players: players,
      }]),
      stepNumber: history.length,
      p1IsNext: !this.state.p1IsNext,
    });
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    alert("You have submitted: " + this.state.selectedOption);
  }
  
  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.players);

    let p1Choice = 'X';
    let p2Choice = 'O';

    let status;
    if(winner) {
      status = 'Winner: ' + winner.gesture;
    } else if(!current.players.includes(null)) {
      status = 'Draw!'
    } else {
      status = 'Next player: ' + (this.state.p1IsNext ? p1Choice : p2Choice);
    }

    return (
      <div className="game-players">
        <div className="container">
          <div className="row mt-5">
            <div className="col-sm-12">
              <form onsSubmit={this.handleFormSubmit}>
                <div className="form-check">
                  <label for="attack1" id="attack1_label">
                    <input type="radio" name="attack" value="attack1" checked={this.state.selectedOption === "attack1"} onChange={this.handleOptionChange} className="form-check-input" id="attack1"/>
                    Fire Ball!
                  </label>
                  <br/>
                </div>
                <div className="form-check">
                  <label for="attack2" id="attack2_label">
                    <input type="radio" name="attack" value="attack2" checked={this.state.selectedOption === "attack2"} onChange={this.handleOptionChange} className="form-check-input" id="attack2"/>
                    Lightning Bolt!
                  </label>
                  <br/>
                </div>
                <div className="form-check">
                  <label for="attack3" id="attack3_label">
                    <input type="radio" name="attack" value="attack3" checked={this.state.selectedOption === "attack3"} onChange={this.handleOptionChange} className="form-check-input" id="attack3"/>
                    Water Blast!
                  </label>
                  <br/>
                </div>
                <div className="form-check">
                  <label for="attack4" id="attack4_label">
                    <input type="radio" name="attack" value="attack4" checked={this.state.selectedOption === "attack4"} onChange={this.handleOptionChange} className="form-check-input" id="attack4"/>
                    Wind Gust!
                  </label>
                  <br/>
                </div>
                <div className="form-check">
                  <label for="attack5" id="attack5_label">
                    <input type="radio" name="attack" value="attack5" checked={this.state.selectedOption === "attack5"} onChange={this.handleOptionChange} className="form-check-input" id="attack5"/>
                    Earth Stomp!
                  </label>
                  <br/>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary mt-2" type="submit" id="attackButton">
                    Attack!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Player
          winningPlayers={winner ? winner.whichP : []}
          players={current.players}
          onClick={(i) => this.handleClick(i)}
        />
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'spock',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    alert('Your chosen battle campaign is: ', this.state.value);
    event.preventDefault();
  }
  render() {

    return (
      // this is the HTML
      // note that React has its own Form component and system
      <div className="game">
        <div className="game-title">
          <h1 id="header"> Block, Paper, Scissors </h1>
        </div>
        <div className="game-menu">
          <form onSubmit={this.handleSubmit}>
            <label>
              Choose a new battle campaign!
              <select
                value={this.state.value}
                onChange={this.handleChange}
                id="menu"
              >
                <option value="mage">Mage</option>
                <option value="melee">Melee</option>
                <option value="yolo">YOLO</option>
                <option value="spock">Spock</option>
                <option value="whale">Whale</option>
              </select>
            </label>
            <input
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        <Menu />
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(players) {
  alert('Both players have chosen!');
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/* 
function menu(){
  var option = document.getElementById('menu').value;
  if(option == "mage"){
      reverse = false;
      document.getElementById("attack1_label").innerHTML = "Fire Ball!";
      document.getElementById("attack2_label").innerHTML = "Lightning Bolt!";
      document.getElementById("attack3_label").innerHTML = "Water Blast!";
      document.getElementById("attack4_label").innerHTML = "Wind Gust!";
      document.getElementById("attack5_label").innerHTML = "Earth Stomp!";
  }
  else if(option == "melee"){
      reverse = false;
      document.getElementById("attack1_label").innerHTML = "Charge!";
      document.getElementById("attack2_label").innerHTML = "Lunge!";
      document.getElementById("attack3_label").innerHTML = "Slash!";
      document.getElementById("attack4_label").innerHTML = "Riposte!";
      document.getElementById("attack5_label").innerHTML = "Deflect!";
  }
  else if(option == "yolo"){
      reverse = true;
      document.getElementById("attack1_label").innerHTML = "Jeep!";
      document.getElementById("attack2_label").innerHTML = "Helo!";
      document.getElementById("attack3_label").innerHTML = "Bomber!";
      document.getElementById("attack4_label").innerHTML = "Fighter!";
      document.getElementById("attack5_label").innerHTML = "Tank!";
  }
  else if(option == "spock"){
      reverse = false;
      document.getElementById("attack1_label").innerHTML = "Rock!";
      document.getElementById("attack2_label").innerHTML = "Lizard!";
      document.getElementById("attack3_label").innerHTML = "Paper!";
      document.getElementById("attack4_label").innerHTML = "Scissors!";
      document.getElementById("attack5_label").innerHTML = "Spock!";
  }
  else if(option == "whale"){
      reverse = false;
      document.getElementById("attack1_label").innerHTML = "Whale!";
      document.getElementById("attack2_label").innerHTML = "Plankton!";
      document.getElementById("attack3_label").innerHTML = "Orca!";
      document.getElementById("attack4_label").innerHTML = "Minnows!";
      document.getElementById("attack5_label").innerHTML = "Dolphins!";
  }
  if(reverse){
      softCounter = HARD_DAMAGE;
      hardCounter = SOFT_DAMAGE;
  } else {
      softCounter = SOFT_DAMAGE;
      hardCounter = HARD_DAMAGE;
  }
}
 */

function resolve(props){
  /*
  attack1 counters attack2 and attack4
  attack2 counters attack5 and attack3
  attack3 counters attack1 and attack5
  attack4 counters attack3 and attack2
  attack5 counters attack4 and attack1
  //*/
  if(player1.this.state.choice != "" && player2.choice != ""){
      if(player1.choice == document.getElementById('attack1').value){
          if(player2.choice == document.getElementById('attack2').value)
              player2.hp -= softCounter;
          if(player2.choice == document.getElementById('attack4').value)
              player2.hp -= hardCounter;
          if(player2.choice == document.getElementById('attack3').value)
              player1.hp -= softCounter;
          if(player2.choice == document.getElementById('attack5').value)
              player1.hp -= hardCounter;
      }
      if(player1.choice == document.getElementById('attack2').value){
          if(player2.choice == document.getElementById('attack5').value)
              player2.hp -= softCounter;
          if(player2.choice == document.getElementById('attack3').value)
              player2.hp -= hardCounter;
          if(player2.choice == document.getElementById('attack1').value)
              player1.hp -= softCounter;
          if(player2.choice == document.getElementById('attack4').value)
              player1.hp -= hardCounter;
      }
      if(player1.choice == document.getElementById('attack3').value){
          if(player2.choice == document.getElementById('attack1').value)
              player2.hp -= softCounter;
          if(player2.choice == document.getElementById('attack5').value)
              player2.hp -= hardCounter;
          if(player2.choice == document.getElementById('attack4').value)
              player1.hp -= softCounter;
          if(player2.choice == document.getElementById('attack2').value)
              player1.hp -= hardCounter;
      }
      if(player1.choice == document.getElementById('attack4').value){
          if(player2.choice == document.getElementById('attack3').value)
              player2.hp -= softCounter;
          if(player2.choice == document.getElementById('attack2').value)
              player2.hp -= hardCounter;
          if(player2.choice == document.getElementById('attack5').value)
              player1.hp -= softCounter;
          if(player2.choice == document.getElementById('attack1').value)
              player1.hp -= hardCounter;
      }
      if(player1.choice == document.getElementById('attack5').value){
          if(player2.choice == document.getElementById('attack4').value)
              player2.hp -= softCounter;
          if(player2.choice == document.getElementById('attack1').value)
              player2.hp -= hardCounter;
          if(player2.choice == document.getElementById('attack2').value)
              player1.hp -= softCounter;
          if(player2.choice == document.getElementById('attack3').value)
              player1.hp -= hardCounter;
      }
      player1.choice = "";
      player2.choice = "";
      update();
      if( player1.hp <= 0 ){
          gameOver(player1);
      }
      if( player2.hp <= 0 ){
          gameOver(player2);
      }
  } else {
      alert("Both players need to pick.")
  }
}

function gameOver(deadPlayer){
  alert("GAME OVER! " + deadPlayer.name + " has been vaporized!");
}