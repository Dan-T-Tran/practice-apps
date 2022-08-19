import React from 'react';

class WordEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editWord: '',
      editDefinition: '',
    }
  }

  handleChange = (query) => {
    console.log(query.target);
    if (query.target.name === 'editWord') {
      this.setState({
        editWord: query.target.value
      });
    } else {
      this.setState({
        editDefinition: query.target.value
      });
    }
  }

  handleSubmit = () => {
    event.preventDefault();
    event.target.reset();
    this.props.update(this.props.word.word, this.state.editWord, this.state.editDefinition);
    this.setState({
      editWord: '',
      editDefinition: ''
    });
  }

  render() {
    let favoriteStyle = {backgroundColor: this.props.word.favorite ? 'green' : 'gray'};

    return(
      <div className='wordEntry'>
        <h3 className='wordName'>{this.props.word.word}</h3>
        <h3 style={favoriteStyle} className='favoriteIndicator'>{this.props.word.favorite ? 'Favorited!' : 'Not favorited...'}</h3>
        <h3 className='wordDefinition'>{this.props.word.definition}</h3>
        <button className='editButton' onClick={() => {this.props.setIndex(this.props.index)}}>Edit</button>
        <button className='favoriteEntryButton' onClick={() => {this.props.updateFavorite(this.props.word.word, this.props.word.definition, this.props.word.favorite)}}>Favorite</button>
        <button className='deleteButton' onClick={()=>{this.props.delete(this.props.word.word)}}>Delete</button>
        {this.props.index === this.props.clickedIndex &&
        <form className='editInput' onSubmit={this.handleSubmit}>
          <input type='text' className='editWordInput' name='editWord' placeholder='Edit the word' onChange={(e)=>{this.handleChange(e)}}required></input>
          <button type='submit' className='editSubmitButton'>Submit</button>
          <input type='text' className='editDefinitionInput' name='editDefinition' onChange={(e)=>{this.handleChange(e)}}placeholder='Edit the definition' required></input>
        </form>}
      </div>
    )


  }
}

export default WordEntry;

/*
Change word/definition directly version

    return(
      <div className='wordEntry'>
        {this.props.index === this.props.clickedIndex
          ?<input type='text' className='editWordInput' name='editWord' value={this.props.word.word} onChange={(e)=>{this.handleChange(e)}}></input>
          :<h3 className='wordName'>{this.props.word.word}</h3>
        }
        {this.props.index === this.props.clickedIndex
          ?<input type='text' className='editDefinitionInput' name='editDefinition' value={this.props.word.definition} onChange={(e)=>{this.handleChange(e)}}></input>
          :<h3 className='wordDefinition'>{this.props.word.definition}</h3>
        }
        <button className='editButton' onClick={() => {this.props.setIndex(this.props.index)}}>Edit</button>
        <button className='deleteButton' onClick={()=>{this.props.delete(this.props.word.word)}}>Delete</button>
      </div>
    )
*/