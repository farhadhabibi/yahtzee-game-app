import React, { Component } from 'react';
import Die from './Die.js'
import { v4 as uuidv4 } from 'uuid';
import { randomDice, NUM_ROLLS } from './helper';
import ScoreTable from './ScoreTable.js';
import './Game.css'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dices: randomDice([
                { num: 0, id: uuidv4(), isFreeze: false },
                { num: 0, id: uuidv4(), isFreeze: false },
                { num: 0, id: uuidv4(), isFreeze: false },
                { num: 0, id: uuidv4(), isFreeze: false },
                { num: 0, id: uuidv4(), isFreeze: false }
            ]),
            rollLeft: NUM_ROLLS,
            scores: {},
            rolling: false
        }
        this.randomNum = this.randomNum.bind(this);
        this.toggleDice = this.toggleDice.bind(this);
        this.countScore = this.countScore.bind(this);
    }

    animateDices() {
        this.setState({ rolling: true }, () => {
            setTimeout(() => {
                this.setState({ rolling: false })
            }, 1000)
        })
    }

    componentDidMount() {
        this.animateDices()
    }

    randomNum() {
        this.setState({
            dices: randomDice(this.state.dices),
            rollLeft: --this.state.rollLeft,
            rolling: true
        }, () => {
            setTimeout(() => {
                this.setState({ rolling: false })
            }, 1000)
        })
    }

    toggleDice(id) {
        // return new Promise((resolve, reject) => {
        if (!this.state.rolling) {
            const newDices = this.state.dices.map(el => {
                if (el.id === id) return { ...el, isFreeze: !el.isFreeze }
                return { ...el }
            })
            this.setState(curState => ({ dices: newDices }));
        }

        // })
    }

    async countScore(rollName, value, rollFunction) {
        // for (let i = 0; i < this.state.dices.length; i++) {
        //     if (this.state.dices[i].isFreeze === true) {
        //         await this.toggleDice(this.state.dices[i].id)
        //     }
        // }
        for await (let el of this.state.dices) {
            if (el.isFreeze) this.toggleDice(el.id)
        }

        this.setState(curState => ({
            scores: { ...curState.scores, [rollName]: rollFunction(this.state.dices, +value) },
            dices: randomDice(curState.dices),
            rollLeft: 2,
        }))
        this.animateDices()
    }

    render() {
        const rollDice = this.state.dices.map((el) => <Die key={uuidv4()} id={el.id} value={el.num} isFreeze={el.isFreeze}
            toggleDice={this.toggleDice} rollLeft={this.state.rollLeft} rolling={this.state.rolling && !el.isFreeze} />)
        return (
            <div className="Game">
                <h1>Yahtzee Game!</h1>
                <div className="Game-dice">
                    {rollDice}
                    <button onClick={this.randomNum} disabled={(this.state.rollLeft === 0) ? true : false}>
                        {this.state.rollLeft} Rolls Left
                    </button>
                </div>
                <div className="Game-scores">
                    <ScoreTable countScore={this.countScore} scores={this.state.scores} />
                </div>
            </div>
        )
    }
}

export default Game;