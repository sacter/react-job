import React from 'react'
import { Grid, List }  from 'antd-mobile'
import PropTypes from 'prop-types' 

class AvatarSelector extends React.Component{
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    const avatarList = 'boy,boy-1,boy-2,boy-3,boy-4,boy-5,girl,girl-1,girl-2,girl-3,girl-4,girl-5,girl-6,girl-7,man,man-1'
                        .split(',')
                        .map(v => ({
                          icon: require(`../img/${v}.png`),
                          text: v
                        }))
    const gridHeader = this.state.icon
                        ?(<div>
                          <span>已选择头像</span>
                          <img style={{width: 20}} src={this.state.icon}/>
                        </div>)
                        :'请选择头像'
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            activeStyle={false}
            onClick={el => {
              this.setState(el)
              this.props.selectAvatar(el.text)
            }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector