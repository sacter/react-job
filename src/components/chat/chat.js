import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

const socket = io('ws://localhost:8001')

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', msg: []}
  }
  componentDidMount(){
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }
  render(){
    const userid = this.props.match.params.user
    const Itme = List.Item
    const users = this.props.chat.users
    if (!users[userid]) return null
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    return(
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map( v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid?(
            <List key={v._id}>
              <Itme
                thumb={avatar}
              >{v.content}</Itme>
            </List>
          ):(
            <List key={v._id}>
              <Itme
                extra={<img src={avatar}/>}
                className='chat-me'
              >{v.content}</Itme>
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => {
                this.setState({text: v})
              }}
              extra={<span onClick={() => {this.handleSubmit()}}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat