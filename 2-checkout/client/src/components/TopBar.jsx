import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const TopBar = (props) => (
  <div id='topBar'>
    <h1 className='logo' onClick={props.checkoutCancel}>Scamazon</h1>
    <button className='checkout' onClick = {props.checkoutClick}>Checkout</button>
  </div>
);

export default TopBar;


//Scamazon