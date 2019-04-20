import React from 'react'
import { Grid }  from 'antd-mobile' 

class AvatarSelector extends React.Component{

  render(){
    const avatarList = 'boy,boy-1,boy-2,boy-3,boy-4,boy-5,girl,girl-1,girl-2,girl-3,girl-4,girl-5,girl-6,girl-7,man,man-1'
                        .split(',')
                        .map(v => ({
                          icon: require(`../img/${v}.png`),
                          text: v
                        }))
    return (
      <div>
        头像选择
        <Grid
          data={avatarList}
          activeStyle={false}
          onClick={el => {
            this.props.selectAvatar(el.text)
          }}
        />
      </div>
    )
  }
}

export default AvatarSelector