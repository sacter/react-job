import React from 'react'
import { NavBar, InputItem, TextareaItem } from 'antd-mobile'
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
        <AvatarSelector
          selectAvatar={this.selectAvatar}
        ></AvatarSelector>
        <InputItem onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          title="职位要求"
          placeholder="请输入职位要求"
          rows={3}
          autoHeight
          onChange={v => this.onChange('desc', v)}>
        </TextareaItem>
      </div>
    )
  }
}

export default BossInfo