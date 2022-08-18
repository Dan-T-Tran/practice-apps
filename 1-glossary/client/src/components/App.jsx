import React from 'react';
import TopBar from './TopBar.jsx';
import SideBar from './SideBar.jsx';
import RightBar from './RightBar.jsx';

const axios = require('axios');
const _ = require('underscore');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      wordAmount: 0,
      currentSearch: '',
      clickedIndex: undefined,
      pages: [],
      clickedPage: 0,
      remainder: 0
    };
    // this.timeGate = false;
  }

  componentDidMount() {
    this.searchWords('');
  }

  searchWords = (query, page = 0) => {
    axios.get('/glossary', {params: {word: query, index: page}})
    .then((response) => {
      if (response.data === 'error') {
        alert('Failed to get words');
      } else {
        let tempPages = [1];
        let tempPageIndex = 2;
        let amount = response.data.amount;
        while (amount >= 11) {
          tempPages.push(tempPageIndex);
          tempPageIndex++;
          amount -= 10;
        }
        console.log(response.data);

        this.setState({
          words: response.data.documents,
          wordAmount: response.data.amount,
          currentSearch: query,
          clickedIndex: undefined,
          pages: tempPages,
          clickedPage: page,
          remainder: 10 - response.data.remainder
        })
      }
    })
    .catch((err) => {console.log(err)});
  };

  pageClick = (page) => {
    this.searchWords(this.state.currentSearch, page);
  }

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

  editClick = (index) => {
    if (index !== this.state.clickedIndex) {
      this.setState({
        clickedIndex: index
      });
    } else {
      this.setState({
        clickedIndex: undefined
      });
    }
  };

  updateWord = (originalWord, editWord, definition) => {
    axios.put('/glossary', {originalWord: originalWord, editWord: editWord, definition: definition})
    .then((response) => {
      if (response.data === 'error') {
        alert('Failed to update word');
      } else if (response.data === 'success') {
        this.searchWords(this.state.currentSearch);
      } else {
        alert(`Tried to update word that isn't saved somehow.`);
      }
    })
  };

  deleteWord = (word) => {
    axios.delete('/glossary', {params: {word: word}})
    .then((response) => {
      if(response.data === 'error') {
        alert('Failed to delete word');
      } else if (response.data === 'success') {
        this.searchWords(this.state.currentSearch);
      } else {
        alert(`Tried to delete word that isn't saved somehow.`);
      }
    })
    .catch((err) => {console.log(err)});
  };

  deleteAllWords = () => {
    if (window.confirm('Do you reaaaally wanna delete all words?')) {
      axios.delete('/glossary', {params: {deleteAll: true}})
      .then((response) => {
        if (response.data === 'error') {
          alert('Failed to delete words');
        } else {
          this.searchWords('');
        }
      })
    }
  }


  render() {
    return (
      <div id='app'>
        <TopBar
          amount={this.state.wordAmount}
          remainder={this.state.remainder}
          clickedPage={this.state.clickedPage}
          deleteAll={this.deleteAllWords.bind(this)}
        />

        <SideBar
          search={this.searchWords.bind(this)}
          input={this.insertWord.bind(this)}
          pages={this.state.pages}
          pageClick={this.pageClick.bind(this)}
          clickedPage={this.state.clickedPage}
        />

        <RightBar
          words={this.state.words}
          clickedIndex={this.state.clickedIndex}
          setIndex={this.editClick.bind(this)}
          update={this.updateWord.bind(this)}
          delete={this.deleteWord.bind(this)}
        />
      </div>
    )
  }
};

export default App;