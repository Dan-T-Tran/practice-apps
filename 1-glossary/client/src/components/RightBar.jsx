import React from 'react';
import WordEntry from './WordEntry.jsx';

const RightBar = (props) => (
  <div id='rightBar'>
    {props.words.map((word, index) => (
      <WordEntry
        word={word}
        index={index}
        clickedIndex={props.clickedIndex}
        setIndex={props.setIndex}
        update={props.update}
        delete={props.delete}
        key={index}
      />
    ))}
  </div>
)

export default RightBar;