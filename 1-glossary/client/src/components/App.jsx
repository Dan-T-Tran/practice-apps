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
      words: [],
      currentSearch: ''
      // filteredWords: this.props.testWords
    };
    // this.timeGate = false;
  }

  componentDidMount() {
    this.searchWords('');
  }

  searchWords = (query) => {
    axios.get('/glossary', {params: {word: query}})
    .then((response) => {
      if (response.data.error) {
        alert('Failed to get words');
      } else {
        this.setState({
          words: response.data,
          currentSearch: query
        })
      }
    })
    .catch((err) => {console.log(err)});
  };

  insertWord = (word, definition) => {
    axios.post('/glossary', {word: word, definition: definition})
    .then((response) => {
      if (response.data === 'error') {
        alert('Failed to insert word.');
      } else if (response.data === 'word already saved') {
        alert('Word already saved. Consider updating the word instead!');
      } else {
        this.searchWords(this.state.currentSearch);
      }
    })
  };

  updateWord = () => {

  };

  deleteWord = () => {

  };


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
          words={this.state.words}
        />
      </div>
    )
  }
};

export default App;