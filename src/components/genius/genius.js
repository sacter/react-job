import React from 'react'
import { connect } from 'react-redux'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Genius extends React.Component{
  componentDidMount(){
    this.props.getUserList('boss')
  }
  render(){
    return(
      <div className='list-container'>
        <WingBlank>
          {this.props.userList.map(v => (
            v.avatar?(
              <div key={v._id}>
                <Card>
                  <Card.Header
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  />
                  <Card.Body>
                    {v.desc.split('\n').map(v => (
                      <div key={v}>{v}</div>
                    ))}
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

export default Genius