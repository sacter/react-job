import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

@withRouter
class NavLinkBar extends React.Component{
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data.filter(v => !v.hide)
    const {pathname} = this.props.location
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            key={v.path}
            title={v.text}
            icon={<i className={`iconfont font22 ${v.icon}`}></i>}
            selectedIcon={<i className={`iconfont font22 ${v.icon}-active`}></i>}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
          >
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar