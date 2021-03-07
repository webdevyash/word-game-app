import React from 'react'
import logo from './logo.svg';
import './App.css';
import PlayGround from './components/PlayGround'
class App extends React.Component {
  state = {
    gameStarted: false
  }

  startTheGame = () => {
    this.setState({
      gameStarted: true
    })
  }
  render() {
    return (
      <div className="app-container">
        <h1 className="game-name">Word Game</h1>
        {!this.state.gameStarted && <button className='start-button' onClick={this.startTheGame}>Start</button>}
        {this.state.gameStarted && <PlayGround />}
      </div>
    );
  }
}

export default App;
