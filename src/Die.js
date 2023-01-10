import React, { Component } from 'react';
import './Die.css'

class Die extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.toggleDice = this.toggleDice.bind(this);
    }

    toggleDice() {
        this.props.toggleDice(this.props.id)
    }

    render() {
        const { value, isFreeze, rollLeft, rolling } = this.props;
        const imgSrc = require(`./images/dice-${value}.png`);
        let classes = `${isFreeze || rollLeft === 0 ? 'Die-img disable ' : 'Die-img '}`
        if (rolling) classes += 'Die-rolling'

        return (
            <div className="Die">
                <input type="image" src={imgSrc} className={classes}
                    onClick={this.toggleDice} disabled={rollLeft === 0} />
            </div>
        )
    }
}

export default Die;