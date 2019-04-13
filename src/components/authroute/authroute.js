import React from 'react'
import logoImg from './logo.jpg'
import './logo.css'

class AuthRoute extends React.Component{
  componentDidMount(){
    // 用户信息
  }
  render(){
    return (
      <div className="logo-container">
        <img src={logoImg} alt=''/>
      </div>
    )
  }
}

export default AuthRoute