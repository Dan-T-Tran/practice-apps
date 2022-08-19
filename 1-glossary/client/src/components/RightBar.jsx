import React from 'react';
import WordEntry from './WordEntry.jsx';
import FlashCard from './FlashCard.jsx';

const RightBar = (props) => (
  <div id='rightBar'>
    {props.flashCardMode
    ?
    <div id='flashGrid'>
       {props.words.map((word, index) => (
        <FlashCard
          word={word}
          index={index}
          flashIndex={props.flashCardIndex}
          amount={props.amount}
          flashCardChange={props.flashCardChange}
          key={index}
        />
       ))}
    </div>
    :
    <div>
      {props.words.map((word, index) => (
        <WordEntry
          word={word}
          index={index}
          clickedIndex={props.clickedIndex}
          setIndex={props.setIndex}
          update={props.update}
          updateFavorite={props.updateFavorite}
          delete={props.delete}
          key={index}
        />
      ))}
    </div>
    }
  </div>
)

export default RightBar;

/*
<FlashCard
        word={props.flashCard}
        index={props.flashCardIndex}
      />
*/