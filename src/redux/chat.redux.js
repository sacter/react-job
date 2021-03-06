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
        chatmsg: duplicateRemone([...state.chatmsg, action.payload]),
        unread:state.unread + num
      }
    case MSG_READ:
      const {from, readnum} = action.payload
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true: v.read})),
        unread:state.unread - readnum
      }
    default:
      return state
  }
}
function duplicateRemone(arr) { // 去重
  const obj = {}
  let newArr = arr.reduce((cur, next) => {
    if (!obj[next._id]) {
      obj[next._id] = true
      cur.push(next)
    }
    return cur
  }, [])
  return newArr
}
function msgList(msgs, users, userid) {
  return {type: MSG_LIST, payload: {msgs, users, userid}}
}
function msgRecv (msg, userid) {
  return {type: MSG_RECV, payload: msg, userid}
}
function msgRead({from, userid, num}) {
  return {type: MSG_READ, payload: {from, userid, num}}
}
export function readMsg (from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from}).then(res => {
      const userid = getState().user._id
      if (res.status === 200 && res.data.code === 0) {
        const num = res.data.num
        dispatch(msgRead({from, userid, num}))
      }
    })
  }
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