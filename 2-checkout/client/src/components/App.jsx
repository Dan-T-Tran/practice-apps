import React from 'react';
import TopBar from './TopBar.jsx';
import HomePage from './HomePage.jsx';
import FirstFormHelix from './FirstFormHelix.jsx';
import SecondFormGale from './SecondFormGale.jsx';
import ThirdFormKarmicFlame from './ThirdFormKarmicFlame.jsx';
import Confirmation from './Confirmation.jsx';

const axios = require('axios');

var timer;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      homePage: true,
      firstForm: false,
      secondForm: false,
      thirdForm: false,
      confirmForm: false,
      confirmData: {},
      lastVisitData: {},
      revertForm: '',
      items: []
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
        throw console.log('error in checking session');
      } else if (response.data === 'revisiting session') {
        console.log('revisiting user');
      } else {
        throw console.log('new user');
      }
    })
    .then(() => {
      return axios.get(`/checkout/submit/${JSON.stringify(document.cookie)}`)
    })
    .then((response) => {
      if (response.date === 'error') {
        console.log('error in getting returning values');
      } else {
        this.setState({
          lastVisitData: response.data
        })
      }
    })
    .catch((err) => {console.log(err)});
  }

  formSwitchTimer = (toSwitch, time = 1000) => {
    timer = setTimeout(() => {
      this.setState({
        [toSwitch]: true
      })
    }, time);

  }

  checkoutClick = () => {
    // console.log(this.state.homePage);
    // console.log(this.state.firstForm);
    this.setState({
      homePage: false,
      secondForm: false,
      thirdForm: false,
      confirmForm: false,
      revertForm: 'firstForm'
      // firstForm: true
    }, () => {this.formSwitchTimer('firstForm')});
  };

  checkoutCancelClick = () => {
    if (!this.state.homePage) {
      clearTimeout(timer);
      this.setState({
        // homePage: true,
        firstForm: false,
        secondForm: false,
        thirdForm: false,
        confirmForm: false,
        revertForm: ''
      }, () => {
        setTimeout(() => {
          this.setState({
            homePage: true
          })
        }, 1000)
      });
    }
  };

  firstFormSubmit = (username, password, email) => {
    console.log(username);
    console.log(password);
    console.log(email);
    //just assigning password as some dummy value. Can use a hashing function on it later or something.
    password = 'dummypass';
    let params = {
      session_id: JSON.stringify(document.cookie),
      username: username,
      password: password,
      email: email
    };
    axios.post('/checkout/firstForm', params)
    .then((response) => {
      if (response.data === 'error') {
        return alert('Error in submitting info');
      } else {
        // console.log(response.data);
        this.setState({
          firstForm: false,
          revertForm: this.state.revertForm === 'confirmForm' ? 'confirmForm' : 'secondForm'
        }, () => {this.formSwitchTimer(this.state.revertForm)});
      }
    })
    .catch((err) => {console.error(err)});
  };

  secondFormSubmit = (addressOne, addressTwo, city, state, zip) => {
    let params = {
      session_id: JSON.stringify(document.cookie),
      addressOne: addressOne,
      addressTwo: addressTwo === '' ? null : addressTwo,
      city: city,
      state: state,
      zip: zip
    };
    axios.post('/checkout/secondForm', params)
    .then((response) => {
      if (response.data === 'error') {
        return alert('Error in submitting info');
      } else {
        // console.log(response.data);
        this.setState({
          secondForm: false,
          revertForm: this.state.revertForm === 'confirmForm' ? 'confirmForm' : 'thirdForm'
        }, () => {this.formSwitchTimer(this.state.revertForm)});
      }
    })
    .catch((err) => {console.error(err)});
  };

  thirdFormSubmit = (credit, expiry, cvv, billZip) => {
    let params = {
      session_id: JSON.stringify(document.cookie),
      credit: credit,
      expiry: expiry,
      cvv: cvv,
      billZip: billZip
    };
    axios.post('/checkout/thirdForm', params)
    .then((response) => {
      if (response.data === 'error') {
        return alert('Error in submitting info');
      } else {
        return this.setState({
          thirdForm: false,
          revertForm: 'confirmForm'
        });
      }
    })
    .then(() => {
      return this.formSwitchTimer('confirmForm');
    })
    .then(() => {
      return axios.get(`/checkout/submit/${JSON.stringify(document.cookie)}`)
    })
    .then((response) => {
      let data = response.data;
      console.log(data);
      return this.setState({
        confirmData: data
      })
      // console.log(data);
    })
    .catch((err) => {console.error(err)});
  };

  confirmSubmit = () => {
    let finalParams = {};
    let date = new Date().toLocaleString();
    finalParams.date = date;
    for (let param in this.state.confirmData) {
      finalParams[param] = this.state.confirmData[param];
    }
    console.log(finalParams);
    axios.post('/checkout/submit', finalParams)
    .then((response) => {
      if (response.data === 'error') {
        return alert('Error in submission');
      } else {
        return this.setState({
          confirmForm: false,
          lastVisitData: {},
          revertForm: ''
        });
      }
    })
    .then(() => {
      this.formSwitchTimer('homePage');
    })
    .catch((err) => {console.error(err)});
  };

  revertStep = (previousStage, currentStage) => {
    this.setState({
      // [previousStage]: true,
      [currentStage]: false,
      revertForm: previousStage
    }, ()=>{this.formSwitchTimer(previousStage)});
  };

  changeSpecificForm = (stage) => {
    this.setState({
      confirmForm: false
    }, ()=>{this.formSwitchTimer(stage)});
  };

  confirmEdit = (stage, params) => {
    let editParams = {};
    for (let param in params) {
      editParams[param] = params[param];
    }
    let session_id = JSON.stringify(document.cookie);
    editParams.session_id = session_id;
    axios.post(`/checkout/${stage}`, editParams)
    .then(() => axios.get(`/checkout/submit/${session_id}`))
    .then((response) => {
      this.setState({
        [stage]: false,
        confirmData: response.data
      }, () => {this.formSwitchTimer('confirmForm')})
    })
    .catch((err) => {console.error(err)});
  }

  render() {
    return (
      <div id='app'>
        <TopBar
          checkoutClick = {this.checkoutClick.bind(this)}
          checkoutCancel = {this.checkoutCancelClick.bind(this)}
        />

        <HomePage
          homePageStatus = {this.state.homePage}
        />

        <FirstFormHelix
          firstFormStatus = {this.state.firstForm}
          submit = {this.firstFormSubmit.bind(this)}
          checkoutCancel = {this.checkoutCancelClick.bind(this)}
          lastVisitData = {this.state.lastVisitData}
          revertStatus = {this.state.revertForm}
          confirmEdit = {this.confirmEdit.bind(this)}
        />

        <SecondFormGale
          secondFormStatus = {this.state.secondForm}
          submit = {this.secondFormSubmit.bind(this)}
          revert = {this.revertStep.bind(this)}
          lastVisitData = {this.state.lastVisitData}
          revertStatus = {this.state.revertForm}
          confirmEdit = {this.confirmEdit.bind(this)}
        />

        <ThirdFormKarmicFlame
          thirdFormStatus = {this.state.thirdForm}
          submit = {this.thirdFormSubmit.bind(this)}
          revert = {this.revertStep.bind(this)}
          lastVisitData = {this.state.lastVisitData}
          revertStatus = {this.state.revertForm}
          confirmEdit = {this.confirmEdit.bind(this)}
        />

        <Confirmation
          confirmStatus = {this.state.confirmForm}
          submit = {this.confirmSubmit.bind(this)}
          revert = {this.revertStep.bind(this)}
          checkoutCancel = {this.checkoutCancelClick.bind(this)}
          revertSpecific = {this.changeSpecificForm.bind(this)}
          data = {this.state.confirmData}
        />
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