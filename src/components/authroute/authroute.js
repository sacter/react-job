import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['/login', '/register']
    const pathname = this.props.history.location.pathname
    if (publicList.includes(pathname)) {
      return
    }
    // 获取用户信息
    axios.get('/user/info').then(res =>{
      if (res.status === 200) {
        if (res.code === 0) {
          // 有登录信息
        } else {
          this.props.history.push('/login')
        }
      }
    })
  }
  render(){
    return <p>判断跳转的地方</p>
  }
}

export default AuthRoute