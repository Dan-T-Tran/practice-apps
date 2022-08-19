import React from 'react';

class SecondFormGale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addressOne: '',
      addressTwo: '',
      city: '',
      state: '',
      zipCode: 0
    };
  }

  render() {
    return(
      <form>
        <input type='text' placeholder='Address 1'></input>
        <input type='text' placeholder='Address 2 (optional)'></input>
        <input type='text' placeholder='City'></input>
        <input type='text' placeholder='State'></input>
        <input type='text' placeholder='Zip Code'></input>
        <button type='submit' className='formSubmit'>Next</button>
      </form>
    )
  }
};

export default SecondFormGale;

/*
ship to address (line 1, line 2, city, state, zip code) and phone number
*/