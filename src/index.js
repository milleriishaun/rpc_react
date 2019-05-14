import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const User = ({ user }) => (
  <Profile user={user}>
    <AvatarRound user={user} />
  </Profile>
);

const Profile = ({ user, children }) => (
  <div className="profile">
    <div>{children}</div>
    <div>
      <p>{user.name}</p>
    </div>
  </div>
);

const AvatarRound = ({ user }) => (
  <img className="round" alt="avatar" src={user.avatarUrl} />
);

const Next = ({ onClickNext }) =>
  <button onClick={onClickNext}>
    Next
  </button>;

const Resolved = ({ showResolve, onClickResolve }) =>
  showResolve ?
    <button onClick={onClickResolve}>
      Resolve!
    </button>
    :
    <button disabled>
      Resolve!
    </button>;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedCampaign: "spock",
      attackNames: ["Rock!", "Paper!", "Scissors!", "Spock!" , "Lizard!"],
      users: {
        player1: {
          name: "Unknown Player",
          avatarURL: "http://i65.tinypic.com/1zwypw7.jpg",
          choice: "",
          HP: 400,
          showPlayer: true,
        },
        player2: {
          name: "Unknown Player",
          avatarURL: "http://i65.tinypic.com/1zwypw7.jpg",
          choice: "",
          HP: 400,
          showPlayer: true,
        },
      },
      p1Choice: "",
      p2Choice: "",
      p1HP: 400,
      p2HP: 400,
      showPlayer1: true,
      showPlayer2: false,
      bothSelected: false,
      resolvedBattle: false,
      resolvedText: "",
      showResolve: false,
      p1WonBattle: false,
      p1Turn: true,
    };
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleMenuSubmit = this.handleMenuSubmit.bind(this);
    this.handleFormChange1 = this.handleFormChange1.bind(this);
    this.handleFormChange2 = this.handleFormChange2.bind(this);
    this.handleFormSubmit1 = this.handleFormSubmit1.bind(this);
    this.handleFormSubmit2 = this.handleFormSubmit2.bind(this);
    this.handleMenuChangeParent = this.handleMenuChangeParent.bind(this);
    this.handleMenuSubmitParent = this.handleMenuSubmitParent.bind(this);
    this.handleFormChange1Parent = this.handleFormChange1Parent.bind(this);
    this.handleFormChange2Parent = this.handleFormChange2Parent.bind(this);
    this.handleFormSubmit1Parent = this.handleFormSubmit1Parent.bind(this);
    this.handleFormSubmit2Parent = this.handleFormSubmit2Parent.bind(this);
    this.handleResolveClickParent = this.handleResolveClickParent.bind(this);
    this.handleNextClickParent = this.handleNextClickParent.bind(this);
  }

  handleMenuChange(e) {
    let atkNames = getAtkNames(e.target.value);

    this.setState({
      isSelectedCampaign: e.target.value,
      attackNames: atkNames,
    });
  }

  handleMenuSubmit(e) {
    this.setState({
      isSelectedCampaign: this.state.isSelectedCampaign,
      attackNames: this.state.attackNames,
      users: {
        player1: {
          HP: 500,
        },
        player2: {
          HP: 500,
        }
      }
    });
    e.preventDefault();
  }

  handleFormChange1(e) {
    this.props.onFormChange1(e.target.value);
  }

  handleFormChange2(e) {
    this.props.onFormChange2(e.target.value);
  }

  handleFormSubmit1(e) {
    this.props.onFormSubmit1(e.target.value);
    e.preventDefault();
  }

  handleFormSubmit2(e) {
    this.props.onFormSubmit2(e.target.value);
    e.preventDefault();
  }

  handleMenuChangeParent(isSelectedCampaign) {

    // // this shows up to date info; 'spock'
    // alert('changed, isSelectedCampaign from const: ' + isSelectedCampaign);
    // // this brought up to date info, so it is a good sign
    // alert('up to date?, this.state.p1HP: ' + this.state.p1HP + ', this.state.p2HP: ' + this.state.p2HP);
  }

  handleMenuSubmitParent() {

    // e.preventDefault();
    // // This works, but using the const doesn't work like in handleMenuChangeParent
    // // I guess I don't need to pass in the const for Submit
    // alert('submitted, this.state.p1HP: ' + this.state.p1HP + ', this.state.p2HP: ' + this.state.p2HP);
    // // This was memorized, so it is a good sign
    // alert('test if memorized: ' + this.state.isSelectedCampaign);
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

  handleFormSubmit1Parent() {
    this.setState({
      showPlayer1: !this.state.showPlayer1,
      showPlayer2: !this.state.showPlayer2,
      p1Turn: !this.state.p1Turn,
    });
  }


  handleFormSubmit2Parent() {
    this.setState({
      showPlayer2: !this.state.showPlayer2,
      p1Turn: !this.state.p1Turn,
      bothSelected: true,
      showResolve: true,
    });
  }

  handleResolveClickParent() {

    let [damage, j, k] = calculateDamage(this.state.isSelectedCampaign, this.state.p1Choice, this.state.p2Choice);

    if (((j > k) && ((j + k) % 2 !== 0)) || ((j < k) && ((j + k) % 2 === 0))) {
      this.setState({
        p2HP: this.state.p2HP - damage,
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Player 2 took ' + damage + ' damage!',
        showResolve: false,
        p1WonBattle: true,
        showPlayer1: true,
        showPlayer2: true,
      });
    } else if (((j > k) && ((j + k) % 2 === 0)) || ((j < k) && ((j + k) % 2 !== 0))) {
      this.setState({
        p1HP: this.state.p1HP - damage,
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Player 1 took ' + damage + ' damage!',
        showResolve: false,
        p1WonBattle: false,
        showPlayer1: true,
        showPlayer2: true,
      });
    } else {
      this.setState({
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Tie! No player took damage! Press "Next" to battle again.',
        showResolve: false,
        showPlayer1: true,
        showPlayer2: true,
      });
    }
  }

  handleNextClickParent() {
    this.setState({
      p1Choice: "",
      p2Choice: "",
      p1WonBattle: false,
      bothSelected: false, //necessary, otherwise Attack button is still disabled b/c bothSelected still true.
      resolvedBattle: false,
      resolvedText: "",
      showPlayer1: true,
      showPlayer2: false,
    });
  }

  renderPlayer1() {
    const {
      attackNames,
      p1Choice,
      p1HP,
      bothSelected,
    } = this.state;

    let atkBtn;

    if (p1Choice === "" || bothSelected) {
      atkBtn =
        <button disabled>
          Attack!
        </button>
    } else {
      atkBtn =
        <button
          className="p1-submit"
          type="submit"
          id="attackButton1"
        >
          Attack!
        </button>
    }

    return (
      <div className="p1">
        <div className="p1-hp">
          {'Player 1 HP: ' + p1HP}
          <br/>
        </div>
        <div className="p1-form">
          <form
            onSubmit={this.handleFormSubmit1}
          >
            <div className="form-check">
              <label for="attack1" id="attack1_label">
                <input type="radio" name="attack" value="attack1" checked={p1Choice === 'attack1'} onChange={this.handleFormChange1} className="form-check-input" id="attack1"/>
                {attackNames[0]}
              </label>
              <br/>
            </div>
            <div className="form-check">
              <label for="attack2" id="attack2_label">
                <input type="radio" name="attack" value="attack2" checked={p1Choice === 'attack2'} onChange={this.handleFormChange1} className="form-check-input" id="attack2"/>
                {attackNames[1]}
              </label>
              <br/>
            </div>
            <div className="form-check">
              <label for="attack3" id="attack3_label">
                <input type="radio" name="attack" value="attack3" checked={p1Choice === 'attack3'} onChange={this.handleFormChange1} className="form-check-input" id="attack3"/>
                {attackNames[2]}
              </label>
              <br/>
            </div>
            <div className="form-check">
              <label for="attack4" id="attack4_label">
                <input type="radio" name="attack" value="attack4" checked={p1Choice === 'attack4'} onChange={this.handleFormChange1} className="form-check-input" id="attack4"/>
                {attackNames[3]}
              </label>
              <br/>
            </div>
            <div className="form-check">
              <label for="attack5" id="attack5_label">
                <input type="radio" name="attack" value="attack5" checked={p1Choice === 'attack5'} onChange={this.handleFormChange1} className="form-check-input" id="attack5"/>
                {attackNames[4]}
              </label>
              <br/>
            </div>
            <div className="form-group">
              {atkBtn}
            </div>
          </form>
        </div>
      </div>
    );
  }

  renderPlayer2() {
    const {
      attackNames,
      p2Choice,
      p2HP,
      bothSelected,
    } = this.state;

    let atkBtn;

    if (p2Choice === "" || bothSelected) {
      atkBtn =
        <button disabled>
          Attack!
        </button>
    } else {
      atkBtn =
        <button
          className="p2-submit"
          type="submit"
          id="attackButton2"
        >
          Attack!
        </button>
    }

    return (
      <div className="p2">
        <div className="p2-hp">
          {'Player 2 HP: ' + p2HP}
          <br/>
        </div>
        <div className="p2-form">
          <form
            onSubmit={this.handleFormSubmit2}
          >
            <div className="form-check">
              <label for="attack1" id="attack1_label">
                <input type="radio" name="attack" value="attack1" checked={p2Choice === 'attack1'} onChange={this.handleFormChange2} className="form-check-input" id="attack1"/>
                {attackNames[0]}
              </label>
              <br/>
            </div>
            <div className="form-check">
              <label for="attack2" id="attack2_label">
                <input type="radio" name="attack" value="attack2" checked={p2Choice === 'attack2'} onChange={this.handleFormChange2} className="form-check-input" id="attack2"/>
                {attackNames[1]}
              </label>
              <br/>
            </div>
            <div className="form-check">
              <label for="attack3" id="attack3_label">
                <input type="radio" name="attack" value="attack3" checked={p2Choice === 'attack3'} onChange={this.handleFormChange2} className="form-check-input" id="attack3"/>
                {attackNames[2]}
              </label>
              <br/>
            </div>
            <div className="form-check">
              <label for="attack4" id="attack4_label">
                <input type="radio" name="attack" value="attack4" checked={p2Choice === 'attack4'} onChange={this.handleFormChange2} className="form-check-input" id="attack4"/>
                {attackNames[3]}
              </label>
              <br/>
            </div>
            <div className="form-check">
              <label for="attack5" id="attack5_label">
                <input type="radio" name="attack" value="attack5" checked={p2Choice === 'attack5'} onChange={this.handleFormChange2} className="form-check-input" id="attack5"/>
                {attackNames[4]}
              </label>
              <br/>
            </div>
            <div className="form-group">
              {atkBtn}
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    const {
      isSelectedCampaign,
      attackNames,
      p1Choice,
      p2Choice,
      p1HP,
      p2HP,
      bothSelected,
      resolvedBattle,
      resolvedText,
      showResolve,
      p1WonBattle,
      showPlayer1,
      showPlayer2,
      p1Turn,
      onFormChange1,
      onFormChange2,
      onFormSubmit1,
      onFormSubmit2,
    } = this.state;

    let turnLog = "It is " + (p1Turn ? "Player 1" : "Player 2") + "'s turn";
    let pWin;
    let showMenu;
    let showStatus;
    let showPlayers;

    if (isSelectedCampaign) {
      showMenu = (
        <div className="game-menu">
          <div className="game-label">
            Choose a new battle campaign!
          </div>
          <form
            onSubmit={this.handleMenuSubmit}>
            <label>
              <select
                value={isSelectedCampaign}
                onChange={this.handleMenuChange}
                id="menu"
              >
                <option value="spock">Spock</option>
                <option value="mage">Mage</option>
                <option value="melee">Melee</option>
                <option value="yolo">YOLO</option>
                <option value="whale">Whale</option>
              </select>
            </label>
            <input
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      );
    }

    if (resolvedText) {
      showStatus = 'Next battle! Who will win the war?';
      if (resolvedBattle) {
        showStatus = 'Resolve Battle?';
        if (bothSelected) {
          showStatus = turnLog;
        }
      }
    }
    // let showStatus = (resolvedText !== "" ? resolvedText
    //           : resolvedBattle ? 'Next battle! Who will win the war?'
    //           : bothSelected ? 'Resolve battle?'
    //           : turnLog
    // )

    if(!showPlayer1 && showPlayer2) {
      showPlayers = (
        <div className="player-stats">
          {this.renderPlayer2()}
          <div className="p2-choice">
            {attackNames[p2Choice[p2Choice.length - 1] - 1]}
          </div>
        </div>
      );
    } else if(showPlayer1 && !showPlayer2) {
      showPlayers = (
        <div className="player-stats">
          {this.renderPlayer1()}
          <div className="p1-choice">
            {attackNames[p1Choice[p1Choice.length - 1] - 1]}
          </div>
        </div>
      );
    } else if(!showPlayer1 && !showPlayer2) {
      showPlayers = (
        <div className="player-stats">
        </div>
      );
    } else {
      showPlayers = (
        <div className="player-stats">
          <div className="results">
            Results
          </div>
          {this.renderPlayer1()}
          {this.renderPlayer2()}
        </div>
      );
    }

    if (this.state.p1HP <= 0) {
      alert('Player 1 HP: ' + p1HP + '\nPlayer 2 HP: ' + p2HP + '.\n\nPlayer 2 has won the war!');
      pWin = (
        <div className="victory">
          <img src="https://imgur.com/rPFz1Mk.gif" border="0" alt="Spongebob at the bubble bowl!"/>
          <h1>Player 2 has won sweet victory!</h1>
        </div>
      );
    } else if (this.state.p2HP <= 0) {
      alert('Player 1 HP: ' + p1HP + '\nPlayer 2 HP: ' + p2HP + '.\n\nPlayer 1 has won the war!');
      pWin = (
        <div className="victory">
          <img src="https://imgur.com/H5Lm06M.gif" border="0" alt="Spongebob at the bubble bowl!"/>
          <h1>Player 1 has won sweet victory!</h1>
        </div>
      );
    }

    return (
      <div className="game">
        <div className="game-title">
          Rock, Paper, Scissors
        </div>
        <div className="whole-menu">
          {showMenu}
        </div>
        <div className="players-turn">
          {showStatus}
          {p1Win}
        </div>
        <div className="game-players">
          {showPlayers}
        </div>
        <div className="game-resolve">
          <Resolved
            showResolve={showResolve}
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateDamage(isSelectedCampaign, p1Choice, p2Choice) {

  let campaignStats = ["spock", "mage", "melee", "yolo", "whale"];
  let attacks = ["attack1", "attack2", "attack3", "attack4", "attack5"];
  let indexOfP1Choice = attacks.indexOf(p1Choice);
  let indexOfP2Choice = attacks.indexOf(p2Choice);

  if (campaignStats.includes(isSelectedCampaign) && (indexOfP1Choice !== -1) && (indexOfP2Choice !== -1)) {
    let damageArr;
    for (let i in campaignStats) {
      if (isSelectedCampaign === campaignStats[i]) {
        switch (campaignStats[i]) {
          case "spock":
            damageArr = [
              [0, 100, 200, 200, 100],
              [100, 0, 100, 200, 200],
              [200, 100, 0, 100, 200],
              [200, 200, 100, 0, 100],
              [100, 200, 200, 100, 0],
            ];
            for (let j = 0; j < damageArr.length; j++) {
              for (let k = 0; k < damageArr.length; k++) {
                if (indexOfP1Choice === j && indexOfP2Choice === k) {
                  return [damageArr[j][k], j, k];
                }
              }
            }
          break;
          case "mage":
            damageArr = [
              [0, 100, 200, 200, 100],
              [100, 0, 100, 200, 200],
              [200, 100, 0, 100, 200],
              [200, 200, 100, 0, 100],
              [100, 200, 200, 100, 0],
            ];
            for (let j = 0; j < damageArr.length; j++) {
              for (let k = 0; k < damageArr.length; k++) {
                if (indexOfP1Choice === j && indexOfP2Choice === k) {
                  return [damageArr[j][k], j, k];
                }
              }
            }
            break;
          case "melee":
            damageArr = [
              [0, 100, 200, 200, 100],
              [100, 0, 100, 200, 200],
              [200, 100, 0, 100, 200],
              [200, 200, 100, 0, 100],
              [100, 200, 200, 100, 0],
            ];
            for (let j = 0; j < damageArr.length; j++) {
              for (let k = 0; k < damageArr.length; k++) {
                if (indexOfP1Choice === j && indexOfP2Choice === k) {
                  return [damageArr[j][k], j, k];
                }
              }
            };
            break;
          case "yolo":
            damageArr = [
              [0, 100, 200, 200, 100],
              [100, 0, 100, 200, 200],
              [200, 100, 0, 100, 200],
              [200, 200, 100, 0, 100],
              [100, 200, 200, 100, 0],
            ];
            for (let j = 0; j < damageArr.length; j++) {
              for (let k = 0; k < damageArr.length; k++) {
                if (indexOfP1Choice === j && indexOfP2Choice === k) {
                  return [damageArr[j][k], j, k];
                }
              }
            }
            break;
          case "whale":
            damageArr = [
              [0, 100, 200, 200, 100],
              [100, 0, 100, 200, 200],
              [200, 100, 0, 100, 200],
              [200, 200, 100, 0, 100],
              [100, 200, 200, 100, 0],
            ];
            for (let j = 0; j < damageArr.length; j++) {
              for (let k = 0; k < damageArr.length; k++) {
                if (indexOfP1Choice === j && indexOfP2Choice === k) {
                  return [damageArr[j][k], j, k];
                }
              }
            }
            break;
          default:
            alert('broken calculateDamage');
            break;
        }
      }
    }
  } else {
    alert('campaign not included, needs more code')
  }
}

function getAtkNames(isSelectedCampaign1) {
  let campaignStats = ["mage", "melee", "yolo", "spock", "whale"];
  let gestures = [
    ["Rock!", "Paper!", "Scissors!", "Spock!" , "Lizard!"],
    ["Fire Ball!", "Lightning Bolt!", "Water Blast!", "Earth Stomp!", "Wind Gust!"],
    ["Charge!", "Slash!", "Riposte!", "Deflect!" , "Lunge!"],
    ["Jeep!", "Bomber!", "Fighter!", "Tank!" , "Helo!"],
    ["Whale!", "Orca!", "Minnows!", "Dolphins!" , "Plankton!"],
  ];
  let atkNames1;

  for (let i = 0; i < campaignStats.length; i++) {
    if (isSelectedCampaign1 === campaignStats[i]) {
      atkNames1 = gestures[i];
      return atkNames1;
    }
  }

  alert('broken');
  return ['broken', 'broken', 'broken', 'broken', 'broken'];
}