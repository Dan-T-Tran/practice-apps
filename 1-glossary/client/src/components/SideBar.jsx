import React from 'react';
import Input from './Input.jsx'

const SideBar = (props) => (
  <div id='sideBar'>
    <Input
      search={props.search}
      input={props.input}
    />
  </div>
)

export default SideBar;