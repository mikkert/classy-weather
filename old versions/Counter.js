import React from 'react'
class Counter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,
        }

        this.countIncrement = this.countIncrement.bind(this)
        this.countDecrement = this.countDecrement.bind(this)
    }
    countIncrement() {
        this.setState((curState) => {
            return { count: curState.count + 1 }
        })
    }
    countDecrement() {
        this.setState((curState) => {
            return { count: curState.count - 1 }
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.countDecrement}>-</button>
                <span>{this.state.count}</span>
                <button onClick={this.countIncrement}>+</button>
            </div>
        )
    }
}

export default Counter
