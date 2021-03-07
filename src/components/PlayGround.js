import React from 'react'
import './PlayGround.css'

export default class PlayGround extends React.Component {
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    randomCharacter = this.alphabet[Math.floor(Math.random() * this.alphabet.length)]
    constructor() {
        super()
        this.state = {
            statement: 'Your Chance',
            word: this.randomCharacter,
            computersTurn: false,
            gameOver: false,
            gameOverText: ''
        }
    }

    handleInput = (e) => {

        this.setState({
            statement: 'Computer\'s Chance ...',
            word: e.target.value,
            computersTurn: true
        }, () => {
            fetch('https://api.datamuse.com/words?sp=' + this.state.word + '*&max=10')
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.length > 0) {
                        if (this.state.word === data[0].word) {
                            this.setState({
                                gameOver: true,
                                gameOverText: 'You Lost!!',
                                statement: '',
                                computersTurn: true,
                            })
                        } else {
                            const matchingWord = data[0].word
                            const currentWordLength = this.state.word.length
                            const nextComputerInput = matchingWord.substring(currentWordLength, currentWordLength + 1)
                            setTimeout(() => {
                                const isMatching = this.state.word === matchingWord.substring(0, matchingWord.length - 1 )
                                if (isMatching) {
                                    this.setState({
                                        gameOver: true,
                                        gameOverText: 'You Won!!'
                                    })
                                }
                                this.setState({
                                    statement: isMatching ? '' : 'Your Chance',
                                    word: this.state.word + nextComputerInput,
                                    computersTurn: isMatching
                                })
                            }, 3000)
                        }
                    } else {
                        this.setState({
                            gameOver: true,
                            gameOverText: 'You Lost!!',
                            statement: '',
                            computersTurn: true,
                        })
                    }
                }).catch((e) => console.log(e))

        })

    }

    startOver = () => {
        this.setState({
            statement: 'Your Chance',
            word: this.alphabet[Math.floor(Math.random() * this.alphabet.length)],
            computersTurn: false,
            gameOver: false,
            gameOverText: ''
        })
    }
    render() {
        return (
            <div className='playground-container'>
                <h4 className={this.state.computersTurn ? 'blue' : 'red'}>{this.state.statement}</h4>

                <input
                    className='input-box'
                    value={this.state.word}
                    disabled={this.state.computersTurn}
                    onChange={this.handleInput}
                >
                </input>
                {this.state.gameOver && (<div className='game-over'>{this.state.gameOverText}
                <button   onClick={this.startOver}className='start-over-button'>Start Over</button>
                </div>)}
            </div>
        )
    }
}
