import React from 'react';
// import test from './test.png';
// import test from '../assets/images/test.png'

const TopBar = (props) => {
  let start = props.clickedPage * 10 + 1;
  let end = start + 9 - props.remainder;

  let flashCardStyle = {backgroundColor: props.flashCardStatus ? 'green' : 'red'};
  let favoriteStyle = {backgroundColor : props.favoriteStatus ? 'green' : 'red'};
  let ascendSortStyle = {backgroundColor: props.sortStatus === 'ascending' ? 'green' : 'red'};
  let descendSortStyle = {backgroundColor: props.sortStatus === 'descending' ? 'green' : 'red'};


  return (
  <div id='topBar'>
    <h1 className='logo'>Glossing Over Concepts</h1>
    <h3 className='wordAmountIndicator'>There are {props.amount} words so far!</h3>
    <h3 className='wordRangeIndicator'>Currently showing words #{start}-{end}</h3>
    <button style={flashCardStyle} className='flashCardButton' onClick={props.flashCardMode}>Flash Card Mode</button>
    <button style={ascendSortStyle} className='alphabetSortButton' onClick={()=>{props.sortWords('ascending')}}>Sort Alphabetically</button>
    <button style={descendSortStyle} className='alphabetSortButton' onClick={()=>{props.sortWords('descending')}}>Sort Alphabetically Backwards</button>
    <button style={favoriteStyle} className='favoriteButton' onClick={props.showFavorites}>Show Favorites</button>
    <button className='deleteAllButton' onClick={props.deleteAll}>Delete All Entries</button>
  </div>
  );
}

export default TopBar;