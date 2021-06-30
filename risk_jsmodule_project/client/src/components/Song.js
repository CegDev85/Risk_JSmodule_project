import React, { Component } from "react"

export default class extends Component {
  componentDidMount() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  render() {
    return (
      <div>
        <audio className="audio-element">
          {/* <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source> */}
          <source src="http://sc3c-sjc.1.fm:7806"></source>
        </audio>
      </div>
    )
  }
}
