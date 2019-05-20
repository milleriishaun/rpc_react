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

const AvatarRound = ({ user_avatarURL }) => (
  <img className="round" alt="avatar" src={user_avatarURL} />
);

const Profile = ({ user_name, children }) => (
  <div className="p-profile">
    <div>{children}</div>
    <div>
      <p>{user_name}</p>
    </div>
  </div>
);

const User = ({ user_id, user_name, user_avatarURL, user_choice, user_HP, user_showPlayer }) => (
  <Profile user_name={user_name}>
    <AvatarRound user_avatarURL={user_avatarURL} />
  </Profile>
);

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedCampaign: "Spock",
      attackNames: ["Rock!", "Paper!", "Scissors!", "Spock!" , "Lizard!"],
      users: [
        { id : '0',
          name: 'player1',
          avatarURL: "http://i65.tinypic.com/1zwypw7.jpg",
          choice: "",
          HP: 400,
          showPlayer: true,
        },
        { id : '1',
          name: 'player2',
          avatarURL: "http://i65.tinypic.com/1zwypw7.jpg",
          choice: "",
          HP: 400,
          showPlayer: false,
        },
      ],
      bothSelected: false,
      resolvedBattle: false,
      resolvedText: "",
      showResolve: false,
      p1WonBattle: false,
      p1Turn: true,
      showNext: false,
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

  handleChangeMenu(e) {
    let atkNames = getAtkNames(e.target.value);

    this.setState({
      // isSelectedCampaign: e.target.value,
      attackNames: atkNames,
    });
  }

  handleSubmitMenu(e, users) {

    this.setState({
      isSelectedCampaign: this.state.isSelectedCampaign,
      attackNames: this.state.attackNames,
      users: [
        { id : users[0].id,
          name: users[0].name,
          avatarURL: users[0].avatarURL,
          choice: users[0].choice,
          HP: 500,
          showPlayer: true,
        },
        { id : users[1].id,
          name: users[1].name,
          avatarURL: users[1].avatarURL,
          choice: users[1].choice,
          HP: 500,
          showPlayer: users[1].showPlayer,
        },
      ],
    });
    e.preventDefault();
  }

  handleChangeForm(e, users, name, choice) {
    let val = e.target.value;
    alert('val: ' + val + '\nname: ' + name + '\nchoice: ' + choice);
    if (name === users[0].name) {
      alert('hi');
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            choice: val,
            HP: users[0].HP,
            showPlayer: !users[0].showPlayer,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            choice: users[1].choice,
            HP: users[1].HP,
            showPlayer: users[1].showPlayer,
          },
        ]
      });
    } else if(name === users[1].name) {
      alert('hi2');
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            choice: users[0].choice,
            HP: users[0].HP,
            showPlayer: users[0].showPlayer,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            choice: val,
            HP: users[1].HP,
            showPlayer: !users[1].showPlayer,
          },
        ]
      });
    }
  }

  handleSubmitForm(e, users, name) {
    if (name === users[0].name) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            choice: users[0].choice,
            HP: users[0].HP,
            showPlayer: !users[0].showPlayer,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            choice: users[1].choice,
            HP: users[1].HP,
            showPlayer: users[1].showPlayer,
          },
        ]
      });
    } else if(name === users[1].name) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            choice: users[0].choice,
            HP: users[0].HP,
            showPlayer: users[0].showPlayer,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            choice: users[1].choice,
            HP: users[1].HP,
            showPlayer: !users[1].showPlayer,
          },
        ],
        p1turn: !this.state.p1Turn,
        bothSelected: true,
        showResolve: true,
      });
    }
    e.preventDefault();
  }

  handleClickResolve(users) {

    let [damage, j, k] = calculateDamage(this.state.isSelectedCampaign, users[0].choice, users[1].choice);

    if (((j > k) && ((j + k) % 2 !== 0)) || ((j < k) && ((j + k) % 2 === 0))) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            choice: users[0].choice,
            HP: users[0].HP - damage,
            showPlayer: true,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            choice: users[1].choice,
            HP: users[1].HP,
            showPlayer: users[1].showPlayer,
          },
        ],
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Player 2 took ' + damage + ' damage!',
        showResolve: false,
        p1WonBattle: true,
        showNext: true,
      });
    } else if (((j > k) && ((j + k) % 2 === 0)) || ((j < k) && ((j + k) % 2 !== 0))) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            choice: users[0].choice,
            HP: users[0].HP,
            showPlayer: users[0].showPlayer,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            choice: users[1].choice,
            HP: users[1].HP - damage,
            showPlayer: true,
          },
        ],
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Player 1 took ' + damage + ' damage!',
        showResolve: false,
        p1WonBattle: true,
        showNext: true,
      });
    } else {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            choice: users[0].choice,
            HP: users[0].HP,
            showPlayer: true,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            choice: users[1].choice,
            HP: users[1].HP,
            showPlayer: true,
          },
        ],
        bothSelected: true,
        resolvedBattle: true,
        resolvedText: 'Tie! No player took damage! Press "Next" to battle again.',
        showResolve: false,
        showNext: true,
      });
    }
  }

  handleClickNext(users) {
    this.setState({
      users: [
        { id : users[0].id,
          name: users[0].name,
          avatarURL: users[0].avatarURL,
          choice: "",
          HP: users[0].HP,
          showPlayer: true,
        },
        { id : users[1].id,
          name: users[1].name,
          avatarURL: users[1].avatarURL,
          choice: "",
          HP: users[1].HP,
          showPlayer: false,
        },
      ],
      p1WonBattle: false,
      bothSelected: false, //necessary, otherwise Attack button is still disabled b/c bothSelected still true.
      resolvedBattle: false,
      resolvedText: "",
      showNext: false,
    });
  }

  renderPlayer(id) {

    const {
      attackNames,
      users,
      bothSelected,
    } = this.state;

    let atkBtn;

    // alert('users[id].name: ' + users[0].name);
    if (users[id].choice === "" || bothSelected) {
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
        <div className="p-hp">
          {users[id].name + ' HP: ' + users[id].HP}
          <br/>
        </div>
        <div className="p-form">
          <form
            onSubmit={(e) => this.handleSubmitForm(e, users, users[id].name)}
          >
            <div className="p-form-check">
              <label for="attack1" id="attack1_label">
                <input type="radio" name="attack" value="attack1" checked={users[id].choice === 'attack1'} onChange={(e) => this.handleChangeForm(e, users, users[id].name, users[id].choice)} className="p-form-check-input" id="attack1"/>
                {attackNames[0]}
              </label>
              <br/>
            </div>
            <div className="p-form-check">
              <label for="attack2" id="attack2_label">
                <input type="radio" name="attack" value="attack2" checked={users[id].choice === 'attack2'} onChange={(e) => this.handleChangeForm(e, users, users[id].name, users[id].choice)} className="p-form-check-input" id="attack2"/>
                {attackNames[1]}
              </label>
              <br/>
            </div>
            <div className="p-form-check">
              <label for="attack3" id="attack3_label">
                <input type="radio" name="attack" value="attack3" checked={users[id].choice === 'attack3'} onChange={(e) => this.handleChangeForm(e, users, users[id].name, users[id].choice)} className="p-form-check-input" id="attack3"/>
                {attackNames[2]}
              </label>
              <br/>
            </div>
            <div className="p-form-check">
              <label for="attack4" id="attack4_label">
                <input type="radio" name="attack" value="attack4" checked={users[id].choice === 'attack4'} onChange={(e) => this.handleChangeForm(e, users, users[id].name, users[id].choice)} className="p-form-check-input" id="attack4"/>
                {attackNames[3]}
              </label>
              <br/>
            </div>
            <div className="p-form-check">
              <label for="attack5" id="attack5_label">
                <input type="radio" name="attack" value="attack5" checked={users[id].choice === 'attack5'} onChange={(e) => this.handleChangeForm(e, users, users[id].name, users[id].choice)} className="p-form-check-input" id="attack5"/>
                {attackNames[4]}
              </label>
              <br/>
            </div>
            <div className="p-form-group">
              {atkBtn}
            </div>
          </form>
        </div>
        <div className="p-choice">
          {attackNames[(users[id].choice[ users[id].choice.length - 1 ]) - 1]}
        </div>
      </div>
    );
  }

  render() {
    const {
      isSelectedCampaign,
      attackNames,
      users,
      bothSelected,
      resolvedBattle,
      resolvedText,
      showResolve,
      p1WonBattle,
      p1Turn,
    } = this.state;

    let showMenu;
    let showStatus;
    let turnLog = "It is " + (p1Turn ? "Player 1" : "Player 2") + "'s turn";
    let pWin;
    let showPlayers;

    if (isSelectedCampaign) {
      showMenu = (
        <div className="game-menu">
          <div className="game-label">
            Choose a new battle campaign!
          </div>
          <form
            onSubmit={(e) => this.handleSubmitMenu(e, users)}>
            <label>
              <select
                value={isSelectedCampaign}
                onChange={(e) => this.handleChangeMenu(e)}
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

    for (let i = 0; i < users.length; i++) {
      if (users[i].HP <= 0) {
        alert(users[i].name + ' HP: ' + users[i].HP + ', which means that ' + users[i].name + ' has lost.\nAnd all other players have won!');
        pWin = (
          <div className="victory">
            <img src="https://imgur.com/H5Lm06M.gif" border="0" alt="Spongebob at the bubble bowl!"/>
            <ul>
              {users
                .filter(points => points.HP > 0)
                .map(item => (
                  <li key={item.id}>
                    `${item.name} has won sweet victory!`
                  </li>
                ))
              }
            </ul>
          </div>
        );
      }
    }


    let shownPlayers = users.filter(item => item.showPlayer);

    showPlayers = (
      <div>
        {users.length === shownPlayers.length ?
          <div className="results">Results</div>
          : <div className="results"></div>
        }
        <div className="player-stats">
          <ul>
            {users.slice(0, 2).map(item => {
              return (
              <li key={item.id}>
                <User
                  user_id={item.id}
                  user_name={item.name}
                  user_avatarURL={item.avatarURL}
                  user_choice={item.choice}
                  user_HP={item.HP}
                  user_showPlayer={item.showPlayer}
                />
                {this.renderPlayer(item.id)}
              </li>
              )}).filter(item => {
                return (
                  !item.showPlayer
              )})
            }
          </ul>
        </div>
      </div>
    );

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
            onClickResolve={() => this.handleClickResolve(users)}
          />
        </div>
        <div className="game-next">
          <Next
            onClickNext={() => this.handleClickNext(users)}
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
  let campaignStats = ["spock", "mage", "melee", "yolo", "whale"];
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