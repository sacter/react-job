import React from 'react'
import Logo from '../../components/logo/logo'
import {
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Button,
  Radio
} from 'antd-mobile'

class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      type: 'genius' // 或者boss
    }
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <InputItem>密码</InputItem>
            <InputItem>确认密码</InputItem>
            <RadioItem checked={this.state.type==='genius'}>
              牛人
            </RadioItem>
            <RadioItem checked={this.state.type==='boss'}>
              Boss
            </RadioItem>
          </List>
          <WhiteSpace/>
          <Button type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register