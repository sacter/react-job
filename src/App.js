import React from 'react';
import { connect } from 'react-redux'
import { addGUN, removeGUN, addGunAsync }  from './index.redux'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>现在有机枪{this.props.num}把</h1>
        <button onClick={this.props.addGUN}>申请武器</button>
        <button onClick={this.props.addGunAsync}>拖两天申请武器</button>
        <button onClick={this.props.removeGUN}>归还武器</button>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {num:state}
}
const actionCreators = {addGUN, removeGUN, addGunAsync}
App = connect(mapStatetoProps, actionCreators)(App)
export default App;