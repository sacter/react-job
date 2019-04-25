import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, WingBlank, Button } from 'antd-mobile'
import browserCookie from 'browser-cookies'

@connect(
  state => state.user
)
class User extends React.Component{
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(){
    browserCookie.erase('userid')
    console.log('out')
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user?(
      <div className='user-page'>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} alt=''/>}
          title={props.user}
          message={props.type==='boss'?props.company:null}
        />
        <List renderHeader={() => '简介'}>
          <Item
            multipleLine
          >
            {props.title}
            {props.desc.split('\n').map(v =>
              <Brief key={v}>{v}</Brief>  
            )}
            {props.money?<Brief>薪资：{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <WhiteSpace></WhiteSpace>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type='primary' onClick={this.logout}>退出登录</Button>
        </WingBlank>
      </div>
    ):null
  }
}

export default User