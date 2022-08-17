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
      filteredWords: this.props.testWords
    };
  }

  searchWords = (query) => {
    let tempWords = [];
    for (let word of this.state.words) {
      if (word.word.toLowerCase().includes(query.toLowerCase())) {
        tempWords.push(word);
      }
    }
    this.setState({
      filteredWords: tempWords
    });
  }

  insertWord = (word, definition) => {
    let tempWords = this.state.words.slice();
    tempWords.push({word:word, definition:definition});
    this.setState({
      words: tempWords
    }, () => this.searchWords(''));
  }


  render() {
    // let filteredWords = [];


    return (
      <div id='app'>
        <TopBar />

        <SideBar
          search={this.searchWords.bind(this)}
          input={this.insertWord.bind(this)}
        />

        <RightBar
          words={this.state.filteredWords}
        />
      </div>
    )
  }
};

export default App;