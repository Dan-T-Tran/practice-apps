import React from 'react';

class SecondFormGale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addressOne: '',
      addressTwo: '',
      city: '',
      state: '',
      zip: 0,
      addressFail: false,
      cityFail: false,
      stateFail: false,
      zipFail: false,
      failTimer: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this.props.lastVisitData);
      this.setState({
        addressOne: this.props.lastVisitData.addressOne,
        addressTwo: this.props.lastVisitData.addressTwo,
        city: this.props.lastVisitData.city,
        state: this.props.lastVisitData.state,
        zip: this.props.lastVisitData.zip
      });
    }, 200);
  }

  handleChange = (query) => {
    this.setState({
      [query.target.name]: query.target.value
    });
    // console.log(this.state);
  };

  handleSubmit = () => {
    event.preventDefault();

    let didAnyFail = false;
    let failCheck = [false, false, false, false];
    if (this.state.addressOne.length <= 0) {
      failCheck[0] = true;
      didAnyFail = true;
    }
    if (this.state.city.length <= 0) {
      failCheck[1] = true;
      didAnyFail = true;
    }
    if (this.state.state.length <= 0) {
      failCheck[2] = true;
      didAnyFail = true;
    }
    if (this.state.zip.toString().length <= 0) {
      failCheck[3] = true;
      didAnyFail = true;
    }

    this.setState({
      addressFail: failCheck[0],
      cityFail: failCheck[1],
      stateFail: failCheck[2],
      zipFail: failCheck[3]
    });

    if(!didAnyFail) {
      if (this.props.revertStatus === 'secondForm') {
        let data = [this.state.addressOne, this.state.addressTwo, this.state.city, this.state.state, this.state.zip];
        this.props.submit(...data);
      } else {
        this.props.confirmEdit('secondForm', this.state);
      }
    }
  };

  render() {
    let formReveal = {height: this.props.secondFormStatus ? '100%' : '0',
    opacity: this.props.secondFormStatus ? '100' : '0'};
    let elementsReveal = {visibility: this.props.secondFormStatus ? 'visible' : 'hidden',
                         opacity: this.props.secondFormStatus ? '100' : '0'};
    let inputErrorReveal = {opacity: '100'};
    let inputErrorHide = {opacity: '0'};

    return(
      <form style={formReveal} className='form secondForm' onSubmit={this.handleSubmit}>
        <h5 style={elementsReveal} className='addressOneLabel'>Shipping Address 1</h5>
        <input style={elementsReveal} className='addressOne' type='text' name='addressOne' defaultValue={this.props.lastVisitData.addressOne} placeholder='Address 1' onChange={this.handleChange}></input>
        <h5 style={this.state.addressFail ? inputErrorReveal : inputErrorHide} className='addressFail error'>Please input a valid address.</h5>
        <h5 style={elementsReveal} className='addressTwoLabel'>Shipping Address 2 (optional)</h5>
        <input style={elementsReveal} className='addressTwo' type='text' name='addressTwo' defaultValue={this.props.lastVisitData.addressTwo} placeholder='Address 2 (optional)' onChange={this.handleChange}></input>
        <h5 style={elementsReveal} className='cityLabel'>City</h5>
        <input style={elementsReveal} className='city' type='text' name='city' defaultValue={this.props.lastVisitData.city} placeholder='City' onChange={this.handleChange}></input>
        <h5 style={this.state.cityFail ? inputErrorReveal : inputErrorHide} className='cityFail error'>Please input a valid city.</h5>
        <h5 style={elementsReveal} className='stateLabel'>State</h5>
        <input style={elementsReveal} className='state' type='text' name='state' defaultValue={this.props.lastVisitData.state} placeholder='State' onChange={this.handleChange}></input>
        <h5 style={this.state.stateFail ? inputErrorReveal : inputErrorHide} className='stateFail error'>Please input a valid state.</h5>
        <h5 style={elementsReveal} className='zipLabel'>Zip Code</h5>
        <input style={elementsReveal} className='zip' type='text' name='zip' defaultValue={this.props.lastVisitData.zip} placeholder='Zip Code' onChange={this.handleChange}></input>
        <h5 style={this.state.zipFail ? inputErrorReveal : inputErrorHide} className='zipFail error'>Please input a valid zip code.</h5>
        {this.props.revertStatus === 'secondForm' &&<button style={elementsReveal} type='button' className='backSubmit' onClick={()=>{this.props.revert('firstForm', 'secondForm')}}>Back</button>}
        {this.props.revertStatus === 'secondForm' &&<button style={elementsReveal} type='submit' className='forwardSubmit'>Next</button>}
        {this.props.revertStatus === 'confirmForm' && <button style={elementsReveal} type='submit' className='confirmChangeSubmit'>Confirm Edit</button>}
      </form>
    )
  }
};

export default SecondFormGale;

/*
ship to address (line 1, line 2, city, state, zip code) and phone number
*/