import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Next(props) {
  return (
    <button onClick={() => props.onClickNext()}>
      Next
    </button>
  );
}

function Resolved(props) {
  if (props.showResolve) {
    return (
      <button onClick={() => props.onClickResolve()}>
        Resolve!
      </button>
    );
  } else {
    return (
      <button disabled>
        Resolve!
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

  renderPlayer1() {
    const attackNames = this.props.attackNames;
    const p1Choice = this.props.p1Choice;
    const p1HP = this.props.p1HP;
    const bothSelected = this.props.bothSelected;

    let atkBtn;

    if (bothSelected) {
      atkBtn =
        <button disabled>
          Attack!
        </button>
    } else {
      atkBtn =
        <button
          className="p1-submit"
          type="submit"
          id="attackButton"
        >
          Attack!
        </button>
    }

    return (
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
    const attackNames = this.props.attackNames;
    const p2Choice = this.props.p2Choice;
    const p2HP = this.props.p2HP;
    const bothSelected = this.props.bothSelected;

    let atkBtn;

    if (bothSelected) {
      atkBtn =
        <button disabled>
          Attack!
        </button>
    } else {
      atkBtn =
        <button
          className="p2-submit"
          type="submit"
          id="attackButton"
        >
          Attack!
        </button>
    }

    return (
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
    const showPlayer1 = this.props.showPlayer1;
    const showPlayer2 = this.props.showPlayer2;

    if(!showPlayer1 && showPlayer2) {
      return (
        <div className="player-stats">
          {this.renderPlayer2()}
        </div>
      );
    } else if(showPlayer1 && !showPlayer2) {
      return (
        <div className="player-stats">
          {this.renderPlayer1()}
        </div>
      );
    } else if(!showPlayer1 && !showPlayer2) {
      return (
        <div className="player-stats">
        </div>
      );
    } else {
      return (
        <div className="player-stats">
          <div className="results">Results</div>
          {this.renderPlayer1()}
          {this.renderPlayer2()}
        </div>
      );
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
  }

  handleMenuSubmit(e) {
    this.props.onMenuSubmit(e.target.value);
    e.preventDefault();
  }

  render() {
    const isSelectedCampaign = this.props.isSelectedCampaign;
    const attackNames = this.props.attackNames;
    const p1Choice = this.props.p1Choice;
    const p2Choice = this.props.p2Choice;
    const p1HP = this.props.p1HP;
    const p2HP = this.props.p2HP;
    const bothSelected = this.props.bothSelected;
    const showResolve = this.props.showResolve;
    const p1WonBattle = this.props.p1WonBattle;
    const showPlayer1 = this.props.showPlayer1;
    const showPlayer2 = this.props.showPlayer2;
    const isReversed = this.props.isReversed;
    const p1Turn = this.props.p1Turn;
    const onFormChange1 = this.props.onFormChange1;
    const onFormChange2 = this.props.onFormChange2;
    const onFormSubmit1 = this.props.onFormSubmit1;
    const onFormSubmit2 = this.props.onFormSubmit2;

    let turnLog = "It is " + (p1Turn ? "Player 1" : "Player 2") + "'s turn";

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
          {bothSelected ? 'Resolve battle?' : turnLog}
        </div>
        <div className="game-players">
          <Players
            isSelectedCampaign={isSelectedCampaign}
            attackNames={attackNames}
            p1Choice={p1Choice}
            p2Choice={p2Choice}
            p1HP={p1HP}
            p2HP={p2HP}
            p1WonBattle={p1WonBattle}
            bothSelected={bothSelected}
            showResolve={showResolve}
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
      isSelectedCampaign: "mage",
      attackNames: ["Fire Ball!", "Lightning Bolt!", "Water Blast!", "Earth Stomp!", "Wind Gust!"],
      p1Choice: "",
      p2Choice: "",
      p1HP: 400,
      p2HP: 400,
      bothSelected: false,
      showResolve: false,
      p1WonBattle: false,
      showPlayer1: true,
      showPlayer2: false,
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
    let atkNames = getAtkNames(isSelectedCampaign);

    this.setState({
      isSelectedCampaign: isSelectedCampaign,
      attackNames: atkNames,
    });
    // // this shows up to date info; 'spock'
    // alert('changed, isSelectedCampaign from const: ' + isSelectedCampaign);
    // // this brought up to date info, so it is a good sign
    // alert('up to date?, this.state.p1HP: ' + this.state.p1HP + ', this.state.p2HP: ' + this.state.p2HP);
  }

  handleMenuSubmitParent() {
    this.setState({
      isSelectedCampaign: this.state.isSelectedCampaign,
      attackNames: this.state.attackNames,
      p1HP: 500,
      p2HP: 500,
    });
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

    if (((j > k) && (j % 2 !== 0)) || ((j < k) && (j % 2 === 0))) {
      this.setState({
        p2HP: this.state.p2HP - damage,
        bothSelected: true,
        showResolve: false,
        p1WonBattle: true,
        showPlayer1: true,
        showPlayer2: true,
      });
      alert('Player 2 took ' + damage + ' damage!');
    } else if (((j > k) && (j % 2 === 0)) || ((j < k) && (j % 2 !== 0))) {
      this.setState({
        p1HP: this.state.p1HP - damage,
        bothSelected: true,
        showResolve: false,
        p1WonBattle: false,
        showPlayer1: true,
        showPlayer2: true,
      });
      alert('Player 1 took ' + damage + ' damage!');
    } else {
      this.setState({
        bothSelected: true,
        showResolve: false,
        showPlayer1: true,
        showPlayer2: true,
      });
      alert('Tie! No player took damage! Press "Next" to battle again.');
    }
  }

  handleNextClickParent() {
    this.setState({
      p1Choice: "",
      p2Choice: "",
      p1WonBattle: false,
      bothSelected: false, //unnecessary double surety
      showResolve: false, //unnecessary double surety
      showPlayer1: true,
      showPlayer2: false,
    });
    alert('Next battle! Who will win the war?');
  }

  render() {
    const isSelectedCampaign = this.state.isSelectedCampaign;
    const attackNames = this.state.attackNames;
    const p1Choice = this.state.p1Choice;
    const p2Choice = this.state.p2Choice;
    const p1HP = this.state.p1HP;
    const p2HP = this.state.p2HP;
    const bothSelected = this.state.bothSelected;
    const showResolve = this.state.showResolve;
    const p1WonBattle = this.state.p1WonBattle;
    const showPlayer1 = this.state.showPlayer1;
    const showPlayer2 = this.state.showPlayer2;
    const isReversed = this.state.isReversed;
    const p1Turn = this.state.p1Turn;

    if (this.state.p1HP <= 0) {
      alert('Player 2 has won the war!');
      return (
        <div className="victory">
          <img src="https://imgur.com/rPFz1Mk.gif" border="0" alt="Spongebob at the bubble bowl!"/>
          <h1>Player 2 has won sweet victory!</h1>
        </div>
      )
    } else if (this.state.p2HP <= 0) {
      alert('Player 1 has won the war!');
      return (
        <div className="victory">
          <img src="https://imgur.com/H5Lm06M.gif" border="0" alt="Spongebob at the bubble bowl!"/>
          <h1>Player 1 has won sweet victory!</h1>
        </div>
      )
    } else {
      return (
        <div className="game">
          <div className="game-title">
            Rock, Paper, Scissors
          </div>
          <Menu
            isSelectedCampaign={isSelectedCampaign}
            attackNames={attackNames}
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
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateDamage(isSelectedCampaign, p1Choice, p2Choice) {

  let campaignStats = ["mage", "melee", "yolo", "spock", "whale"];
  let attacks = ["attack1", "attack2", "attack3", "attack4", "attack5"];
  let indexOfP1Choice = attacks.indexOf(p1Choice);
  let indexOfP2Choice = attacks.indexOf(p2Choice);

  if (campaignStats.includes(isSelectedCampaign) && (indexOfP1Choice !== -1) && (indexOfP2Choice !== -1)) {
    let damageArr;
    for (let i in campaignStats) {
      if (isSelectedCampaign === campaignStats[i]) {
        switch (campaignStats[i]) {
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
    ["Fire Ball!", "Lightning Bolt!", "Water Blast!", "Earth Stomp!", "Wind Gust!"],
    ["Charge!", "Slash!", "Riposte!", "Deflect!" , "Lunge!"],
    ["Jeep!", "Bomber!", "Fighter!", "Tank!" , "Helo!"],
    ["Rock!", "Paper!", "Scissors!", "Spock!" , "Lizard!"],
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