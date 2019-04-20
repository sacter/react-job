import React from 'react'
import { NavBar, InputItem } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class BossInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }
  onChange (key, val) {
    this.setState({
      [key]: val
    })
  } 
  render(){
    return (
      <div>
        <NavBar mode='dark'>BOSS完善信息页</NavBar>
        <AvatarSelector></AvatarSelector>
        <InputItem onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <InputItem onChange={v => this.onChange('desc', v)}>
          职位要求
        </InputItem>
      </div>
    )
  }
}

export default BossInfo