import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: '',
    };
  }

  handleSubmit = () => {

  };

  handleClick = () => {

  }


  render() {
    return(
      <div>
        <form className='wordSearch'>
           <input type='text' className='wordSearchInput' name='wordSearch' placeholder='Search Word'/>
        </form>

        <form className='wordInput'>
          <input type='text' className='wordNameInput' name='wordInput' placeholder='Insert Word'/>
          <button >Submit</button>
          <input type='text' className='wordDefinitionInput' name='definitionInput' placeholder='Insert Definition'/>
        </form>
      </div>
    )
  }
};

export default Input;

//atm, doing both input and search in same class. Maybe split them?