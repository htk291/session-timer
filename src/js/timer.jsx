
import React, { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeoutID: -1,
      startAt: -1,
      past: 0 // 秒
    }
  }

  render() {
    const rest = this.getRestTime()
    const humanizeTime = this.humanizeTime(this.props.limit - this.state.past)
    const style = {
      'transform': `rotate(${360 * (rest)}deg)`
    }

    return (
      <div>
        <time>@{humanizeTime}</time>
        <div className = "logo second-hand" style={style}>
          <img src = "http://builderscon.io/assets/images/hex_logo.png" />
        </div>
      </div>
    )
  }

  humanizeTime(rest) {
    const padd = (n, digit = 2) => ('0'.repeat(digit) + n).substr(-digit)
    const minutes = Math.floor(rest / 60)
    const seconds = Math.round(rest % 60)

    return `${padd(minutes)}:${padd(seconds)}`
  }

  getRestTime() {
    return this.state.past / this.props.limit
  }

  handleLimit() {
    this.props.onLimit()
    this.stop()
  }

  tick() {
    const past = (new Date() - this.state.startAt) / 1000
    this.setState({
      past: past
    })

    this.props.onTick(past)

    if (past> this.props.limit) {
      this.handleLimit()
    }
  }

  start() {
    this.setState({
      startAt: new Date(),
      timeoutID: setInterval(this.tick.bind(this), 1000)
    })
  }

  stop() {
    this.setState({
      past: 0
    })
    clearInterval(this.state.timeoutID)
  }
}
