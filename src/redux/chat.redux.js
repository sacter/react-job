import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:8001')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat (state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter( v => {
          return !v.read && v.to === action.payload.userid
        }).length
      }
    case MSG_RECV:
    const num = action.payload.to === action.userid ? 1 : 0 
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread:state.unread + num
      }
    // case MSG_RECV:
    default:
      return state
  }
}
function msgList(msgs, users, userid) {
  return {type: MSG_LIST, payload: {msgs, users, userid}}
}
function msgRecv (msg, userid) {
  return {type: MSG_RECV, payload: msg, userid}
}
export function recvMsg () {
  return (dispatch, getState) => {
    socket.on('recvmsg', data => {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}
export function sendMsg ({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}
export function getMsgList () {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      const userid = getState().user._id
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msg, res.data.users, userid))
      }
    })
  }
}