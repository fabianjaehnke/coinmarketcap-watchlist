import React, { Component } from "react";
import WidgetList from "../WidgetList/WidgetList.js";
import "./WidgetSelection.css";

// import AppBar from 'material-ui/AppBar';
import SearchBar from "material-ui-search-bar";
import Snackbar from "material-ui/Snackbar";
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';

import Divider from "material-ui/Divider";
// import IconButton from 'material-ui/IconButton';
// import ActionAccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
// import ActionAdd from 'material-ui/svg-icons/content/add';
import ActionAddCircleOutline from "material-ui/svg-icons/content/add-circle-outline";
import ActionRemoveCircleOutline from "material-ui/svg-icons/content/remove-circle-outline";

const iconAddRemoveStyles = {
  opacity: 0.5
};

class WidgetSelection extends Component {
  constructor() {
    super();
    this.state = {
      coinlist: [],
      checkedCoins: ["bitcoin"],
      currentCoinList: [],
      searchstring: "",
      autoHideDuration: 2000,
      message: "Coin added to list",
      openSnackbar: false //initialize state object (for state.coinlist)
    };
  }

  componentDidMount() {
    this.fetchData();
    let duration = 60000;
    setInterval(this.fetchData, duration);

    if (localStorage.getItem("mycoins")) {
      this.setState({
        checkedCoins: JSON.parse(localStorage.getItem("mycoins"))
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.checkedCoins !== this.state.checkedCoins) {
      localStorage.setItem("mycoins", JSON.stringify(this.state.checkedCoins));
    }
  }

  fetchData = () => {
    fetch("https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=0")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          coinlist: myJson,
          currentCoinList:
            this.state.searchstring !== "" ? this.state.currentCoinList : myJson
        });
      });
  };

  onChange = event => {
    //Arrowfunction, this is WidgetSelection
    let newcheckedCoins = this.state.checkedCoins.map(coin => coin);
    if (event.target.checked) {
      // this.setState({checkedCoins: [...this.state.checkedCoins, event.target.value]}) //... spread operator
      newcheckedCoins.push(event.target.value);
      this.handleTouchTap(event.target.name + " added to list");
    } else {
      this.handleTouchTap(event.target.name + " removed from list");
      newcheckedCoins = this.state.checkedCoins.filter(function(coin) {
        return coin !== event.target.value;
      });
    }
    this.setState({ checkedCoins: newcheckedCoins });
  };

  uncheckCoinAndDeleteWidget = coinID => {
    const newcheckedCoins = this.state.checkedCoins.filter(function(coin) {
      return coin !== coinID;
    });
    this.setState({ checkedCoins: newcheckedCoins });
  };

  onChangeSearch(value) {
    console.log("onChangeSearch: " + value);
    // let value = this.refs.searchField.getValue();
    let searchResult = this.state.coinlist.filter(coindata => {
      return (
        coindata.id.toLowerCase().includes(value.toLowerCase()) ||
        coindata.symbol.toLowerCase().includes(value.toLowerCase()) ||
        coindata.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    this.setState({
      currentCoinList: value !== "" ? searchResult : this.state.coinlist,
      searchstring: value
    });
  }

  handleTouchTap = message => {
    this.setState({
      openSnackbar: true,
      message: message
    });
  };

  handleRequestClose = () => {
    this.setState({
      openSnackbar: false
    });
  };

  showAddOrRemoveIcon(coin) {
    const coinChecked = this.state.checkedCoins.some(coinId => {
      return coinId === coin.id;
    });
    if (coinChecked) {
      return <ActionRemoveCircleOutline style={iconAddRemoveStyles} />;
    } else {
      return <ActionAddCircleOutline style={iconAddRemoveStyles} />;
    }
  }
  render() {
    // const { coin } = this.props //destructuring assignment
    return (
      <div>
        <div className="controlpanel">
          {!this.props.selectionToggleStatus ? (
            <SearchBar
              onChange={value => this.onChangeSearch(value)}
              onRequestSearch={() => {}}
              value={this.state.searchstring}
              ref="searchField"
              hintText="search for more ..."
              style={{
                margin: "0 auto"
              }}
            />
          ) : null}
          {this.state.searchString}
          <div className="coinlist">
            {this.state.currentCoinList && !this.props.selectionToggleStatus
              ? this.state.currentCoinList.slice(0, 10).map(coin => {
                  return (
                    <div key={coin.id} id={coin.id} className="coinelement">
                      <input
                        id={coin.symbol}
                        name={coin.name}
                        type="checkbox"
                        onChange={this.onChange}
                        value={coin.id}
                        checked={this.state.checkedCoins.some(coinId => {
                          return coinId === coin.id;
                        })}
                      />
                      <label htmlFor={coin.symbol}>
                        {coin.name} - {coin.symbol}
                        {this.showAddOrRemoveIcon(coin)}
                      </label>
                    </div>
                  );
                })
              : null}
          </div>

          <Divider />
        </div>

        <WidgetList
          coins={this.state.coinlist.filter(coin => {
            return this.state.checkedCoins.indexOf(coin.id) !== -1;
          })}
          onDeleteWidget={this.uncheckCoinAndDeleteWidget}
        />

        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.message}
          // action="undo"
          autoHideDuration={this.state.autoHideDuration}
          // onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
          style={{ textAlign: "center" }}
        />
      </div>
    );
  }
}

export default WidgetSelection;
