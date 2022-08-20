import React from 'react';

class FirstFormHelix extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordRepeat: '',
      email: '',
      usernameFail: false,
      passwordFail: false,
      passwordRepeatFail: false,
      emailFail: false,
      failTimer: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this.props.lastVisitData);
      this.setState({
        username: this.props.lastVisitData.username,
        password: '',
        email: this.props.lastVisitData.email
      });
    }, 200);
  }

  handleChange = (query) => {
    // console.log(this.props.lastVisitData);
    this.setState({
      [query.target.name]: query.target.value
    });
    // console.log(this.state);
  };

  handleSubmit = () => {
    console.log(this.state);
    event.preventDefault();

    let didAnyFail = false;
    let failCheck = [false, false, false, false];
    if (this.state.username.length <= 0) {
      failCheck[0] = true;
      didAnyFail = true;
    }
    if (this.state.password.length <= 0) {
      failCheck[1] = true;
      didAnyFail = true;
    }
    if (this.state.password !== this.state.passwordRepeat) {
      failCheck[2] = true;
      didAnyFail = true;
    }
    if (this.state.email.length <= 0 || this.state.email.indexOf('@') === -1) {
      failCheck[3] = true;
      didAnyFail = true;
    }

    this.setState({
      usernameFail: failCheck[0],
      passwordFail: failCheck[1],
      passwordRepeatFail: failCheck[2],
      emailFail: failCheck[3]
    });

    if (!didAnyFail) {
      if (this.props.revertStatus === 'firstForm') {
        let data = [this.state.username, this.state.password, this.state.email];
        this.props.submit(...data);
      }
      else {
        this.props.confirmEdit('firstForm', this.state);
      }
    }
  };

  render() {
  let formReveal = {height: this.props.firstFormStatus ? '100%' : '0',
                    opacity: this.props.firstFormStatus ? '100' : '0'};
  let elementsReveal = {visibility: this.props.firstFormStatus ? 'visible' : 'hidden',
                       opacity: this.props.firstFormStatus ? '100' : '0'};
  let inputErrorReveal = {opacity: '100'};
  let inputErrorHide = {opacity: '0'};

  return (
    <form style={formReveal} className='form firstForm' onSubmit={this.handleSubmit}>
      <h5 style={elementsReveal} className='usernameLabel'>Username</h5>
      <input style={elementsReveal} className='username' type='text' name='username' defaultValue={this.props.lastVisitData.username} placeholder='Username' onChange={this.handleChange}></input>
      <h5 style={this.state.usernameFail ? inputErrorReveal : inputErrorHide} className='usernameFail error'>Please input a valid username.</h5>
      <h5 style={elementsReveal} className='passwordLabel'>Password</h5>
      <input style={elementsReveal} className='password' type='password' name='password' placeholder='Password' onChange={this.handleChange}></input>
      <h5 style={this.state.passwordFail ? inputErrorReveal : inputErrorHide} className='passwordFail error'>Please input a valid password.</h5>
      <h5 style={elementsReveal} className='passwordConfirmLabel'>Confirm Password</h5>
      <input style={elementsReveal} className='passwordConfirm' type='password' name='passwordRepeat' placeholder='Retype Password' onChange={this.handleChange}></input>
      <h5 style={this.state.passwordRepeatFail ? inputErrorReveal : inputErrorHide} className='passwordConfirmFail error'>Please confirm the passwords are the same.</h5>
      <h5 style={elementsReveal} className='emailLabel'>Email</h5>
      <input style={elementsReveal} className='email' type='email' name='email' defaultValue={this.props.lastVisitData.email} placeholder='Email' onChange={this.handleChange}></input>
      <h5 style={this.state.emailFail ? inputErrorReveal : inputErrorHide} className='emailFail error'>Please input a valid email.</h5>
      {this.props.revertStatus === 'firstForm' && <button style={elementsReveal} type='button' className='backSubmit' onClick={this.props.checkoutCancel}>Cancel</button>}
      {this.props.revertStatus === 'firstForm' && <button style={elementsReveal} type='submit' className='forwardSubmit'>Next</button>}
      {this.props.revertStatus === 'confirmForm' && <button style={elementsReveal} type='submit' className='confirmChangeSubmit'>Confirm Edit</button>}
    </form>
    )
  }
};

export default FirstFormHelix;

/*
name, email, and password
*/