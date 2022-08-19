import React from 'react';

class FirstFormHelix extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      email: ''
    };
  }

  render() {
  return (
    <form>
      <input type='text' placeholder='Name'></input>
      <input type='text' placeholder='Password'></input>
      <input type='text' placeholder='Email'></input>
      <button type='submit' className='formSubmit'>Next</button>
    </form>
    )
  }
};

export default FirstFormHelix;

/*
name, email, and password
*/