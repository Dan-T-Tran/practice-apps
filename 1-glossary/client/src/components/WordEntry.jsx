import React from 'react';

class WordEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {this.props.word.word}
        {this.props.word.definition}
      </div>
    )
  }
}

export default WordEntry;