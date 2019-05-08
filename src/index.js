import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Next(props) {
  return (
    <button onClick={props.onClickNext}>
      Next
    </button>
  );
}

function Resolved(props) {
  if (!props.bothSelected) {
    return (
      <button disabled>
        Resolve! {props.bothSelected}
      </button>
    );
  } else {
    return (
      <button onClick={props.onClickResolve}>
        Resolve!{props.bothSelected}
      </button>
    );
  }
}

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange1 = this.handleFormChange1.bind(this);
    this.handleFormChange2 = this.handleFormChange2.bind(this);
    this.handleFormSubmit1 = this.handleFormSubmit1.bind(this);
    this.handleFormSubmit2 = this.handleFormSubmit2.bind(this);
  }

  handleFormChange1(e) {
    this.props.onFormChange1(e.target.value);
    e.preventDefault();
  }

  handleFormChange2(e) {
    this.props.onFormChange2(e.target.value);
    e.preventDefault();
  }

  handleFormSubmit1(e) {
    this.props.onFormSubmit1(e.target.value);
    e.preventDefault();
  }

  handleFormSubmit2(e) {
    this.props.onFormSubmit2(e.target.value);
    e.preventDefault();
  }

  renderPlayer1() {
    const isSelectedCampaign = this.props.isSelectedCampaign;
    const p1Choice = this.props.p1Choice;
    const p2Choice = this.props.p2Choice;
    const p1HP = this.props.p1HP;
    const p2HP = this.props.p2HP;
    const bothSelected = this.props.bothSelected;
    const p1WonBattle = this.props.p1WonBattle;
    const showPlayer1 = this.props.showPlayer1;
    const showPlayer2 = this.props.showPlayer2;
    const isReversed = this.props.isReversed;
    const p1Turn = this.props.p1Turn;

    return (
      <div>
        <h3>
          {p1Turn ? p1Choice : p2Choice}
        </h3>

        <div className="p1">
          <div className="p1-stats">
            {p1HP}
            {p1Choice}
          </div>
          <div className="p1-form">
            <form
              onSubmit={this.handleFormSubmit1}
            >
              <div className="form-check">
                <label for="attack1" id="attack1_label">
                  <input type="radio" name="attack" value="attack1" checked={this.handleFormChange1} onChange={this.handleFormChange1} className="form-check-input" id="attack1"/>
                  Fire Ball!
                </label>
                <br/>
              </div>
              <div className="form-check">
                <label for="attack2" id="attack2_label">
                  <input type="radio" name="attack" value="attack2" checked={this.handleFormChange1} onChange={this.handleFormChange1} className="form-check-input" id="attack2"/>
                  Lightning Bolt!
                </label>
                <br/>
              </div>
              <div className="form-check">
                <label for="attack3" id="attack3_label">
                  <input type="radio" name="attack" value="attack3" checked={this.handleFormChange1} onChange={this.handleFormChange1} className="form-check-input" id="attack3"/>
                  Water Blast!
                </label>
                <br/>
              </div>
              <div className="form-check">
                <label for="attack4" id="attack4_label">
                  <input type="radio" name="attack" value="attack4" checked={this.handleFormChange1} onChange={this.handleFormChange1} className="form-check-input" id="attack4"/>
                  Wind Gust!
                </label>
                <br/>
              </div>
              <div className="form-check">
                <label for="attack5" id="attack5_label">
                  <input type="radio" name="attack" value="attack5" checked={this.handleFormChange1} onChange={this.handleFormChange1} className="form-check-input" id="attack5"/>
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
    const isSelectedCampaign = this.props.isSelectedCampaign;
    const p1Choice = this.props.p1Choice;
    const p2Choice = this.props.p2Choice;
    const p1HP = this.props.p1HP;
    const p2HP = this.props.p2HP;
    const bothSelected = this.props.bothSelected;
    const p1WonBattle = this.props.p1WonBattle;
    const showPlayer1 = this.props.showPlayer1;
    const showPlayer2 = this.props.showPlayer2;
    const isReversed = this.props.isReversed;
    const p1Turn = this.props.p1Turn;

    return (
      <div>
        <h3>
          {p1Turn ? p1Choice : p2Choice}
        </h3>

        <div className="p2">
          <div className="p2-stats">
            {p2HP}
            {p2Choice}
          </div>
          <div className="p2-form">
            <form
              onSubmit={this.handleFormSubmit2}
            >
              <div className="form-check">
                <label for="attack1" id="attack1_label">
                  <input type="radio" name="attack" value="attack1" checked={this.handleFormChange2} onChange={this.handleFormChange2} className="form-check-input" id="attack1"/>
                  Fire Ball!
                </label>
                <br/>
              </div>
              <div className="form-check">
                <label for="attack2" id="attack2_label">
                  <input type="radio" name="attack" value="attack2" checked={this.handleFormChange2} onChange={this.handleFormChange2} className="form-check-input" id="attack2"/>
                  Lightning Bolt!
                </label>
                <br/>
              </div>
              <div className="form-check">
                <label for="attack3" id="attack3_label">
                  <input type="radio" name="attack" value="attack3" checked={this.handleFormChange2} onChange={this.handleFormChange2} className="form-check-input" id="attack3"/>
                  Water Blast!
                </label>
                <br/>
              </div>
              <div className="form-check">
                <label for="attack4" id="attack4_label">
                  <input type="radio" name="attack" value="attack4" checked={this.handleFormChange2} onChange={this.handleFormChange2} className="form-check-input" id="attack4"/>
                  Wind Gust!
                </label>
                <br/>
              </div>
              <div className="form-check">
                <label for="attack5" id="attack5_label">
                  <input type="radio" name="attack" value="attack5" checked={this.handleFormChange2} onChange={this.handleFormChange2} className="form-check-input" id="attack5"/>
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
    const isSelectedCampaign = this.props.isSelectedCampaign;
    const p1Choice = this.props.p1Choice;
    const p2Choice = this.props.p2Choice;
    const p1HP = this.props.p1HP;
    const p2HP = this.props.p2HP;
    const bothSelected = this.props.bothSelected;
    const p1WonBattle = this.props.p1WonBattle;
    const showPlayer1 = this.props.showPlayer1;
    const showPlayer2 = this.props.showPlayer2;
    const isReversed = this.props.isReversed;
    const p1Turn = this.props.p1Turn;

    if (showPlayer1 && showPlayer2) {
      return (
        <div className="player-stats">
          {p1HP}
          {p1Choice}
          {this.renderPlayer1()}
          {this.renderPlayer2()}
        </div>
      );
    } else if(!showPlayer1) {
      return (
        <div className="player-stats">
          {this.renderPlayer2()}
        </div>
      );
    } else if(!showPlayer2) {
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
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleMenuSubmit = this.handleMenuSubmit.bind(this);
  }


  handleMenuChange(e) {
    this.props.onMenuChange(e.target.value);
    e.preventDefault();
  }

  handleMenuSubmit(e) {
    this.props.onMenuSubmit(e.target.value);
    alert('e.target.value: ' + e.target.value);
    e.preventDefault();
  }

  render() {
    const turn = this.props.p1Turn;
    let turnLog = "It is " + (turn ? "Player 1" : "Player 2") + "'s turn";
    const isSelectedCampaign = this.props.isSelectedCampaign;
    const p1Choice = this.props.p1Choice;
    const p2Choice = this.props.p2Choice;
    const p1HP = this.props.p1HP;
    const p2HP = this.props.p2HP;
    const bothSelected = this.props.bothSelected;
    const p1WonBattle = this.props.p1WonBattle;
    const showPlayer1 = this.props.showPlayer1;
    const showPlayer2 = this.props.showPlayer2;
    const isReversed = this.props.isReversed;
    const p1Turn = this.props.p1Turn;
    const onFormChange1 = this.props.onFormChange1;
    const onFormChange2 = this.props.onFormChange2;
    const onFormSubmit1 = this.props.onFormSubmit1;
    const onFormSubmit2 = this.props.onFormSubmit2;

    return (
      <div className="whole-menu">
        <div className="game-menu">
          <form
            onSubmit={this.handleMenuSubmit}>
            <label>
              Choose a new battle campaign!
              <select
                value={isSelectedCampaign}
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
          {turnLog}
        </div>
        <div className="game-players">
          <Players
            isSelectedCampaign={isSelectedCampaign}
            p1Choice={p1Choice}
            p2Choice={p2Choice}
            p1HP={p1HP}
            p2HP={p2HP}
            p1WonBattle={p1WonBattle}
            bothSelected={bothSelected}
            showPlayer1={showPlayer1}
            showPlayer2={showPlayer2}
            isReversed={isReversed}
            p1Turn={p1Turn}
            onFormChange1={onFormChange1}
            onFormChange2={onFormChange2}
            onFormSubmit1={onFormSubmit1}
            onFormSubmit2={onFormSubmit2}
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
      showPlayer1: true,
      showPlayer2: true,
      isReversed: false,
      p1Turn: true,
    };
    this.handleMenuChangeParent = this.handleMenuChangeParent.bind(this);
    this.handleMenuSubmitParent = this.handleMenuSubmitParent.bind(this);
    this.handleFormChange1Parent = this.handleFormChange1Parent.bind(this);
    this.handleFormChange2Parent = this.handleFormChange2Parent.bind(this);
    this.handleFormSubmit1Parent = this.handleFormSubmit1Parent.bind(this);
    this.handleFormSubmit2Parent = this.handleFormSubmit2Parent.bind(this);
    this.handleResolveClickParent = this.handleResolveClickParent.bind(this);
    this.handleNextClickParent = this.handleNextClickParent.bind(this);
  }

  handleMenuChangeParent(isSelectedCampaign) {
    this.setState({
      isSelectedCampaign: isSelectedCampaign,
    });
    alert('changed, isSelectedCampaign: ' + isSelectedCampaign);
  }

  handleMenuSubmitParent(p1HP, p2HP) {
    this.setState({
      p1HP: 1000,
      p2HP: 1000,
    });
    alert('submitted, p1HP: ' + p1HP + ', p2HP: ' + p2HP);
  }

  handleFormChange1Parent(p1Choice) {
    this.setState({
      p1Choice: p1Choice,
    });
  }

  handleFormChange2Parent(p2Choice) {
    this.setState({
      p2Choice: p2Choice,
    });
  }

  handleFormSubmit1Parent(p1Choice, bothSelected, showPlayer1, p1Turn) {
    this.setState({
      showPlayer1: !showPlayer1,
      p1Turn: !p1Turn,
    });
    alert('showPlayer1: ' + showPlayer1 + ', p1Turn: ' + p1Turn);
  }


  handleFormSubmit2Parent(p2Choice, bothSelected, showPlayer2, p1Turn) {
    this.setState({
      showPlayer2: !showPlayer2,
      p1Turn: !p1Turn,
      bothSelected: true,
    });
    alert('showPlayer2: ' + showPlayer2 + ', p1Turn: ' + p1Turn);
  }

  handleResolveClickParent(isSelectedCampaign, p1Choice, p2Choice, p1HP, p2HP) {
    var [damage, i, j] = calculateDamage(isSelectedCampaign, p1Choice, p2Choice);
    if (i > j) {
      this.setState({
        p2HP: p1HP - damage,
        p1WonBattle: true,
        bothSelected: true,
      });
    } else if (i < j) {
      this.setState({
        p1HP: p1HP - damage,
        p1WonBattle: false,
        bothSelected: true,
      });
    } else {
      this.setState({
        bothSelected: true,
      });
      alert('tie, press Next to battle again');
    }
  }

  handleNextClickParent() {
    this.setState({
      p1Choice: "",
      p2Choice: "",
      p1WonBattle: false,
      bothSelected: false,
    });
    alert('next battle, new choices');
  }

  render() {
    const isSelectedCampaign = this.state.isSelectedCampaign;
    const p1Choice = this.state.p1Choice;
    const p2Choice = this.state.p2Choice;
    const p1HP = this.state.p1HP;
    const p2HP = this.state.p2HP;
    const bothSelected = this.state.bothSelected;
    const p1WonBattle = this.state.p1WonBattle;
    const showPlayer1 = this.state.showPlayer1;
    const showPlayer2 = this.state.showPlayer2;
    const isReversed = this.state.isReversed;
    const p1Turn = this.state.p1Turn;

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
            isSelectedCampaign={isSelectedCampaign}
            p1Choice={p1Choice}
            p2Choice={p2Choice}
            p1HP={p1HP}
            p2HP={p2HP}
            bothSelected={bothSelected}
            p1WonBattle={p1WonBattle}
            showPlayer1={showPlayer1}
            showPlayer2={showPlayer2}
            isReversed={isReversed}
            p1Turn={p1Turn}
            onMenuChange={this.handleMenuChangeParent}
            onMenuSubmit={this.handleMenuSubmitParent}
            onFormChange1={this.handleFormChange1Parent}
            onFormChange2={this.handleFormChange2Parent}
            onFormSubmit1={this.handleFormSubmit1Parent}
            onFormSubmit2={this.handleFormSubmit2Parent}
            onClickResolve={this.handleResolveClickParent}
            onClickNext={this.handleNextClickParent}
          />
          <div className="game-resolve">
            <Resolved
              bothSelected={bothSelected}
              onClickResolve={this.handleResolveClickParent}
            />
          </div>
          <div className="game-next">
            <Next
              onClickNext={this.handleNextClickParent}
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
  // let campaignStats = {
  //   "mage": {
  //     softCounter: 100,
  //     hardCounter: 200,
  //   },
  //   "melee": {
  //     softCounter: 100,
  //     hardCounter: 200,
  //   },
  //   "yolo": {
  //     softCounter: 100,
  //     hardCounter: 200,
  //   },
  //   "spock": {
  //     softCounter: 100,
  //     hardCounter: 200,
  //   },
  //   "whale": {
  //     softCounter: 100,
  //     hardCounter: 200,
  //   }
  // };
  let campaignStats = ["mage", "melee", "yolo", "spock", "whale"];
  let attacks = ["attack1", "attack2", "attack3", "attack4", "attack5"];
  let indexOfP1Choice = attacks.indexOf(p1Choice);
  let indexOfP2Choice = attacks.indexOf(p2Choice);

  if (campaignStats.includes(isSelectedCampaign) && (indexOfP1Choice !== -1) && (indexOfP2Choice !== -1)) {
    for (let i in campaignStats) {
      if (isSelectedCampaign === i) {
        switch (i) {
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
          case "melee":
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
          case "yolo":
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
          case "whale":
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
