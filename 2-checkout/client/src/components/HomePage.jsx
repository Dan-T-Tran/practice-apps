import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let formReveal = {height: this.props.homePageStatus ? '100%' : '0',
    opacity: this.props.homePageStatus ? '100' : '0'};
    let elementsReveal = {display: this.props.homePageStatus ? 'block' : 'none'};

    return (
      <div style={formReveal} id='homePage'>
        Homepage :D
      </div>
    )
  }
}

export default HomePage;

/*
transform: this.props.homePageStatus ? 'rotate(0)' : 'rotate(360deg)'
*/