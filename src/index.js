import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Player extends React.Component {
  render(props) {
    return (
      <div>
        <h3>{this.props.p1Turn ? this.props.p1HP : this.props.p2HP}</h3>
        <h3>{this.props.p1Choice ? this.props.p1Choice : this.props.p2Choice}</h3>
      </div>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedCampaign: "",
      campaignProps: {},
      p1Choice: "",
      p2Choice: "",
      p1HP: 500,
      p2HP: 500,
      isReversed: false,
      p1IsWinning: false,
      p1Turn: true,
    }
  }



  render() {
    return (
      <div className="whole-menu">
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

        <div className="game-players">
          <div>
            <Player
              name="p1"
              isSelectedCampaign={this.state.isSelectedCampaign}
              campaignProps={this.state.campaignProps}
              p1Choice={this.state.p1Choice}
              p2Choice={this.state.p2Choice}
              p1HP={this.state.p1HP}
              p2HP={this.state.p2HP}
              isReversed={this.state.isReversed}
              p1IsWinning={this.state.p1IsWinning}
              p1Turn={this.state.p1Turn}
            />
          </div>
          <div className="p1-form">
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
                <button className="p1-submit" type="submit" id="attackButton">
                  Attack!
                </button>
              </div>
            </form>
          </div>

          <div>
            <Player
              name="p2"
              isSelectedCampaign={this.state.isSelectedCampaign}
              campaignProps={this.state.campaignProps}
              p1Choice={this.state.p1Choice}
              p2Choice={this.state.p2Choice}
              p1HP={this.state.p1HP}
              p2HP={this.state.p2HP}
              isReversed={this.state.isReversed}
              p1IsWinning={this.state.p1IsWinning}
              p1Turn={this.state.p1Turn}
            />
          </div>
          <div className="p2-form">
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
}

class Game extends React.Component {
  render() {
    return (
      <div>
        <div className="game-title">
          Rock, Paper, Scissors
        </div>
        <Menu />
        <div className="game-resolve">
          <button>
            Resolve!
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);