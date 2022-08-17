import React from 'react';

class WordEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='wordEntry'>
        <h3>{this.props.word.word}</h3>
        <h3>{this.props.word.definition}</h3>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    )
  }
}

export default WordEntry;