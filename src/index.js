import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';

const Next = ({ showNext, onClickNext }) =>
  showNext ?
  <button onClick={onClickNext}>
    Next
  </button>
  :
  <button disabled>
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
  <div className="round">
    <img alt="avatar" src={user_avatarURL} />
  </div>
);

const Profile = ({ user_name, user_HP, children }) => (
  <div className="p-profile">
    <div>{children}</div>
    <div>
      <p>{user_name}</p>
      <p>HP: {user_HP}</p>
    </div>
  </div>
);

const User = ({ user_id, user_name, user_avatarURL, user_choice, user_HP, user_showPlayer }) => (
  <Profile
    user_name={user_name}
    user_HP={user_HP}
  >
    <AvatarRound user_avatarURL={user_avatarURL} />
  </Profile>
);
class SimpleDialog extends React.Component {
  handleClose = (value, users, id) => {
    this.props.onClose(value, users, id);
  };

  handleListItemClick = (value, users, id) => {
    this.props.onClose(value, users, id);
  };

  render() {
    const { classes, onClose, selectedValue, attackNames, users, id, ...other } = this.props;

    return (
      <Dialog onClose={(id) => this.handleClose(id)} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Set Attack</DialogTitle>
        <div>
          <List>
            {attackNames.map((attackName, i) => (
              <ListItem button onClick={() => this.handleListItemClick('attacks' + ++i, users, id)} key={attackName}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={attackName} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  users: PropTypes.object,
  attackNames: PropTypes.array,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedCampaign: "spock",
      attackNames: ["Rock!", "Paper!", "Scissors!", "Spock!" , "Lizard!"],
      users: [
        { id : '0',
          name: 'player1',
          avatarURL: "http://i65.tinypic.com/1zwypw7.jpg",
          choice: "",
          HP: 400,
          showPlayer: true,
          open: false,
          selectedValue: "",
        },
        { id : '1',
          name: 'player2',
          avatarURL: "http://i65.tinypic.com/1zwypw7.jpg",
          choice: "",
          HP: 400,
          showPlayer: false,
          open: false,
          selectedValue: "",
        },
      ],
      bothSelected: false,
      resolvedBattle: false,
      resolvedText: "",
      p1WonBattle: false,
      p1Turn: true,
      showIsSelectedCampaign: true,
      showResolve: false,
      showNext: false,
    };
    this.handleChangeMenu = this.handleChangeMenu.bind(this);
    this.handleSubmitMenu = this.handleSubmitMenu.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleClickResolve = this.handleClickResolve.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickOpen = (users, name) => {
    if (name === users[0].name) {
      this.setState({
        users: [
          { id : '0',
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: true,
            open: true,
            choice: users[0].choice,
          },
          { id : '1',
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: false,
            open: false,
            choice: users[1].choice,
          },
        ],
      });
    } else if(name === users[1].name) {
      this.setState({
        users: [
          { id : '0',
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: false,
            open: false,
            choice: users[0].choice,
          },
          { id : '1',
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: true,
            open: true,
            choice: users[1].choice,
          },
        ],
      });
    }
  };

  handleClose = (value, users, name) => {
    alert('value: ' + value + '\nname: ' + name + '\nusers: ' + users);
    if (name === users[0].name) {
      this.setState({
        users: [
          { id : '0',
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: true,
            open: false,
            choice: value,
          },
          { id : '1',
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: false,
            open: false,
            choice: users[1].choice,
          },
        ],
      });
    } else if(name === users[1].name) {
      this.setState({
        users: [
          { id : '0',
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: true,
            open: false,
            choice: users[0].choice,
          },
          { id : '1',
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: false,
            open: false,
            choice: value,
          },
        ],
      });
    }
  };

  handleChangeMenu(e) {
    let atkNames = getAtkNames(e.target.value);

    this.setState({
      isSelectedCampaign: e.target.value,
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
          HP: 500,
          showPlayer: true,
          open: false,
          choice: users[0].choice,
        },
        { id : users[1].id,
          name: users[1].name,
          avatarURL: users[1].avatarURL,
          HP: 500,
          showPlayer: false,
          open: false,
          choice: users[1].choice,
        },
      ],
      showIsSelectedCampaign: false,
    });
    e.preventDefault();
  }

  handleChangeForm(e, users, name) {
    if (name === users[0].name) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: users[0].showPlayer,
            open: false,
            choice: e.target.value,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: users[1].showPlayer,
            open: false,
            choice: users[1].choice,
          },
        ]
      });
    } else if(name === users[1].name) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: users[0].showPlayer,
            open: false,
            choice: users[0].choice,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: users[1].showPlayer,
            open: false,
            choice: e.target.value,
          },
        ]
      });
    }
  }

  handleClickButton(e, users, name) {
    if (name === users[0].name) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: !users[0].showPlayer,
            open: false,
            choice: users[0].choice,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: !users[1].showPlayer,
            open: false,
            choice: users[1].choice,
          },
        ],
        p1Turn: !this.state.p1Turn,
      });
    } else if(name === users[1].name) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: users[0].showPlayer,
            open: false,
            choice: users[0].choice,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: !users[1].showPlayer,
            open: false,
            choice: users[1].choice,
          },
        ],
        p1Turn: !this.state.p1Turn,
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
            HP: users[0].HP - damage,
            showPlayer: true,
            open: false,
            choice: users[0].choice,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: true,
            open: false,
            choice: users[1].choice,
          },
        ],
        resolvedBattle: true,
        resolvedText: 'Player 1 took ' + damage + ' damage!',
        p1WonBattle: true,
        showResolve: false,
        showNext: true,
      });
    } else if (((j > k) && ((j + k) % 2 === 0)) || ((j < k) && ((j + k) % 2 !== 0))) {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: true,
            open: false,
            choice: users[0].choice,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP - damage,
            showPlayer: true,
            open: false,
            choice: users[1].choice,
          },
        ],
        resolvedBattle: true,
        resolvedText: 'Player 2 took ' + damage + ' damage!',
        p1WonBattle: true,
        showResolve: false,
        showNext: true,
      });
    } else {
      this.setState({
        users: [
          { id : users[0].id,
            name: users[0].name,
            avatarURL: users[0].avatarURL,
            HP: users[0].HP,
            showPlayer: true,
            open: false,
            choice: users[0].choice,
          },
          { id : users[1].id,
            name: users[1].name,
            avatarURL: users[1].avatarURL,
            HP: users[1].HP,
            showPlayer: true,
            open: false,
            choice: users[1].choice,
          },
        ],
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
          HP: users[0].HP,
          showPlayer: true,
          open: false,
          choice: "",
        },
        { id : users[1].id,
          name: users[1].name,
          avatarURL: users[1].avatarURL,
          HP: users[1].HP,
          showPlayer: false,
          open: false,
          choice: "",
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

    if (!users[id]) {
      return null;
    }

    if (users[id].choice === "" || bothSelected) {
      atkBtn =
        <Button disabled>
          Attack!
        </Button>
    } else {
      atkBtn =
        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => this.handleClickButton(e, users, users[id].name)}
        >
          Attack!
        </Button>
    }



    return (
      <div className="player">
        <div  className="p-menu-wrapper">
          <Typography variant="subtitle1">Selected: {attackNames[users[id].choice[users[id].choice.length - 1] - 1]}</Typography>
          <br />
          <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen(users, users[id].name)}>
            CHOOSE ATTACK
          </Button>
          <SimpleDialog
            selectedValue={this.state.users[id].choice}
            open={this.state.users[id].open}
            onClose={(value) => this.handleClose(value, users, users[id].name)}
            attackNames={attackNames}
            users={users}
            id={id}
          />
          <br/>
          {atkBtn}
        </div>
      </div>
    );
  }

  render() {
    const {
      isSelectedCampaign,
      users,
      bothSelected,
      resolvedText,
      showIsSelectedCampaign,
      showResolve,
      showNext,
      p1Turn,
    } = this.state;

    let showMenu;
    let showStatus;
    let pWin;
    let showPlayers;

    if (showIsSelectedCampaign) {
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


    showStatus = "It is " + (p1Turn ? "Player 1" : "Player 2") + "'s turn";
    if (bothSelected) {
      showStatus = 'Resolve Battle?';
      if (resolvedText) {
        showStatus = resolvedText;
      }
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].HP <= 0) {
        let [lost] = users.splice(i, 1);
        alert(lost.name + ' HP: ' + lost.HP + ', which means that ' + lost.name + ' has lost.');
      }
    }

    if (users.length === 1) {
      pWin = (
        <div className="victory">
          <img src="https://imgur.com/H5Lm06M.gif" border="0" alt="Spongebob at the bubble bowl!"/>
          <ul>
            {users
              .filter(points => points.HP > 0)
              .map(item => (
                <li key={item.id}>
                  {item.name} has won sweet victory!
                </li>
              ))
            }
          </ul>
        </div>
      );
    }


    let shownPlayers = users.filter(item => item.showPlayer);

    showPlayers = (
      <div>
        {users.length === shownPlayers.length ?
          <div className="results">Results</div>
          : <div className="results"></div>
        }
        <div className="player-stats">
          {users.slice(0, 2)
            .filter(item => item.showPlayer)
            .map(item => {
              return (
              <ul>
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
              </ul>
              )})
            }
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
            showNext={showNext}
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