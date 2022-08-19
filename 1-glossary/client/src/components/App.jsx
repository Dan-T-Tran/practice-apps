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
      remainder: 0,
      sort: undefined,
      showFavorites: false,
      flashCardMode: false,
      flashCardIndex: 0,
      flashCard: {}
    };
  }

  componentDidMount() {
    this.searchWords('');
  }

  searchWords = (query, page = 0, favorite = this.state.showFavorites) => {
    axios.get('/glossary', {params: {
      word: query,
      index: page,
      sort: this.state.sort,
      showFavorites: favorite,
    }}
    )
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
          remainder: 10 - response.data.remainder,
          showFavorites: favorite,
          flashCardMode: false
        })
      }
    })
    .catch((err) => {console.log(err)});
  };

  shuffleWords = (words) => {
    let randomSwitch = Math.floor(Math.random() * words.length);

    for (let i = 0; i < words.length; i++) {
      let oldOrigin = words[i];
      let oldSwitch = words[randomSwitch];
      words[i] = oldSwitch;
      words[randomSwitch] = oldOrigin;
    }

    return words;
  };

  flashCardMode = () => {
    if (this.state.flashCardMode) {
      this.searchWords('');
    } else {
      axios.get('/glossary', {params: {
        word: '',
        flashCardMode: true
      }})
      .then((response) => {
        if (response.data ==='error') {
          alert('Error in starting Flash Card Mode');
        } else {
          let shuffledWords = this.shuffleWords(response.data.documents.slice());
          this.setState({
            words: shuffledWords,
            wordAmount: response.data.amount,
            currentSearch: '',
            clickedIndex: undefined,
            pages: [],
            clickedPage: 0,
            remainder: 0,
            sort: undefined,
            showFavorites: false,
            flashCardMode: true,
            flashCardIndex: 0,
            flashCard: shuffledWords[0]
          })
        }
      })
    }
  };

  flashCardChange = (direction) => {
    let newIndex = this.state.flashCardIndex;
    if (direction === 'next') {
      console.log('next')
      newIndex++;
    } else {
      console.log('back')
      newIndex--;
    }
    let newFlashCard = this.state.words[newIndex];
    this.setState({
      flashCardIndex: newIndex,
      flashCard: newFlashCard
    })
  };

  pageClick = (page) => {
    this.searchWords(this.state.currentSearch, page);
  };

  sortWords = (condition) => {
    if (this.state.sort === condition) {
      this.setState({
        sort: undefined
      }, () => {this.searchWords(this.state.currentSearch, this.state.clickedPage)});
    } else {
      this.setState({
        sort: condition
      }, () => {this.searchWords(this.state.currentSearch, this.state.clickedPage)});
    }
  };

  showFavorites = () => {
    this.searchWords(this.state.currentSearch, 0, !this.state.showFavorites)
  }

  updateFavorite = (word, definition, favorite) => {
    console.log(favorite);
    if (favorite) {
      this.updateWord(word, word, definition, false);
    } else {
      this.updateWord(word, word, definition, true);
    }
  }

  insertWord = (word, definition) => {
    axios.post('/glossary', {word: word, definition: definition, favorite: false})
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

  updateWord = (originalWord, editWord, definition, favorite) => {
    axios.put('/glossary', {originalWord: originalWord, editWord: editWord, definition: definition, favorite: favorite})
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
  };


  render() {
    return (
      <div id='app'>
        <TopBar
          amount={this.state.wordAmount}
          remainder={this.state.remainder}
          clickedPage={this.state.clickedPage}
          sortStatus={this.state.sort}
          sortWords={this.sortWords.bind(this)}
          showFavorites={this.showFavorites.bind(this)}
          flashCardMode={this.flashCardMode.bind(this)}
          favoriteStatus={this.state.showFavorites}
          flashCardStatus={this.state.flashCardMode}
          deleteAll={this.deleteAllWords.bind(this)}
        />

        <SideBar
          search={this.searchWords.bind(this)}
          input={this.insertWord.bind(this)}
          pages={this.state.pages}
          pageClick={this.pageClick.bind(this)}
          clickedPage={this.state.clickedPage}
          flashCardStatus={this.state.flashCardMode}
        />

        <RightBar
          words={this.state.words}
          clickedIndex={this.state.clickedIndex}
          setIndex={this.editClick.bind(this)}
          update={this.updateWord.bind(this)}
          delete={this.deleteWord.bind(this)}
          updateFavorite={this.updateFavorite.bind(this)}
          flashCardChange={this.flashCardChange.bind(this)}
          flashCardMode={this.state.flashCardMode}
          flashCard={this.state.flashCard}
          flashCardIndex={this.state.flashCardIndex}
          amount={this.state.wordAmount}
        />
      </div>
    )
  }
};

export default App;

/*
HYPER CHALLENGE

Do flash card mode, but animate it...
  On initialization of Flash Card Mode:
    Show a random word
      Probably disable the search feature for this
    On click, reveal definition
      Fade in?
      Expand card?
      Somehow do a flipping to backside animation?
    Have two buttons for going back to previous card or getting another random card
      Make sure the starting card can't go backwards
      Perhaps on initialization, search for all cards without slicing, stuff into array, shuffle, then just iterate as you click?

*/