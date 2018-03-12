import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Menu from './Menu/Menu.js';

import './App.css';

class App extends Component {



  render() {
    return (
      <MuiThemeProvider>
        <div className="App">


          <Menu />

        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
