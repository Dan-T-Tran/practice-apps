import React from 'react';
import WordEntry from './WordEntry.jsx';

const RightBar = (props) => (
  <div id='rightBar'>
    {props.words.map((word, index) => (
      <WordEntry
        word={word}
        key={index}
      />
    ))}
  </div>
)

export default RightBar;