import React, { Component } from 'react';


import WidgetSelection from './WidgetSelection/WidgetSelection.js';

import './App.css';

class App extends Component {



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Coinmarketcap Watchlist</h1>
        </div>



        <WidgetSelection />

      </div>
    );
  }

}

export default App;
