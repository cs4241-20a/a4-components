import React, { Component } from "react";
import './Content/style.css';
import logo from './Content/logo.png';


class Home extends Component {
    render() {
        return (
            <div id="background">
            <img src= {logo} alt="Mrs. Puff's Boating School" id="logo"/>
            <div id="login-content">
            <h1>Welcome!</h1>
        <br />
        <p>Mrs. Puff's Boating School is Bikini Bottom's local boat-driving school, where Mrs. Puff teaches students how to drive.
            The boating school features the main building, a lighthouse, and a driving course. The lighthouse is at the school. The
        track features a parking lot for the boats used in the tests. The track is sponsored by ½ Shell, a Bikini Bottom gas station</p>
        <br />
        
            </div>
            </div>
    );
    }
}

export default Home;