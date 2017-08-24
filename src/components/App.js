import React, { Component } from 'react';
import Navbar from './navbar';
import click1 from '../media/click1.wav'
import click2 from '../media/click2.wav'
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      bpm: 100,
      count: 0,
      beatsPerMeasure: 4
    }

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBPMChange(e){
    const bpm = e.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        count:0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  }

  playClick = () => {
    const { count,beatsPerMeasure } = this.state;

    if (count%beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  startStop() {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(this.playClick, (60/this.state.bpm)*1000);
      this.setState({
        count: 0,
        playing: true
      }, this.playClick)
    }
  }
  render() {
    let { bpm,playing } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <h2>Metronome!</h2>
          <div className="metronome">
            <div>{bpm} BPM</div>
            <div className="slider">
              <input
                type="range"
                min="60"
                max="240"
                value={bpm}
                onChange={this.handleBPMChange.bind(this)}
              />
            </div>
            <button onClick={this.startStop.bind(this)}>{playing ? 'Pause' : 'Play'}</button>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
