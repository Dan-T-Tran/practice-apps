import React from 'react';
import TopBar from './TopBar.jsx';
import SideBar from './SideBar.jsx';
import RightBar from './RightBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // words: [],
      words: this.props.testWords,
    };
  }


  render() {
    let filteredWords = [];


    return (
      <div id='app'>
        <TopBar />

        <SideBar />

        <RightBar
          words={this.state.words}
        />
      </div>
    )
  }
};

export default App;