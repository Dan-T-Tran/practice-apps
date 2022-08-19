import React from 'react';
import TopBar from './TopBar.jsx';
import HomePage from './HomePage.jsx';
import FirstFormHelix from './FirstFormHelix.jsx';
import SecondFormGale from './SecondFormGale.jsx';
import ThirdFormKarmicFlame from './ThirdFormKarmicFlame.jsx';
import Confirmation from './Confirmation.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homePage: true,
      firstForm: false,
      secondForm: false,
      thirdForm: false
    };
  }

  componentDidMount() {
    // console.log(document.cookie);
    // console.log(typeof document.cookie);
    // console.log(JSON.stringify(document.cookie));
    // console.log(typeof JSON.stringify(document.cookie));
    axios.get(`/checkout/${JSON.stringify(document.cookie)}`)
    .then((response) => {
      if (response.data === 'error') {
        console.log('error in checking session');
      } else if (response.data === 'revisiting session') {
        console.log('revisiting user');
      } else {
        console.log('new user');
      }
    })
    .catch((err) => {console.log(err)});
  }

  checkoutClick = () => {
    this.setState({
      homePage: false
    });
  };

  checkoutCancelClick = () => {
    this.setState({
      homePage: true
    });
  };

  firstFormSubmit = (name, password, email) => {

  };

  secondFormSubmit = (addressOne, addressTwo, city, state, zip) => {

  };

  thirdFormSubmit = (credit, expiry, cvv, billZip) => {

  };

  confirmSubmit = () => {

  };

  revertStep = () => {

  };

  render() {
    return (
      <div>
        Page cookie: {JSON.stringify(document.cookie, undefined, "\t")}
        <TopBar />
        <HomePage />
        <FirstFormHelix />
        <SecondFormGale />
        <ThirdFormKarmicFlame />
        <Confirmation />
      </div>
    )
  }
};

export default App;

/*
F1 collects name, email, and password for account creation.
F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number.
F3 collects credit card #, expiry date, CVV, and billing zip code.
*/

/*
On clicking checkout button in TopBar...
  Trigger state change to open first form
  On first form submission...
    Pass data into a function that triggers a state change to open second form
    On second form submission...
      Pass data from first and second form into function that triggers a state change to open third form
      On third form submission...
        Send to server somehow (Post?)
*/

//       <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>