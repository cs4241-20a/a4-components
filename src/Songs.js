import React, { Component } from "react";

export class Songs extends Component {
  state = {
    songs: [],
  };
  getSongs = () => {
    fetch("/songs", {
      credentials: "include",
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {

        if (res["songs"]) {
          return res.songs
        }
        else {
            return [];
        }
      }).then(songs => {
        let songElems = [];
        songs.map((song) => songElems.push(<li className="flow-text white-text">{song.songName}</li>))
        this.setState((state) => ({
            songs: songElems
        }))
        console.log(this.state)
      })
  };
  componentDidMount() {
    this.getSongs();
  }
  render() {
    return (
      <article className="card blue-grey darken-2">
        <header className="card-header">
          <h3 className="card-title white-text header">Upload a Song</h3>
        </header>
        <div className="card-content">
          <p className="flow-text white-text">These are your songs</p>
          <ul>{this.state.songs}</ul>
        </div>
      </article>
    );
  }
}

export default Songs;
