import React, { Component } from "react"

class Loading extends Component {
    constructor(props) {
      super(props);
      this.state = {
        text: 'Loading'
      };
    }

    componentDidMount() {
      const stopper = this.state.text + '...';

      this.interval = window.setInterval(() => {
        this.state.text === stopper
          ? this.setState(() => ({ text: 'Loading' }))
          : this.setState((prevState) => ({ text: prevState.text + '.' }))
      }, 100)
    }

    componentWillUnmount() {
      window.clearInterval(this.interval);
    }

    render() {
      return (
        <div className='loading-wrapper text-center'>
          {this.state.text}
        </div>
      )
    }
}

export default Loading;