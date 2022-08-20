import React from 'react'

const Confirmation = (props) => {
  let formReveal = {height: props.confirmStatus ? '100%' : '0',
                   opacity: props.confirmStatus ? '100' : '0'};
  let elementsReveal = {visibility: props.confirmStatus ? 'visible' : 'hidden',
                        opacity: props.confirmStatus ? '100' : '0'};
  // let obfuscation = props.data.password.replace(/^*$/, '*');
  //double check obfuscation regex later;
  return(
    <div style={formReveal} className='form confirmPage'>
      <h5 style={elementsReveal} className='confirmUsernameLabel confirmLabel'>Username</h5>
      <h4 className='confirmUsername'>{props.data.username}</h4>
      <h5 style={elementsReveal} className='confirmEmailLabel confirmLabel'>Email</h5>
      <h4 className='confirmEmail'>{props.data.email}</h4>
      <h5 style={elementsReveal} className='confirmAddressOneLabel confirmLabel'>Shipping Address 1</h5>
      <h4 className='confirmAddressOne'>{props.data.addressOne}</h4>
      <h5 style={elementsReveal} className='confirmAddressTwoLabel confirmLabel'>Shipping Address 2</h5>
      <h4 className='confirmAddressTwo'>{props.data.addressTwo}</h4>
      <h5 style={elementsReveal} className='confirmCityLabel confirmLabel'>City</h5>
      <h4 className='confirmCity'>{props.data.city}</h4>
      <h5 style={elementsReveal} className='confirmStateLabel confirmLabel'>State</h5>
      <h4 className='confirmState'>{props.data.state}</h4>
      <h5 style={elementsReveal} className='confirmZipLabel confirmLabel'>Zip</h5>
      <h4 className='confirmZip'>{props.data.zip}</h4>
      <h5 style={elementsReveal} className='confirmCreditLabel confirmLabel'>Credit Card #</h5>
      <h4 className='confirmCredit'>{props.data.credit}</h4>
      <h5 style={elementsReveal} className='confirmExpiryLabel confirmLabel'>Expiry</h5>
      <h4 className='confirmExpiry'>{props.data.expiry}</h4>
      <h5 style={elementsReveal} className='confirmCvvLabel confirmLabel'>CVV</h5>
      <h4 className='confirmCvv'>{props.data.cvv}</h4>
      <h5 style={elementsReveal} className='confirmBillZipLabel confirmLabel'>Billing Zip Code</h5>
      <h4 className='confirmBillZip'>{props.data.billZip}</h4>
      <button style={elementsReveal} className='firstFormRevert' onClick={()=>{props.revertSpecific('firstForm')}}>Change First Form</button>
      <button style={elementsReveal} className='secondFormRevert' onClick={()=>{props.revertSpecific('secondForm')}}>Change Second Form</button>
      <button style={elementsReveal} className='thirdFormRevert' onClick={()=>{props.revertSpecific('thirdForm')}}>Change Third Form</button>
      <button style={elementsReveal} className='forwardSubmit' onClick={props.submit}>Purchase</button>
      <button style={elementsReveal} className='backSubmit' onClick={props.checkoutCancel}>Cancel</button>
    </div>
  )
};

//Oh boy, styling this page will be a doozy

// class Confirmation extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     let formReveal = {height: this.props.confirmForm ? '600px' : '0',
//     opacity: this.props.confirmForm ? '100' : '0'};
//     let elementsReveal = {display: this.props.confirmForm ? 'block' : 'none'};

//     return (
//       <div style={formReveal} className='form confirmPage'>
//       <h3>{this.props.data.username}</h3>
//       <h3>{this.props.data.password}</h3>
//       <h3>{this.props.data.email}</h3>
//       <h3>{this.props.data.addressOne}</h3>
//       <h3>{this.props.data.addressTwo}</h3>
//       <h3>{this.props.data.city}</h3>
//       <h3>{this.props.data.state}</h3>
//       <h3>{this.props.data.zip}</h3>
//       <h3>{this.props.data.credit}</h3>
//       <h3>{this.props.data.expiry}</h3>
//       <h3>{this.props.data.cvv}</h3>
//       <h3>{this.props.data.billZip}</h3>
//       <button className='confirmButton' onClick={this.props.submit}>Purchase</button>
//       <button className='confirmButton'>Go Back</button>
//     </div>
//     )
//   }
// };

export default Confirmation;