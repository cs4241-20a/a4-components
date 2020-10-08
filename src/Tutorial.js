import React from 'react'
import NavBar from './NavBar'
import axios from "axios"
export default class Tutorial extends React.Component {
    state = {
        content: [],
      };
      componentDidMount() {
        axios.get("/content.json").then((response) => {
          this.setState({ content: response.data });
        });
      }
    render() {
        const { content } = this.state;
        const username = window.localStorage.username
        return (
            <div>
            <NavBar name={username}/>
            <div className="container">
                <div className="jumbotron"><h1>Tutorial</h1></div><br/>
                <p>Below is a basic tutorial on what each of the six table entries means and how to properly enter the data to make a Magic: the Gathering Card. To navigate to a specific trait, click on a link below:</p>
                <ul>
                    <li><a href="#name">Name</a></li>
                    <li><a href="#manacost">Mana Cost</a></li>
                    <li><a href="#cardtype">Card Type</a></li>
                    <li><a href="#abilities">Abilities</a></li>
                    <li><a href="#flavortext">Flavor Text</a></li>
                    <li><a href="#rarity">Rarity</a></li>
                </ul><br/>
                { content.map(con => 
                    (
                    <div>
                        <h2 id={con.id}>{con.name}</h2>
                        <div className="row">
                        <div className="col-sm-6">
                                <p>{con.content}</p>
                                <ul>{con.list.map(l=>
                                    <li>{l}</li>
                                )}</ul>
                                <p>{con.content2}</p>
                            </div>
                            <div className="col-sm-3">
                                <img src={con.imgsrc} alt={con.imgalt}/>
                            </div>
                        </div>
                        <br/>
                    </div>
                    )
                ) }
            </div>
            </div>        
        );
    }
}