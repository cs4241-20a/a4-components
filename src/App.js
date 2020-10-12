import React from 'react';
import './App.css';
import Pickem from './Pickem.js';

const teams = [
  {
      shortName: "G2",
      longName: "G2 Esports",
      players: [
          "Wunder", "Jankos", "Caps", "Perkz", "MikyX"
      ], 
      seed: "1"
  },
  {
      shortName: "GenG",
      longName: "Generation Gaming",
      players: [
          "Rascal", "Clid", "Bdd", "Ruler", "Life"
      ], 
      seed: "2"
  },
  {
      shortName: "SN", // TL will totally make it out of groups prove me wrong -.-
      longName: "Suning",
      players: [
          "Bin", "SofM", "Angel", "huanfeng", "SwordArt"
      ], 
      seed: "3"
  },
  {
      shortName: "DWG",
      longName: "Damwon Gaming",
      players: [
          "Nuguri", "Canyon", "Showmaker", "Ghost", "Beryl"
      ], 
      seed: "4"
  },
  {
      shortName: "TES",
      longName: "TOP Esports",
      players: [
          "369", "Karsa", "knight", "JackeyLove", "yuyanjia"
      ], 
      seed: "5"
  },
  {
      shortName: "FNC",
      longName: "Fnatic",
      players: [
          "Bwipo", "Selfmade", "Nemesis", "Rekkles", "Hylissang"
      ], 
      seed: "6"
  },
  {
      shortName: "JDG",
      longName: "Jingdong Gaming",
      players: [
          "Zoom", "Kanavi", "Yagao", "LokeN", "LvMao"
      ], 
      seed: "7"
  },
  {
      shortName: "DRX",
      longName: "DragonX",
      players: [
          "Doran", "Pyosik", "Chovy", "Deft", "Keria"
      ], 
      seed: "8"
  }
  
];

//indicates for each match number what position they are playing for
const matches = [
  {
      resultPlace:"semi1",
      player1: "seed1",
      player2: "seed2"
  },
  {
      resultPlace:"semi2",
      player1: "seed3",
      player2: "seed4"
  },
  {
      resultPlace:"semi3",
      player1: "seed5",
      player2: "seed6"
  },
  {
      resultPlace:"semi4",
      player1: "seed7",
      player2: "seed8"
  },
  {
      resultPlace:"final1",
      player1: "semi1",
      player2: "semi2"
  },
  {
      resultPlace:"final2",
      player1: "semi3",
      player2: "semi4"
  },
  {
      resultPlace:"winner",
      player1: "final1",
      player2: "final2"
  }
]


// main component
class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('username')
    let _loggedIn = false
    if (name){
      _loggedIn = true
    }

    let temp =  {
      "seed1": this.getTeamBySeed(1),
      "seed2": this.getTeamBySeed(2),
      "seed3": this.getTeamBySeed(3),
      "seed4": this.getTeamBySeed(4),
      "seed5": this.getTeamBySeed(5),
      "seed6": this.getTeamBySeed(6),
      "seed7": this.getTeamBySeed(7),
      "seed8": this.getTeamBySeed(8),
    }

    this.state = { loggedIn:_loggedIn,
                   wrongPass: false,
                   inputUname: "Username",
                   inputPword: "Password",
                   pickems:temp, 
                   username : name, 
                   hasPickems:false, 
                   leftPick:"Team 1", 
                   rightPick:"Team 2", 
                   matchNum:0,
                  }
   
    let newUser = urlParams.get('newUser');

    if (newUser === "true"){
        alert("An account with that username was not found so one was created")
        this.init(temp)
    }
    this.fetchAndUpdatePickems().then(pickems=>this.init(pickems))
    console.log("here 4")
    
    // do something to initilize the state (either to empty or the gathered data)
    
    
  }

  getTeamBySeed(seed){
    return teams[seed-1]
  } 

  getTeamByPlace(pickems, place){
      return pickems[place];
  }

  makePick(team, _matchNum) {
      let pickemCopy = JSON.parse(JSON.stringify(this.state.pickems))
      let teamObj

      for (let i = 0; i<teams.length; i++) {
        if (teams[i].shortName === team){
          teamObj = teams[i]
          break
        }
      }

      pickemCopy[matches[_matchNum].resultPlace] = teamObj; 
      
      if (_matchNum < 6) {
        this.setState({
          pickems:pickemCopy,
          matchNum:(_matchNum+1)
        })
        this.initPicks(pickemCopy, _matchNum+1);
      }
      else {
          this.sendPickems(pickemCopy)
          this.setState({
            pickems:pickemCopy,
            hasPickems:true
          })
      }
  }

  initPicks(pickems, _matchNum){ 
      console.log("Matchnum is = " + _matchNum)
      console.log(matches[_matchNum])
      let teamL = this.getTeamByPlace(pickems, matches[_matchNum].player1);
      let teamR = this.getTeamByPlace(pickems, matches[_matchNum].player2);

      this.setState({ leftPick  : teamL.shortName,
                      rightPick : teamR.shortName  })
        
  }

  sendPickems(pickem){
    fetch('/add', {
      method:'POST',
      body:JSON.stringify({
          username: this.state.username,
          pickdata: pickem
      }),
      headers : {
          "Content-Type":"application/json"
      }
    }).then( response => response.json())
        .then( json => {

        })
  }

  async fetchAndUpdatePickems(){
      return fetch('/db', {
        method:'POST',
        body:JSON.stringify({
            username: this.state.username
        }),
        headers : {
            "Content-Type":"application/json"
        }
      }).then( response => response.json())
          .then( json => {
              // if the pickems in the server is empty then we want to have 
              // an empty default pickems displayed
              console.log("here 2")
              if (json && json.pickem) {
                this.setState({hasPickems:true, pickems:json.pickem})
                return json.pickem
              }   
              else {
                let temp =  {
                  "seed1": this.getTeamBySeed(1),
                  "seed2": this.getTeamBySeed(2),
                  "seed3": this.getTeamBySeed(3),
                  "seed4": this.getTeamBySeed(4),
                  "seed5": this.getTeamBySeed(5),
                  "seed6": this.getTeamBySeed(6),
                  "seed7": this.getTeamBySeed(7),
                  "seed8": this.getTeamBySeed(8),
                }
                this.setState({
                  hasPickens:false, 
                  pickems: temp
                })
                return temp
              }
          })
    
  }

  modifyPicks(){
    let temp =  {
      "seed1": this.getTeamBySeed(1),
      "seed2": this.getTeamBySeed(2),
      "seed3": this.getTeamBySeed(3),
      "seed4": this.getTeamBySeed(4),
      "seed5": this.getTeamBySeed(5),
      "seed6": this.getTeamBySeed(6),
      "seed7": this.getTeamBySeed(7),
      "seed8": this.getTeamBySeed(8),
    }
    this.setState({
      pickems : temp,
      hasPickems:false
    })
    this.setState({matchNum:0})
    this.initPicks(temp, 0)
  }

  async deletePicks(){
    let temp =  {
      "seed1": this.getTeamBySeed(1),
      "seed2": this.getTeamBySeed(2),
      "seed3": this.getTeamBySeed(3),
      "seed4": this.getTeamBySeed(4),
      "seed5": this.getTeamBySeed(5),
      "seed6": this.getTeamBySeed(6),
      "seed7": this.getTeamBySeed(7),
      "seed8": this.getTeamBySeed(8),
    }
    this.setState({
      pickems : temp,
      hasPickems:false
    })
    return fetch('/delete', {
        method:'POST',
        body:JSON.stringify({
            username: this.state.username,
            pickdata: temp
        }),
        headers : {
            "Content-Type":"application/json"
        }
    }).then( response => response.json())
        .then( json => {
          this.setState({matchNum:0})
          this.initPicks(json.pickem, 0)
        })
  }


  init(pickems){
    if (!this.state.hasPickems) {
        this.setState({matchNum:0})
        this.initPicks(pickems, 0)
    }
  }
  
  verifyUser(_username, _password){
    fetch('/verify', {
        method:'POST',
        body:JSON.stringify({
            username: _username,
            password: _password
        }),
        headers : {
            "Content-Type":"application/json"
        }
    }).then( response => response.json())
        .then( json => {
            console.log(json);
            let newUrl = "/index.html?username="+json.result.username
            if (json.responseCode == 0){
                // created new account
                window.location.replace(newUrl+"&newUser=true")
            }
            else if (json.responseCode == -1){
                // incorrect username or password
                this.setState({wrongPass:true})
            }
            else if (json.responseCode == 1){
                // correct user name and password
                window.location.replace(newUrl+"&newUser=false")
            }
        })
  }

  handleSubmit(){
    this.verifyUser(this.state.inputUname, this.state.inputPword)
  }

  handleChangeUname(e){
    this.setState({inputUname:e.target.value})
  }

  handleChangePword(e){
    this.setState({inputPword:e.target.value})
  }

  handleGithub(){
    window.location.replace("/auth/github");
  }

  // render component HTML using JSX 
  render() {
    let footer;
    if (!this.state.loggedIn){
      let wrongPassText = ""
      if (this.state.wrongPass){
        wrongPassText = "Incorrect username and password combo"
      }

      return (
        <div class = "container">
          <h1>Login for 2020 LoL Worlds Pickems</h1>
        
          <form>
            <input type='text' value={this.state.inputUname} onChange={(e)=>{this.handleChangeUname(e)}}/>
          </form>
          <form>
            <input type='text' value={this.state.inputPword} onChange={(e)=>{this.handleChangePword(e)}}/>
          </form>
          <p>{wrongPassText}</p>
          <button onClick={()=>this.handleSubmit()}>Submit</button>
          <button onClick={()=>this.handleGithub()}>Login with Github</button>
        </div>
      )
    }
    else {
      if (this.state.hasPickems){
        // alt functions footer

        let mBut = <button 
                      onClick = {()=>this.modifyPicks()}>
                      Update My Pickems
                    </button>
        let dBut = <button id = "delete"
                      onClick = {()=>this.deletePicks()}>
                      Delete My Pickems
                    </button>

        footer = <div class = "container">
                      {mBut}
                      &nbsp;
                      {dBut}
                  </div>
      }
      else {
        // picker footer'
        console.log("here 0 team 1 is = " + this.state.leftPick)
        console.log("setting buttons match num: " + this.state.matchNum.valueOf())
        //let tempThis = this
        // let tempLeftPick  = this.state.leftPick
        // let tempRightPick = this.state.rightPick
        // let tempMatchNum  = this.state.matchNum.valueOf()
        let lBut = <button 
                      onClick={() => this.makePick(this.state.leftPick, this.state.matchNum)}>
                        {this.state.leftPick}
                    </button>

        let rBut = <button 
                      onClick={() => this.makePick(this.state.rightPick, this.state.matchNum)}>
                        {this.state.rightPick}
                    </button>
        footer = <div class = "container">
                    <p>Who will win?</p>
                    {lBut}
                    <span>vs.</span>
                    {rBut}
                  </div>
      }

      return (
        <div className="App">
          <Pickem data={this.state.pickems} />
          {footer}
        </div>
      )
    }
  }
}

export default App;
