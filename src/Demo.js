import React, { Component } from "react";
import ABCJS from "abcjs";
export class Demo extends Component {
  jotaro =
    'X:1\nT:Stardust Crusaders\nL:1/16\nQ:1/4=140\nM:4/4\nI:linebreak $\nK:C\nV:1 bass stafflines=4 strings=E2,A2,D3,G3 nm="Bass Guitar"\nV:1\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %2\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %4\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %6\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %8\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %10\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %12\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %14\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %16\n F,2 C,2 ^D, E, z F, F,2 C,2 D,2 E,2 | F,2 C,2 ^D, E, z F, F,2 D,2 F,2 ^F,2 | %18\n F,2 C,2 ^D, E, z F, F,2 C,2 D,2 E,2 | F,2 C,2 ^D, E, z F, F, z z2 z4 | %20\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %22\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %24\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %26\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %28\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %30\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %32\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %34\n F,2 z ^D, D, C, ^G,,2 F,,2 z B,, B,, ^A,, G,,2 | F,,2 z B,, B,, ^A,, ^G,,2 F,,2 z D, D, ^D, E,2 | %36\n F,2 C,2 ^D, E, z F, F,2 C,2 D,2 E,2 | F,2 C,2 ^D, E, z F, F,2 D,2 F,2 ^F,2 | %38\n F,2 C,2 ^D, E, z F, F,2 C,2 D,2 E,2 | F,2 C,2 ^D, E, z F,4 F,4 F, | %40';

  test = () => {
    window.AudioContext = 
            window.AudioContext ||
			window.webkitAudioContext ||
			navigator.mozAudioContext ||
            navigator.msAudioContext;
            
    const audioContext = new window.AudioContext();
    const viewObj = ABCJS.renderAbc('musicPlayer', this.jotaro)
    const synth = new ABCJS.synth.CreateSynth()
    synth.init({
        audioContext: audioContext,
        visualObj: viewObj[0],
        millisecondsPerMeasure: 2115,
        options: {
            program: 33,
            midiTranspose: -12
        }
    }).then((synthRes) => {
            synth.prime().then((val) => {
                synth.start()
            })
        }).then(() => {
            return Promise.resolve()
        })
        .catch((err) => {
            console.log(err)
        })
  };
  render() {
    return (
      <article className="card blue-grey darken-2">
        <header className="card-header">
          <h3 className="card-title white-text header">Upload a Song</h3>
        </header>
        <div className="card-content">
          <p className="flow-text white-text">Here is a song demo</p>
          <p className="flow-text white-text">It is not the best, but that's because the Midi player for ABCJS isn't super clean. Currently the tempo is dropped a little.</p>
          <div style={{'overflow-x': 'scroll'}} >
            <div id="musicPlayer" className="center-align"></div>
          </div>
          <button className="btn waves-effect waves-light teal accent-3 black-text" onClick={this.test}>Play</button>
        </div>
      </article>
    );
  }
}

export default Demo;
