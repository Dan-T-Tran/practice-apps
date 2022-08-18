import React from 'react';
import Input from './Input.jsx';
import Pages from './Pages.jsx';

const SideBar = (props) => (
  <div id='sideBar'>
    <Input
      search={props.search}
      input={props.input}
    />
    <div id='pages'>
      <h3 className='pageTitle'>Pages</h3>
      {props.pages.map((page, index) => (
        <Pages
          page={page}
          index={index}
          clickedPage={props.clickedPage}
          pageClick={props.pageClick}
          key={index}
        />
      ))}
    </div>
  </div>
)

export default SideBar;