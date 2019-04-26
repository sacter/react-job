import React from 'react'
import PropTypes from 'prop-types' 
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(v) {
    this.props.history.push(`/chat/${v.user}`)
  }
  render(){
    return(
      <div className='list-container'>
        <WingBlank>
          {this.props.userList.map(v => (
            v.avatar?(
              <div key={v._id}>
                <Card
                  onClick={() => this.handleClick(v)}
                >
                  <Card.Header
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  />
                  <Card.Body>
                    {v.type === 'boss'?<div className='font14 f-w-6 line-hieght-24'>公司：{v.company}</div>:null}
                    {v.desc.split('\n').map(d => (
                      <div className='line-hieght-24 font12' key={d}>{d}</div>
                    ))}
                    {v.type === 'boss'?<div className='line-hieght-24 font12'>薪资：{v.money}</div>:null}
                  </Card.Body>
                </Card>
                <WhiteSpace/>
              </div>):null
          ))}
        </WingBlank>
      </div>
    )
  }
}

export default UserCard