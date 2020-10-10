import React from 'react';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// main component
class schedule extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { meetings:[], account:"" };
    //this.load()
    this.accountDisplay = React.createRef();
    this.meetingList = React.createRef();
    this.form = React.createRef();
  }

  addMeeting = (id, user, title, start, end) => {
    console.log(user);

    const newMeeting = document.createElement("tr");
    const meetingDel = document.createElement("button");
    const meetingMod = document.createElement("button");
    
    meetingDel.className = "btn btn-sm btn-danger";
    meetingMod.className = "btn btn-sm btn-success";
    
    newMeeting.innerHTML = "<td>"+title+"</td> <td>"+start+"</td> <td>"+end+"</td>";
    meetingDel.innerText = "Delete";
    meetingMod.innerText = "Update";
    
    meetingDel.onclick = () =>{
      
      fetch("/deleteMeeting", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => {
          for(var i = 0; i < this.state.meetings.length; i++)
            if(this.state.meetings[i].id.localeCompare(id) === 0)
              var newMeetings = this.state.meetings.splice(i, 1);
              this.setState({meetings: newMeetings});
        
          newMeeting.remove()
        });
      this.form.reset();
      this.form.elements.title.focus();
    }
    
    meetingMod.onclick = () => {
      let user = this.state.account;
      let title = this.form.elements.title.value;
      let start = this.form.elements.start.value;
      let end = this.form.elements.end.value;
  
      fetch("/modifyMeeting", {
        method: "POST",
        body: JSON.stringify({ id, user, title, start, end }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => {
        
          for(var i = 0; i < this.state.meetings.length; i++)
            if(this.state.meetings[i].id.localeCompare(id) === 0)
                var newMeetings = this.state.meetings.splice(i, 1);
                this.setState({meetings: newMeetings});
        
          this.addMeeting(id, user, title, start, end)
          newMeeting.remove()
        });
      this.form.reset();
      this.form.elements.title.focus();
    }
    
    newMeeting.appendChild(meetingMod);
    newMeeting.appendChild(meetingDel);
    
    var toAdd = {id, user, title, start, end, tr: newMeeting};
    this.setState({meetings: [...this.state.meetings, toAdd]})

    var sorted = this.state.meetings.sort((a, b) => (a.start > b.start) ? 1 : -1)
    this.setState({meetings: sorted});
    
    this.meetingList.innerHTML = "";
    
    this.state.meetings.forEach(meeting => {
      this.meetingList.appendChild(meeting.tr);
    })
  }

  meetingSubmit = () => {
  
    let user = this.state.account;
    let title = this.form.elements.title.value;
    let start = this.form.elements.start.value;
    let end = this.form.elements.end.value;
    
    //let createMeeting = true;
      
    fetch("/addMeeting", {
      method: "POST",
      body: JSON.stringify({ user, title, start, end }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.addMeeting(json._id, json.user, json.title, json.start, json.end);
      });
  
    this.form.reset();
    this.form.elements.title.focus();
  }
  
  getAccount = () => {
    console.log("Getting Account")
    fetch("/githubAccount")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.state.account = json;
      })
    
  }

  // render component HTML using JSX 
  render() {
    return (
      <div>
        <title>CS4241 Assignment 3</title>
        <meta charSet="utf-8" />
        <div className="container">
          <span className="label label-success" id="account" ref = {ref => this.accountDisplay = ref}/>
          <form ref = {ref => this.form = ref} onSubmit = {e => e.preventDefault()}>
            <input type="text" id="title" placeholder="Title" />
            <input type="time" id="start" placeholder="Start Time" />
            <input type="time" id="end" placeholder="End Time" />
            <button type="submit" className="btn btn-sm btn-primary">Add Meeting</button>
          </form>
          <table className="table table-striped">
            <thead>
              <tr><th>Meeting Title</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr></thead>
            <tbody id="meetings" ref = {ref => this.meetingList = ref}>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.state.account = localStorage.getItem("account");
    this.accountDisplay.innerText = "Account: " + this.state.account;
  
    if(this.state.account.localeCompare("github") === 0) {
        this.getAccount();
    }
    
    var sendAccount = this.state.account;
    console.log(sendAccount);
    fetch("/meetings", {
        method: "POST",
        body: JSON.stringify({account: sendAccount}),
        headers: {
        "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        Array.from(json).forEach(meeting => this.addMeeting(meeting._id, meeting.user, meeting.title, meeting.start, meeting.end))
        })
    
    this.form.addEventListener('submit', this.meetingSubmit);
  }
}

export default schedule;