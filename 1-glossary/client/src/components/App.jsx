import React from 'react';
import TopBar from './TopBar.jsx';
import SideBar from './SideBar.jsx';
import RightBar from './RightBar.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // words: [],
      words: this.props.testWords,
      filteredWords: this.props.testWords
    };
  }

/*
NOW TO SET UP AXIOS AND EXPRESS OH BOY MY FAVORIIIIIIITE
*/

  // searchWords = (query) => {
  //   let tempWords = [];
  //   for (let word of this.state.words) {
  //     if (word.word.toLowerCase().includes(query.toLowerCase())) {
  //       tempWords.push(word);
  //     }
  //   }
  //   this.setState({
  //     filteredWords: tempWords
  //   });
  // };

  searchWords = (query) => {
    axios.get('/glossary')
  };

  // insertWord = (word, definition) => {
  //   let tempWords = this.state.words.slice();
  //   tempWords.push({word:word, definition:definition});
  //   this.setState({
  //     words: tempWords
  //   }, () => this.searchWords(''));
  // }

  insertWord = (word, definition) => {
    axios.post('/glossary', {word: word, definition: definition})
    .then((response) => {
      if (response.data === 'error') {
        alert('Failed to insert word.');
      } else if (response.data === 'word already saved') {
        alert('Word already saved. Consider updating the word instead!');
      } else {
        console.log('word saved!');
      }
    })
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