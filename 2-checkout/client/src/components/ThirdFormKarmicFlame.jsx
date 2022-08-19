import React from 'react';

class ThirdFormKarmicFlame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ccNum: 0,
      expDate: 0,
      CVV: 0,
      billZip: 0
    };
  }

  render() {

    return (
      <form>
        <input type='text' placeholder='Credit Card #'></input>
        <input type='text' placeholder='Expiry date'></input>
        <input type='text' placeholder='CVV'></input>
        <input type='text' placeholder='Billing Zip Code'></input>
        <button type='submit' className='formSubmit'>Next</button>
      </form>
    )
  }
};

export default ThirdFormKarmicFlame;

/*
credit card #, expiry date, CVV, and billing zip code
*/