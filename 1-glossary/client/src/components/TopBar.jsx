import React from 'react';

const TopBar = (props) => {
  let start = props.clickedPage * 10 + 1;
  let end = start + 9 - props.remainder;

  return (
  <div id='topBar'>
    <h1 className='logo'>Glossing Over Concepts</h1>
    <h3 className='wordAmountIndicator'>There are {props.amount} words so far!</h3>
    <h3 className='wordRangeIndicator'>Currently showing words #{start}-{end}</h3>
    <button className='flashCardButton'>Flash Card Mode</button>
    <button className='alphabetSortButton' onClick={()=>{props.sortWords('ascending')}}>Sort Alphabetically</button>
    <button className='alphabetSortButton' onClick={()=>{props.sortWords('descending')}}>Sort Alphabetically Backwards</button>
    <button className='deleteAllButton' onClick={props.deleteAll}>Delete All Entries</button>
  </div>
  );
}

export default TopBar;