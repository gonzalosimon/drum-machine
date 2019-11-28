import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const projectName = 'drum-machine';
localStorage.setItem('example_project', 'Drum Machine');

const data = [
  { id: 'Chord-1', letter: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
  { id: 'Chord-2', letter: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
  { id: 'Chord-3', letter: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
  { id: 'Shaker', letter: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
  { id: 'Open-HH', letter: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
  { id: 'Closed-HH', letter: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
  { id: 'Punchy-Kick', letter: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
  { id: 'Side-Stick', letter: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
  { id: 'Snare', letter: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'  },
]
class DrumPad extends React.Component {
 
  componentDidMount() {
    console.log(this.audio)
    document.addEventListener('keydown', this.handleKeydown)
    window.focus()
  }
  
 componentWillUnmount() {
   document.removeEventListener('keydown', this.handleKeydown)
 }
  
  handleKeydown = e => {
    if(e.keyCode === this.props.letter.charCodeAt()) {
      this.audio.play()
      this.audio.currentTime = 0
      this.props.handleDisplay(this.props.id)
    }
  }
 
  handleClick = () => {
    this.audio.play()
    this.audio.currentTime = 0
    this.props.handleDisplay(this.props.id)
  }
  
  render() {
    return (
      <div 
          className='drum-pad' 
          id={this.props.id}
          onClick={this.handleClick}
      >
        <h1>{this.props.letter}</h1>
        <audio id={this.props.letter}
               className='clip'
               src={this.props.src}
               ref={ref => this.audio = ref}
          ></audio>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: 'Click or Press a Key'
    }
  }
  
  handleDisplay = display => this.setState({ display })
  
  render(){
    return(
    <div id='drum-machine'>
        <div id='display'>{this.state.display}</div>
        <div id='drum-pads'>{data.map(d => (
          <DrumPad
            key={d.id}
            id={d.id}
            letter={d.letter}
            src={d.src}
            handleDisplay={this.handleDisplay}
          />   
         ))}</div>
    </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById("root"))

export default App;
