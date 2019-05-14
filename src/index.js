import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

const AvatarRound = ({ user }) => (
  <img className="round" alt="avatar" src={user.avatarUrl} />
);

const Profile = ({ user, children }) => (
  <div className="profile">
    <div>{children}</div>
    <div>
      <p>{user}</p>
    </div>
  </div>
);

const User = ({ user }) => (
  <Profile user={user}>
    <AvatarRound user={user} />
  </Profile>
);

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedCampaign: "",
      attackNames: ["blank", "blank", "blank", "blank" , "blank"],
      users: {
        player1: {
          name: "player1",
          avatarURL: "http://i65.tinypic.com/1zwypw7.jpg",
          choice: "",
          HP: 400,
          showPlayer: true,
        },
        player2: {
          name: "player2",
          avatarURL: "http://i65.tinypic.com/1zwypw7.jpg",
          choice: "",
          HP: 400,
          showPlayer: true,
        },
      },
      bothSelected: false,
      resolvedBattle: false,
      resolvedText: "",
      showResolve: false,
      p1WonBattle: false,
      p1Turn: true,
      showNext: false;
    };
    this.handleChangeMenu = this.handleChangeMenu.bind(this);
    this.handleSubmitMenu = this.handleSubmitMenu.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleClickResolve = this.handleClickResolve.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  // handleFormChange1(e) {
  //   // this.props.onFormChange1(e.target.value);
  // }

  // handleFormChange2(e) {
  //   // this.props.onFormChange2(e.target.value);
  // }

  // handleFormSubmit1(e) {
  //   // this.props.onFormSubmit1(e.target.value);
  //   // e.preventDefault();
  // }

  // handleFormSubmit2(e) {
  //   // this.props.onFormSubmit2(e.target.value);
  //   // e.preventDefault();
  // }

  // handleMenuChangeParent(isSelectedCampaign) {

  //   // // this shows up to date info; 'spock'
  //   // alert('changed, isSelectedCampaign from const: ' + isSelectedCampaign);
  //   // // this brought up to date info, so it is a good sign
  //   // alert('up to date?, this.state.p1HP: ' + this.state.p1HP + ', this.state.p2HP: ' + this.state.p2HP);
  // }

  // handleMenuSubmitParent() {

  //   // e.preventDefault();
  //   // // This works, but using the const doesn't work like in handleMenuChangeParent
  //   // // I guess I don't need to pass in the const for Submit
  //   // alert('submitted, this.state.p1HP: ' + this.state.p1HP + ', this.state.p2HP: ' + this.state.p2HP);
  //   // // This was memorized, so it is a good sign
  //   // alert('test if memorized: ' + this.state.isSelectedCampaign);
  // }

  handleChangMenu(e) {
    let atkNames = getAtkNames(e.target.value);

    this.setState({
      isSelectedCampaign: e.target.value,
      attackNames: atkNames,
    });
  }

  handleSubmitMenu(e, name1, name2) {
    this.setState({
      isSelectedCampaign: this.state.isSelectedCampaign,
      attackNames: this.state.attackNames,
      users: {
        [name1]: {
          HP: 500,
        },
      }
      users: {
        [name2]: {
          HP: 500,
        },
      }
    });
    e.preventDefault();
  }

  handleChangeForm(name, choice) {
    this.setState({
      users: {
        [name]: {
          choice: choice,
        }
      }
    });
  }

  handleSubmitForm(name) {
    this.setState({
      users: {
        [name]: {
          showPlayer: !this.state.users[name].showPlayer,
        },
      },
      p1Turn: !this.state.p1Turn,
    });

    //temporary conditional
    if (name === 'player2') {
      this.setState({
        users: {
          [name]: {
            showPlayer: !this.state.users[name].showPlayer,
          },
        },
        p1Turn: !this.state.p1Turn,
        bothSelected: true,
        showResolve: true,
      });
    }
  }

  handleClickResolve(name1, name2) {

    let [damage, j, k] = calculateDamage(this.state.isSelectedCampaign, this.state.users[name1].choice, this.state.users[name1].choice);

    if (((j > k) && ((j + k) % 2 !== 0)) || ((j < k) && ((j + k) % 2 === 0))) {
      this.setState({
        users: {
          [name1]: {
            HP: !this.state.users[name1].HP - damage,
            showPlayer: true,
          },
        },
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Player 2 took ' + damage + ' damage!',
        showResolve: false,
        p1WonBattle: true,
        showNext: true,
      });
    } else if (((j > k) && ((j + k) % 2 === 0)) || ((j < k) && ((j + k) % 2 !== 0))) {
      this.setState({
        users: {
          [name2]: {
            HP: !this.state.users[name2].HP - damage,
            showPlayer: true,
          },
        },
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Player 1 took ' + damage + ' damage!',
        showResolve: false,
        p1WonBattle: true,
        showNext: true,
      });
    } else {
      this.setState({
        users: {
          [name1]: {
            showPlayer: true,
          },
        },
        users: {
          [name2]: {
            showPlayer: true,
          },
        },
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Tie! No player took damage! Press "Next" to battle again.',
        showResolve: false,
        showNext: true,
      });
    }
  }

  handleClickNext(name1, name2) {
    this.setState({
      users: {
        [name1]: {
          choice: "",
          showPlayer: true,
        },
      },
      users: {
        [name2]: {
          choice: "",
          showPlayer: false,
        },
      },
      p1WonBattle: false,
      bothSelected: false, //necessary, otherwise Attack button is still disabled b/c bothSelected still true.
      resolvedBattle: false,
      resolvedText: "",
      showNext: false,
    });
  }

  renderPlayer(name) {

    const {
      attackNames,
      users,
      users[name],
      users[name][choice],
      users[name][HP],
      bothSelected,
    } = this.state;

    let atkBtn;

    if (users[name][choice] === "" || bothSelected) {
      atkBtn =
        <button disabled>
          Attack!
        </button>
    } else {
      atkBtn =
        <button
          className="p-form-submit"
          type="submit"
        >
          Attack!
        </button>
    }

    return (
      <div className="player">
        <div className="p-profile">
          <User user={users[name]}>
        </div>
        <div className="p-hp">
          {users[name] + ' HP: ' + users[name][HP]}
          <br/>
        </div>
        <div className="p-form">
          <form
            onSubmit={this.handleSubmitForm}
          >
            <div className="p-form-check">
              <label for="attack1" id="attack1_label">
                <input type="radio" name="attack" value="attack1" checked={users[name][choice] === 'attack1'} onChange={this.handleChangeForm} className="p-form-check-input" id="attack1"/>
                {attackNames[0]}
              </label>
              <br/>
            </div>
            <div className="p-form-check">
              <label for="attack2" id="attack2_label">
                <input type="radio" name="attack" value="attack2" checked={users[name][choice] === 'attack2'} onChange={this.handleChangeForm} className="p-form-check-input" id="attack2"/>
                {attackNames[1]}
              </label>
              <br/>
            </div>
            <div className="p-form-check">
              <label for="attack3" id="attack3_label">
                <input type="radio" name="attack" value="attack3" checked={users[name][choice] === 'attack3'} onChange={this.handleChangeForm} className="p-form-check-input" id="attack3"/>
                {attackNames[2]}
              </label>
              <br/>
            </div>
            <div className="p-form-check">
              <label for="attack4" id="attack4_label">
                <input type="radio" name="attack" value="attack4" checked={users[name][choice] === 'attack4'} onChange={this.handleChangeForm} className="p-form-check-input" id="attack4"/>
                {attackNames[3]}
              </label>
              <br/>
            </div>
            <div className="p-form-check">
              <label for="attack5" id="attack5_label">
                <input type="radio" name="attack" value="attack5" checked={users[name][choice] === 'attack5'} onChange={this.handleChangeForm} className="p-form-check-input" id="attack5"/>
                {attackNames[4]}
              </label>
              <br/>
            </div>
            <div className="p-form-group">
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
      users,
      users[name1],
      users[name1][choice],
      users[name1][HP],
      users[name1][showPlayer],
      users[name2],
      users[name2][choice],
      users[name2][HP],
      users[name2][showPlayer],
      bothSelected,
      resolvedBattle,
      resolvedText,
      showResolve,
      p1WonBattle,
      p1Turn,
    } = this.state;

    let turnLog = "It is " + (p1Turn ? "Player 1" : "Player 2") + "'s turn";
    let pWin;
    let showMenu;
    let showStatus;
    let showPlayers;

    if (!isSelectedCampaign) {
      showMenu = (
        <div className="game-menu">
          <div className="game-label">
            Choose a new battle campaign!
          </div>
          <form
            onSubmit={this.handleSubmitMenu}>
            <label>
              <select
                value={isSelectedCampaign}
                onChange={this.handleChangeMenu}
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

    if (users[name1][HP] <= 0) {
      alert('Player 1 HP: ' + p1HP + '\nPlayer 2 HP: ' + p2HP + '.\n\nPlayer 2 has won the war!');
      pWin = (
        <div className="victory">
          <img src="https://imgur.com/rPFz1Mk.gif" border="0" alt="Spongebob at the bubble bowl!"/>
          <h1>Player 2 has won sweet victory!</h1>
        </div>
      );
    } else if (users[name2][HP] <= 0) {
      alert('Player 1 HP: ' + p1HP + '\nPlayer 2 HP: ' + p2HP + '.\n\nPlayer 1 has won the war!');
      pWin = (
        <div className="victory">
          <img src="https://imgur.com/H5Lm06M.gif" border="0" alt="Spongebob at the bubble bowl!"/>
          <h1>Player 1 has won sweet victory!</h1>
        </div>
      );
    }


    if(!users[name1][showPlayer] && users[name2][showPlayer]) {
      showPlayers = (
        <div className="player-stats">
          {this.renderPlayer(name2)}
          <div className="p-choice">
            {attackNames[(users[name2][choice][ users[name2][choice].length - 1 ]) - 1]}
          </div>
        </div>
      );
    } else if(users[name1][showPlayer] && !users[name2][showPlayer]) {
      showPlayers = (
        <div className="player-stats">
          {this.renderPlayer(name1)}
          <div className="p-choice">
            {attackNames[(users[name1][choice][ users[name1][choice].length - 1 ]) - 1]}
          </div>
        </div>
      );
    } else if(!users[name1][showPlayer] && !users[name2][showPlayer]) {
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
          {this.renderPlayer(name1)}
          {this.renderPlayer(name2)}
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
          {pWin}
        </div>
        <div className="game-players">
          {showPlayers}
        </div>
        <div className="game-resolve">
          <Resolved
            showResolve={showResolve}
            onClickResolve={this.handleClickResolve}
          />
        </div>
        <div className="game-next">
          <Next
            onClickNext={this.handleClickNext}
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

function calculateDamage(isSelectedCampaign, c1, c2) {

  let campaignStats = ["spock", "mage", "melee", "yolo", "whale"];
  let attacks = ["attack1", "attack2", "attack3", "attack4", "attack5"];
  let indexOfP1Choice = attacks.indexOf(c1);
  let indexOfP2Choice = attacks.indexOf(c2);

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