import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWord: '',
      currentDefinition: ''
    };
  }

  handleSubmit = (e) => {
    event.preventDefault();
    event.target.reset();
    this.props.input(this.state.currentWord, this.state.currentDefinition)
    this.setState({
      currentWord: '',
      currentDefinition: ''
    });
  };

  handleChange = (query) => {
    if (query.target.name === 'wordInput') {
      this.setState({
        currentWord: query.target.value
      });
    } else {
      this.setState({
        currentDefinition: query.target.value
      });
    }
  }


  render() {
    return(
      <div id='input'>
        <form className='wordSearch'>
           <input type='text' className='wordSearchInput' name='wordSearch' placeholder='Search Word' onChange={(e)=>this.props.search(e.target.value)}/>
        </form>

        <form className='wordInput' onSubmit={this.handleSubmit}>
          <input type='text' className='wordNameInput' name='wordInput' placeholder='Insert Word' onChange={this.handleChange} required/>
          <button type='submit' className='submitButton'>Submit</button>
          <input type='text' className='wordDefinitionInput' name='definitionInput' placeholder='Insert Definition' onChange={this.handleChange} required/>
        </form>
      </div>
    )
  }
};

export default Input;

//atm, doing both input and search in same class. Maybe split them?