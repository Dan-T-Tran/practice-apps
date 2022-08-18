import React from 'react';

class Pages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var colorButton = {
      backgroundColor: this.props.index === this.props.clickedPage ? 'green' : 'white'
    }

    return(
      <div>
        <button style={colorButton} className='pageButton' onClick={()=>{this.props.pageClick(this.props.index)}}>{this.props.page}</button>
      </div>
    )
  }
}

export default Pages;