import React from 'react'
import io from 'socket.io-client'

class Chat extends React.Component {
  componentDidMount(){
    const socket = io('ws://localhost:8001')
  }
  render(){
    console.log(this.props)
    return(
      <h2>chat width user:{this.props.match.params.user}</h2>
    )
  }
}

export default Chat