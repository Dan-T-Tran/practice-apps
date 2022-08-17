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
    console.log(this.state.currentWord);
    console.log(this.state.currentDefinition);
    event.preventDefault();
    this.props.input(this.state.currentWord, this.state.currentDefinition);
  };

  handleClick = () => {

  };

  handleWordChange = (query) => {
    // console.log(query.target.value);
    this.setState({
      currentWord: query.target.value
    });
  };

  handleDefinitionChange = (query) => {
    // console.log(query.target.value);
    this.setState({
      currentDefinition: query.target.value
    });
  };


  render() {
    return(
      <div>
        <form className='wordSearch'>
           <input type='text' className='wordSearchInput' name='wordSearch' placeholder='Search Word' onChange={(e)=>this.props.search(e.target.value)}/>
        </form>

        <form className='wordInput' onSubmit={this.handleSubmit}>
          <input type='text' className='wordNameInput' name='wordInput' placeholder='Insert Word' onChange={this.handleWordChange}/>
          <button type='submit' className='submitButton'>Submit</button>
          <input type='text' className='wordDefinitionInput' name='definitionInput' placeholder='Insert Definition' onChange={this.handleDefinitionChange}/>
        </form>
      </div>
    )
  }
};

export default Input;

//atm, doing both input and search in same class. Maybe split them?