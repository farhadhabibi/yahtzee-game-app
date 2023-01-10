import React, { Component } from 'react';
import { totalOneNumber, threeOrFourOfKind, fullHouse, largeStraight, smallStraight, yahtzee } from './helper';
import './ScoreTable.css'

class ScoreTable extends Component {
    constructor(props) {
        super(props);
        this.totalOneNumber = this.totalOneNumber.bind(this);
        this.threeOrFourKind = this.threeOrFourKind.bind(this);
        this.fullHouse = this.fullHouse.bind(this);
        this.smallStraight = this.smallStraight.bind(this);
        this.largeStraight = this.largeStraight.bind(this)
    }

    totalOneNumber(e) {
        const target = e.currentTarget.dataset;
        this.props.countScore(target.name, target.value, totalOneNumber)
    }

    threeOrFourKind(e) {
        const target = e.currentTarget.dataset;
        this.props.countScore(target.name, target.value, threeOrFourOfKind)
    }

    fullHouse(e) {
        const target = e.currentTarget.dataset;
        this.props.countScore(target.name, target.value, fullHouse)
    }

    smallStraight(e) {
        const target = e.currentTarget.dataset;
        this.props.countScore(target.name, target.value, smallStraight)
    }

    largeStraight(e) {
        const target = e.currentTarget.dataset;
        this.props.countScore(target.name, target.value, largeStraight)
    }

    getTotalScore() {
        const { scores } = this.props;
        let totalScore = 0;
        for (let score in scores) {
            if (scores[score]) totalScore += scores[score];
        }
        return totalScore;
    }

    render() {
        const { scores } = this.props;
        return (
            <div className="ScoreTable-container">
                <section className="Scoretable-section upper">
                    <h2>Upper</h2>
                    <div className={scores.ones === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='1' data-name="ones" onClick={scores.ones === undefined ? this.totalOneNumber : null}>
                        <p>Ones</p>
                        <p className="score">{scores.ones === undefined ? '1 point per 1' : scores.ones}</p>
                    </div>
                    <div className={scores.twos === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='2' data-name="twos" onClick={scores.twos === undefined ? this.totalOneNumber : null}>
                        <p>Twos</p>
                        <p>{scores.twos === undefined ? '2 point per 2' : scores.twos}</p>
                    </div>
                    <div className={scores.threes === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='3' data-name="threes" onClick={scores.threes === undefined ? this.totalOneNumber : null}>
                        <p>Threes</p>
                        <p>{scores.threes === undefined ? '3 point per 3' : scores.threes}</p>
                    </div>
                    <div className={scores.fours === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='4' data-name="fours" onClick={scores.fours === undefined ? this.totalOneNumber : null}>
                        <p>Fours</p>
                        <p>{scores.fours === undefined ? '4 point per 4' : scores.fours}</p>
                    </div>
                    <div className={scores.fives === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='5' data-name="fives" onClick={scores.fives === undefined ? this.totalOneNumber : null}>
                        <p>Fives</p>
                        <p>{scores.fives === undefined ? '5 point per 5' : scores.fives}</p>
                    </div>
                    <div className={scores.sixes === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='6' data-name="sixes" onClick={scores.sixes === undefined ? this.totalOneNumber : null}>
                        <p>Sixes</p>
                        <p>{scores.sixes === undefined ? '6 point per 6' : scores.sixes}</p>
                    </div>
                </section>
                <section className="Scoretable-section lower">
                    <h2>Lower</h2>
                    <div className={scores.threeOfKind === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='3' data-name="threeOfKind" onClick={scores.threeOfKind === undefined ? this.threeOrFourKind : null}>
                        <p>Three of Kind</p>
                        <p>{scores.threeOfKind === undefined ? 'Sum all dice if 3 are the same' : scores.threeOfKind}</p>
                    </div>
                    <div className={scores.fourOfKind === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='4' data-name="fourOfKind" onClick={scores.fourOfKind === undefined ? this.threeOrFourKind : null}>
                        <p>Four of Kind</p>
                        <p>{scores.fourOfKind === undefined ? 'Sum all dice if 4 are the same' : scores.fourOfKind}</p>
                    </div>
                    <div className={scores.fullHouse === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='25' data-name="fullHouse" onClick={scores.fullHouse === undefined ? this.fullHouse : null}>
                        <p>Full House</p>
                        <p>{scores.fullHouse === undefined ? '25 points for a full house' : scores.fullHouse}</p>
                    </div>
                    <div className={scores.smallStraight === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='30' data-name="smallStraight" onClick={scores.smallStraight === undefined ? this.smallStraight : null}>
                        <p>Small Straight</p>
                        <p>{scores.smallStraight === undefined ? '30 points for a small straight' : scores.smallStraight}</p>
                    </div>
                    <div className={scores.largeStraight === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='40' data-name="largeStraight" onClick={scores.largeStraight === undefined ? this.largeStraight : null}>
                        <p>Large Straight</p>
                        <p>{scores.largeStraight === undefined ? '40 points for a large straight' : scores.largeStraight}</p>
                    </div>
                    <div className={scores.yahtzee === undefined ? 'ScoreTable' : 'ScoreTable disabled'} data-value='50' data-name="yahtzee" onClick={scores.yahtzee === undefined ?
                        (e) => this.props.countScore(e.currentTarget.dataset.name, e.currentTarget.dataset.value, yahtzee) : null}>
                        <p>Yahtzee</p>
                        <p>{scores.yahtzee === undefined ? '50 points for yahtzee' : scores.yahtzee}</p>
                    </div>
                </section>
                <div className='totalScore'>
                    <h2>TOTAL SCORE: {this.getTotalScore()}</h2>
                </div>

            </div >
        )
    }
}

export default ScoreTable;