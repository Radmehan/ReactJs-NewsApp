import logo from './logo.svg';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  // c='harry';
  render() { 
    return (
      // <div>Hello my first app {this.c}</div>
      <div>
        <NavBar/>
        <News pageSize={5}/>
      </div>
    )
  }
}
