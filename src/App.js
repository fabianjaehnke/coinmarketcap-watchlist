import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import WidgetSelection from './WidgetSelection/WidgetSelection.js';

import './App.css';

class App extends Component {



  render() {
    return (
      <MuiThemeProvider>
      <div className="App">

        <WidgetSelection />

      </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
