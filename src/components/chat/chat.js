import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
import { emojiList } from '../../assets/emoji/emoji'

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
    this.fixCarousel()
  }
  fixCarousel(){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }
  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: '',
      showEmoji: false
    })
  }
  render(){
    let emoji = emojiList.split(' ').filter(v => v).map(v => ({text: v}))

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
              extra={
                <div>
                  <span
                    className='emoji-btn'
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                    role='img'
                  >😃</span>
                  <span onClick={() => {this.handleSubmit()}}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          {this.state.showEmoji?<Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            hasLine={false}
            onClick={el => {
              this.setState({
                text: this.state.text + el.text
              })
            }}
          />:null}
        </div>
      </div>
    )
  }
}

export default Chat