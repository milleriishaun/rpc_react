import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {

  render() {

    // These are variables to hold data
    var reverse = false;
    var HIT_POINTS = 500;
    var SOFT_DAMAGE = 100;
    var HARD_DAMAGE = 200;
    var softCounter = SOFT_DAMAGE;
    var hardCounter = HARD_DAMAGE;

    var player1 = {
        name:"edicted",
        hp:HIT_POINTS,
        choice:""
    };

    var player2 = {
        name:"shadow",
        hp:HIT_POINTS,
        choice:""
    };

    // this is the Game update logic which needs to turn into onClicks within
    // the render-return of Game.
    document.getElementById("attackButton").onclick = attack;
    document.getElementById("resolveButton").onclick = resolve;
    document.getElementById("menu").onchange = menu;

    update();

    return (
      // this is the HTML
      // note that React has its own Form component and system
      <div>
        <h1 id="header"> Block, Paper, Scissors </h1>

        <select id="menu">
            <option value="mage">Mage</option>
            <option value="melee">Melee</option>
            <option value="yolo">YOLO</option>
            <option value="spock">Spock</option>
            <option value="whale">Whale</option>
        </select>

        <p id="p1"> ??? </p>
        <p id="p2"> ??? </p>
        <p id="p3"> ??? </p>
        <p id="p4"> ??? </p>

        <form>
            <input type="radio" name="attack" value="attack1" id="attack1"/>
            <label for="attack1" id="attack1_label">Fire Ball!</label><br/>
            <input type="radio" name="attack" value="attack2" id="attack2"/>
            <label for="attack2" id="attack2_label">Lightning Bolt!</label><br/>
            <input type="radio" name="attack" value="attack3" id="attack3"/>
            <label for="attack3" id="attack3_label">Water Blast!</label><br/>
            <input type="radio" name="attack" value="attack4" id="attack4"/>
            <label for="attack4" id="attack4_label">Wind Gust!</label><br/>
            <input type="radio" name="attack" value="attack5" id="attack5"/>
            <label for="attack5" id="attack5_label">Earth Stomp!</label><br/>
        </form>

        <button id="attackButton"> Attack! </button><br/>
        <button id="resolveButton"> Resolve </button><br/>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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

function attack(){
  if(player1.choice == ""){
      if (document.getElementById('attack1').checked)
          player1.choice = document.getElementById('attack1').value;
      else if (document.getElementById('attack2').checked)
          player1.choice = document.getElementById('attack2').value;
      else if (document.getElementById('attack3').checked)
          player1.choice = document.getElementById('attack3').value;
      else if (document.getElementById('attack4').checked)
          player1.choice = document.getElementById('attack4').value;
      else if (document.getElementById('attack5').checked)
          player1.choice = document.getElementById('attack5').value;
      else alert("No attack selected!");
  }
  else if (player2.choice == ""){
      var attack = document.querySelector('input[name = "attack"]:checked');
      player2.choice = attack.value;
  }
  else alert("Both players have chosen!");
  update();
}

function resolve(){
  /*
  attack1 counters attack2 and attack4
  attack2 counters attack5 and attack3
  attack3 counters attack1 and attack5
  attack4 counters attack3 and attack2
  attack5 counters attack4 and attack1
  //*/
  if(player1.choice != "" && player2.choice != ""){
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

function update(){
  document.getElementById("p1").innerHTML =
  player1.name + " has " + player1.hp + " hp ";
  document.getElementById("p2").innerHTML =
  player2.name + " has " + player2.hp + " hp ";
  document.getElementById("p3").innerHTML =
  player1.name + " : " + player1.choice;
  document.getElementById("p4").innerHTML =
  player2.name + " : " + player2.choice;
}