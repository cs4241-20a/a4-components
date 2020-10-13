import React, { Component } from "react";
import styles from "./styles/upload.module.css";
import M from "materialize-css";
import ABCJS from "abcjs";

export class Upload extends Component {
  state = {
    musicFile: null,
    songName: null,
  };
  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
    });
  };
  handleFileChange = (event) => {
    this.setState({
      ...this.state,
      musicFile: event.target.files[0],
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const musicFile = this.state;
    const formData = new FormData();
    formData.append("songName", musicFile.songName);
    formData.append("xmlFile", musicFile.musicFile);
    fetch("/uploadXML", {
      credentials: "include",
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status === 403) {
          M.toast({ html: "You are not logged in" });
        } else if (res.status === 400) {
          M.toast({ html: "Your file could not be read" });
        } else if (res.status === 500) {
          M.toast({ html: "Server Error" });
        } else {
          M.toast({ html: "File Uploaded" });
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        if (!!res["abcString"]) {
          window.AudioContext =
            window.AudioContext ||
            window.webkitAudioContext ||
            navigator.mozAudioContext ||
            navigator.msAudioContext;

          const audioContext = new window.AudioContext();
          const viewObj = ABCJS.renderAbc("musicPlayer", res.abcString);
          const synth = new ABCJS.synth.CreateSynth();
          synth
            .init({
              audioContext: audioContext,
              visualObj: viewObj[0],
              millisecondsPerMeasure: 2115,
              options: {
                program: 33,
                midiTranspose: -12,
              },
            })
            .then((synthRes) => {
              synth.prime().then((val) => {
                synth.start();
              });
            })
            .then(() => {
              return Promise.resolve();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };
  render() {
    return (
      <article className="card blue-grey darken-2">
        <header className="card-header">
          <h3 className="card-title white-text header">Upload a Song</h3>
        </header>
        <div className="card-content">
          <p className="flow-text white-text">
            The file required is a musicXML file. No other file types are
            supported at the moment.
          </p>
          <p className="flow-text white-text">
            However, most tab and sheet music programs include a musicXML
            converter.
          </p>
          <form
            className="container form"
            encType="multipart/form-data"
            onSubmit={this.handleSubmit}
            action="submit"
          >
            <label htmlFor="songName" className="songName white-text">
              Song Name
            </label>
            <input
              type="text"
              id="songName"
              className="text-input white-text"
              onChange={this.handleChange}
            />
            <div className={styles.formButtons}>
              <label htmlFor="fileUpload" className={styles.uploadButton}>
                <p className="waves-effect waves-light btn-large orange darken-4 white-text">
                  MusicXML File
                  <i className="material-icons right">arrow_upward</i>
                </p>
                <br />
              </label>
              <input
                className="fileUpload"
                id="fileUpload"
                name="fileUpload"
                type="file"
                accept=".xml"
                onChange={this.handleFileChange}
              />
              <button
                className="btn waves-effect waves-light teal accent-3 black-text"
                type="submit"
                name="action"
                id="uploadXML"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
          <div style={{ "overflow-x": "scroll" }}>
            <div id="musicPlayer" className="center-align"></div>
          </div>
        </div>
      </article>
    );
  }
}

export default Upload;
