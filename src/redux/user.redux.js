import axios from "axios";
import { gerRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
}
// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: gerRedirectPath(action.payload), isAuth: true, ...action.data}
    case ERROR_MSG:
    return {...state, msg: action.msg, isAuth: false}
    default:
      return state
  }
}

function errorSuccess (data) {
  return {data, type: REGISTER_SUCCESS}
}

function errorMsg (msg) {
  return {msg, type: ERROR_MSG}
}

export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不一致')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then(res => {
      if (res.state === 200 && res.data.code === 0) {
        dispatch(errorSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}