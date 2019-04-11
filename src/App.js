import React from 'react';
import { connect } from 'react-redux'
import { addGUN, removeGUN, addGunAsync }  from './index.redux'
import axios from 'axios'

// const mapStatetoProps = (state) => {
//   return {num:state}
// }
// const actionCreators = {addGUN, removeGUN, addGunAsync}
// App = connect(mapStatetoProps, actionCreators)(App)
@connect(
  // 你要state什么属性放到props里
  state => ({num:state}),
  // 你要什么方法，放到props里，自动dispatch
  {addGUN, removeGUN, addGunAsync}
)
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    axios.get('/data').then(res => {
      if (res.status === 200) {
        this.setState({data: res.data})
      }
      console.log(res)
    })
  }
  render() {
    return (
      <div className="App">
        <h2>我是{this.state.data.user}</h2>
        <h1>现在有机枪{this.props.num}把</h1>
        <button onClick={this.props.addGUN}>申请武器</button>
        <button onClick={this.props.addGunAsync}>拖两天申请武器</button>
        <button onClick={this.props.removeGUN}>归还武器</button>
      </div>
    );
  }
}

export default App;