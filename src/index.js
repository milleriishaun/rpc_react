import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Next(props) {
  return (
    <button onClickNext={props.onClickNext}>
      Next
    </button>
  );
}

function Resolved(props) {
  if (props.bothSelected) {
    return (
      <button disabled>
        Resolve! {props.bothSelected}
      </button>
    );
  } else {
    return (
      <button onClickResolve={props.onClickResolve}>
        Resolve!{props.bothSelected}
      </button>
    );
  }
}

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
    };
  }

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value,
    });
    e.preventDefault();
  }

  renderPlayer1() {
    return (
      <div>
        <h3 onSubmit1={(event) => this.props.onSubmit1(event)}>
          {this.props.p1Turn ? this.props.p1Choice : this.props.p2Choice}
        </h3>

        <div className="p1">
          <div className="p1-stats">
            {this.props.p1HP}
            {this.props.p1Choice}
          </div>
          <div className="p1-form">
            <form
              onSubmit1={(event) => this.props.onSubmit1(event)}>
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
                <button
                  className="p1-submit"
                  type="submit"
                  id="attackButton"
                >
                  Attack!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  renderPlayer2() {
    return (
      <div>
        <h3 onSubmit2={(event) => this.props.onSubmit2(event)}>
          {this.props.p1Turn ? this.props.p1Choice : this.props.p2Choice}
        </h3>

        <div className="p2">
          <div className="p2-stats">
            {this.props.p2HP}
            {this.props.p2Choice}
          </div>
          <div className="p2-form">
            <form
              onSubmit2={(event) => this.props.onSubmit2(event)}>
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
                <button className="p2-submit" type="submit" id="attackButton">
                  Attack!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.showPlayer1 && this.props.showPlayer2) {
      return (
        <div className="player-stats">
          {this.props.p1Choice}
          {this.renderPlayer1()}
          {this.renderPlayer2()}
        </div>
      );
    } else if(!this.props.showPlayer1) {
      return (
        <div className="player-stats">
          {this.renderPlayer2()}
        </div>
      );
    } else if(!this.props.showPlayer2) {
      return (
        <div className="player-stats">
          {this.renderPlayer1()}
        </div>
      );
    } else {
      return null;
    }
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayer1: true,
      showPlayer2: true,
      isReversed: false,
      p1Turn: true,
    };
  }

  handleMenuChange = e => {
    this.setState({
      isSelectedCampaign: e.target.value,
    });
    e.preventDefault();
  }

  handleMenuSubmit = e => {
    this.setState({
      isSelectedCampaign: e.target.value,
    });
    e.preventDefault();
  }

  render() {
    const turn = "It is " + (this.state.p1Turn ? "Player 1" : "Player 2") + "'s turn";

    return (
      <div className="whole-menu">
        <div className="game-menu">
          <form
            onSubmit={this.handleMenuSubmit}>
            <label>
              Choose a new battle campaign!
              <select
                value={this.props.isSelectedCampaign}
                onChange={this.handleMenuChange}
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
        <div className="players-turn">
          {turn}
        </div>
        <div className="game-players">
          <Players
            isSelectedCampaign={this.props.isSelectedCampaign}
            p1Choice={this.props.p1Choice}
            p2Choice={this.props.p2Choice}
            p1HP={this.props.p1HP}
            p2HP={this.props.p2HP}
            p1WonBattle={this.props.p1WonBattle}
            bothSelected={this.props.bothSelected}
            showPlayer1={this.state.showPlayer1}
            showPlayer2={this.state.showPlayer2}
            isReversed={this.state.isReversed}
            p1Turn={this.state.p1Turn}
          />
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedCampaign: "",
      p1Choice: "",
      p2Choice: "",
      p1HP: 500,
      p2HP: 500,
      bothSelected: false,
      p1WonBattle: false,
    };
  }

  handleFormChange1 = e => {
    this.setState({
      p1Choice: e.target.value,
    });
    e.preventDefault();
  }

  handleFormChange2 = e => {
    this.setState({
      p2Choice: e.target.value,
    });
    e.preventDefault();
  }

  handleFormSubmit1 = e => {
    if (this.props.p1Choice !== "") {
      this.setState({
        bothSelected: !this.state.bothSelected,
      });
    } else {
      this.setState({
        showPlayer1: !this.showPlayer1,
        p1Turn: !this.state.p1Turn,
      });
    }
    e.preventDefault();
  }

  handleFormSubmit2 = e => {
    if (this.props.p1Choice !== "") {
      this.setState({
        bothSelected: !this.state.bothSelected,
      });
    } else {
      this.setState({
        showPlayer2: !this.state.showPlayer2,
        p1Turn: !this.state.p1Turn,
      });
    }
    e.preventDefault();
  }

  handleResolveClick = e => {
    const damage = calculateDamage(this.state.isSelectedCampaign, this.state.p1Choice, this.state.p2Choice);
    if (damage[1] > damage[2]) {
      this.setState({
        p2HP: this.state.p1HP - damage[0],
        p1WonBattle: true,
        bothSelected: true,
      });
    } else if (damage[1] < damage[2]) {
      this.setState({
        p1HP: this.state.p1HP - damage[0],
        p1WonBattle: false,
        bothSelected: true,
      });
    } else {
      this.setState({
        bothSelected: true,
      });
      alert('tie, press Next to battle again');
    }
    e.preventDefault();
  }

  handleNextClick = e => {
    this.setState({
      p1Choice: "",
      p2Choice: "",
      p1WonBattle: false,
      bothSelected: false,
    });
    e.preventDefault();
  }

  render() {
    if (this.state.p1HP <= 0) {
      alert('Player 2 has won the war!');
    } else if (this.state.p2HP <= 0) {
      alert('Player 1 has won the war!');
    } else {
      return (
        <div className="game">
          <div className="game-title">
            Rock, Paper, Scissors
          </div>
          <Menu
            isSelectedCampaign={this.state.isSelectedCampaign}
            p1Choice={this.state.p1Choice}
            p2Choice={this.state.p2Choice}
            p1HP={this.state.p1HP}
            p2HP={this.state.p2HP}
            bothSelected={this.state.bothSelected}
            p1WonBattle={this.state.p1WonBattle}
            onClick1={this.handleFormChange1}
            onClick2={this.handleFormChange2}
            onSubmit1={this.handleFormSubmit1}
            onSubmit2={this.handleFormSubmit2}
          />
          <div className="game-resolve">
            <Resolved
              bothSelected={this.state.bothSelected}
              onClickResolve={this.handleResolveClick}
            />
          </div>
          <div className="game-next">
            <Next
              onClickNext={this.handleNextClick}
            />
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateDamage(isSelectedCampaign, p1Choice, p2Choice) {
  let campaignStats = {
    "mage": {
      softCounter: 100,
      hardCounter: 200,
    },
    "melee": {
      softCounter: 100,
      hardCounter: 200,
    },
    "yolo": {
      softCounter: 100,
      hardCounter: 200,
    },
    "spock": {
      softCounter: 100,
      hardCounter: 200,
    },
    "whale": {
      softCounter: 100,
      hardCounter: 200,
    }
  };
  let attacks = ["attack1", "attack2", "attack3", "attack4", "attack5"];
  let indexOfP1Choice = attacks.indexOf(p1Choice);
  let indexOfP2Choice = attacks.indexOf(p2Choice);

  if (campaignStats.includes(isSelectedCampaign) && (indexOfP1Choice !== -1) && (indexOfP2Choice !== -1)) {
    for (let i in campaignStats) {
      if (isSelectedCampaign === campaignStats[i]) {
        switch (campaignStats[i]) {
          case "mage":
            let damageArr = [
              [0, 100, 0, 200, 0],
              [0, 0, 100, 0, 200],
              [200, 0, 0, 100, 0],
              [0, 200, 0, 0, 100],
              [100, 0, 200, 0, 0]
            ]
            for (let i = 0; i < damageArr.length; i++) {
              for (let j = 0; j < damageArr.length; j++) {
                if (indexOfP1Choice === i && indexOfP2Choice === j) {
                  return [damageArr[i][j], i, j];
                }
              }
            }
            break;
          case "spock":
            damageArr = [
              [0, 100, 0, 200, 0],
              [0, 0, 100, 0, 200],
              [200, 0, 0, 100, 0],
              [0, 200, 0, 0, 100],
              [100, 0, 200, 0, 0]
            ]
            for (let i = 0; i < damageArr.length; i++) {
              for (let j = 0; j < damageArr.length; j++) {
                if (indexOfP1Choice === i && indexOfP2Choice === j) {
                  return [damageArr[i][j], i, j];
                }
              }
            }
            break;
          default:
            alert('broken calculateDamage');
            break;
        }
      } else {
        alert('no campaign match');
      }

    }
  } else {
    alert('campaign not included, needs more code')
  }
}
