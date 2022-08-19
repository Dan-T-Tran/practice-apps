import React from 'react';

class FlashCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
  }

  handleClick = () => {
    console.log(this.state.clicked)
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    let flashStyle = {opacity: this.props.index === this.props.flashIndex ? 100 : 0,
                      height: this.props.index === this.props.flashIndex ? '100%' : '0'};
    let definitionStyle = {opacity: this.state.clicked ? 0 : 100};
    let antiDefinitionStyle = {opacity: this.state.clicked ? 100 : 0};
    let obfuscation = this.props.word.definition.replace(/./g, '*');

    return(
      <div style={flashStyle} className='flashCard'>
        <h4 className='flashIndex'>{this.props.flashIndex + 1}</h4>
        <h3 className='flashWord'>{this.props.word.word}</h3>
        <h3 style={definitionStyle} className='flashDefinition'>{obfuscation}</h3>
        <h3 style={antiDefinitionStyle} className='flashDefinition'>{this.props.word.definition}</h3>
        <button style={definitionStyle} className='showDefinitionButton' onClick={this.handleClick}>Show definition</button>
        {this.props.flashIndex !== 0 && <button className='flashBack' onClick={()=>{this.props.flashCardChange('back')}}>←-- Previous Flash Card</button>}
        {this.props.flashIndex !== this.props.amount - 1 && <button className='flashFoward' onClick={()=>{this.props.flashCardChange('next')}}>Next Flash Card ---→</button>}
      </div>
    )
  }
}

export default FlashCard;

//MAIN ISSUE FACED HERE WAS THAT OVERLAPPING BUTTONS ALSO MEANS THAT I MIGHT'VE BEEN CLICKING THE BUTTONS BEHIND THE CARD I WAS LOOKING AT

/*
        {this.state.clicked
        ? <h3 className='flashDefinition'>{this.props.word.definition}</h3>
        : <button className='showDefinitionButton' onClick={this.handleClick}>Show Definition</button>}
        */

/*
        {this.state.clicked
        ? <h3 style={definitionStyle} className='flashDefinition'>{this.props.word.definition}</h3>
        : <button style={definitionStyle} className='showDefinitionButton' onClick={this.handleClick}>Show definition</button>}
*/