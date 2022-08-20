import React from 'react';

class ThirdFormKarmicFlame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credit: 0,
      expiry: 0,
      cvv: 0,
      billZip: 0,
      creditFail: false,
      expiryFail: false,
      cvvFail: false,
      billZipFail: false,
      failTimer: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this.props.lastVisitData);
      this.setState({
        credit: this.props.lastVisitData.credit,
        expiry: this.props.lastVisitData.expiry,
        cvv: this.props.lastVisitData.cvv,
        billZip: this.props.lastVisitData.billZip
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
    if (this.state.credit.toString().length <= 0) {
      failCheck[0] = true;
      didAnyFail = true;
    }
    if (this.state.expiry.toString().length <= 0) {
      failCheck[1] = true;
      didAnyFail = true;
    }
    if (this.state.cvv.toString().length <= 0) {
      failCheck[2] = true;
      didAnyFail = true;
    }
    if (this.state.billZip.toString().length <= 0) {
      failCheck[3] = true;
      didAnyFail = true;
    }

    this.setState({
      creditFail: failCheck[0],
      expiryFail: failCheck[1],
      cvvFail: failCheck[2],
      billZipFail: failCheck[3]
    });

    if(!didAnyFail) {
      if (this.props.revertStatus === 'thirdForm') {
        let data = [this.state.credit, this.state.expiry, this.state.cvv, this.state.billZip];
        this.props.submit(...data);
      } else {
        this.props.confirmEdit('thirdForm', this.state);
      }
    }
  };

  render() {
    let formReveal = {height: this.props.thirdFormStatus ? '100%' : '0',
                     opacity: this.props.thirdFormStatus ? '100' : '0'};
    let elementsReveal = {visibility: this.props.thirdFormStatus ? 'visible' : 'hidden',
                         opacity: this.props.thirdFormStatus ? '100' : '0'};
    let inputErrorReveal = {opacity: '100'};
    let inputErrorHide = {opacity: '0'};

    return (
      <form style={formReveal} className='form thirdForm' onSubmit={this.handleSubmit}>
        <h5 style={elementsReveal} className='creditLabel'>Credit Card Number</h5>
        <input style={elementsReveal} className='credit' type='text' name='credit' defaultValue={this.props.lastVisitData.credit} placeholder='Credit Card #' onChange={this.handleChange}></input>
        <h5 style={this.state.creditFail ? inputErrorReveal : inputErrorHide} className='creditFail error'>Please input a valid credit card number.</h5>
        <h5 style={elementsReveal} className='expiryLabel'>Expiration Date</h5>
        <input style={elementsReveal} className='expiry' type='text' name='expiry' defaultValue={this.props.lastVisitData.expiry} placeholder='Expiry' onChange={this.handleChange}></input>
        <h5 style={this.state.expiryFail ? inputErrorReveal : inputErrorHide} className='expiryFail error'>Please input a valid expiration date.</h5>
        <h5 style={elementsReveal} className='cvvLabel'>CVV</h5>
        <input style={elementsReveal} className='cvv' type='text' name='cvv' defaultValue={this.props.lastVisitData.cvv} placeholder='CVV' onChange={this.handleChange}></input>
        <h5 style={this.state.cvvFail ? inputErrorReveal : inputErrorHide} className='cvvFail error'>Please input a valid cvv.</h5>
        <h5 style={elementsReveal} className='billZipLabel'>Zip Code</h5>
        <input style={elementsReveal} className='billZip' type='text' name='billZip' defaultValue={this.props.lastVisitData.billZip} placeholder='Zip Code' onChange={this.handleChange}></input>
        <h5 style={this.state.billZipFail ? inputErrorReveal : inputErrorHide} className='billZipFail error'>Please input a valid billing zip code.</h5>
        {this.props.revertStatus === 'thirdForm' && <button style={elementsReveal} type='button' className='backSubmit' onClick={()=>{this.props.revert('secondForm', 'thirdForm')}}>Back</button>}
        {this.props.revertStatus === 'thirdForm' && <button style={elementsReveal} type='submit' className='forwardSubmit'>Next</button>}
        {this.props.revertStatus === 'confirmForm' && <button style={elementsReveal} type='submit' className='confirmChangeSubmit'>Confirm Edit</button>}
      </form>
    )
  }
};

export default ThirdFormKarmicFlame;

/*
credit card #, expiry date, CVV, and billing zip code
*/