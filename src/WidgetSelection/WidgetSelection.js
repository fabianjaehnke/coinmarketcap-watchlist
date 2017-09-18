import React, { Component } from 'react';
import WidgetList from '../WidgetList/WidgetList.js';
import './WidgetSelection.css'

class WidgetSelection extends Component {

	constructor(){
	  super()
	  this.state = {isSelectionHidden: true, coinlist: [], checkedCoins: [], currentCoinList: [], searchstring: ""} //initialize state object (for state.coinlist)
	}

	componentDidMount() {
		this.fetchData()
		let duration = 60000
	  setInterval( this.fetchData, duration)


	  if ( localStorage.getItem("mycoins") ) {
	    this.setState( {checkedCoins: JSON.parse( localStorage.getItem("mycoins") )}  )
	  }
	}

	fetchData = () => {
		fetch('https://api.coinmarketcap.com/v1/ticker/?convert=EUR').then((response) => {
		  return response.json();
		}).then((myJson) => {
		  this.setState({coinlist: myJson, currentCoinList: this.state.searchstring !== "" ? this.state.currentCoinList : myJson});
		});
	}

	onChange = (event) => { //Arrowfunction, this is App
	  let newcheckedCoins = this.state.checkedCoins.map( (coin) => coin )
	  if (event.target.checked) {
	    // this.setState({checkedCoins: [...this.state.checkedCoins, event.target.value]}) //... spread operator
	    newcheckedCoins.push(event.target.value)
	  }else{
	    newcheckedCoins = this.state.checkedCoins.filter(function(coin){
	      return coin !== event.target.value;
	    });
	  }
	  this.setState({checkedCoins: newcheckedCoins}, () => {
	    localStorage.setItem('mycoins', JSON.stringify(this.state.checkedCoins))
	  } )

	}

	onSelectionToggle = (event) => {
		this.setState({isSelectionHidden: !this.state.isSelectionHidden})
	}

	onChangeSearch = (e) => {

    let searchResult = this.state.coinlist.filter( (coindata) => {
      return 	coindata.id.toLowerCase().includes(e.target.value.toLowerCase()) ||
							coindata.symbol.toLowerCase().includes(e.target.value.toLowerCase()) ||
							coindata.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    this.setState({
      currentCoinList: e.target.value !== "" ? searchResult : this.state.coinlist,
      searchstring: e.target.value
    })

	}

	render() {
		// const { coin } = this.props //destructuring assignment
		return(
			<div>

				<div className="controlpanel">
					<button className="selectionToggle" onClick={this.onSelectionToggle}>{this.state.isSelectionHidden ? 'SHOW COINLIST' : 'HIDE COINLIST'}</button>

					{!this.state.isSelectionHidden ? <input onChange={this.onChangeSearch} className="selectionSearch" type="text" placeholder="search for more ..." value={this.state.searchstring} /> : null}
					<div className="coinlist">
					  {this.state.currentCoinList && !this.state.isSelectionHidden
					    ? this.state.currentCoinList.slice(0, 50).map( (coin) => {
					        return <div key={coin.id} id={coin.id} className="coinelement">
					          <input type="checkbox" onChange={this.onChange} value={coin.id} checked={
					            this.state.checkedCoins.some( (coinId) => {
					              return coinId === coin.id
					            })
					          }/>
					          {/*coin.symbol*/}
					          <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.id}.png`} alt={coin.name}/>
					          &nbsp;{coin.name}
					        </div>
					      })
					    : null
					  }
					</div>

				</div>


				<WidgetList coins={this.state.coinlist.filter( (coin) => {
			    return this.state.checkedCoins.indexOf(coin.id) !== -1
			  } )}  />


			</div>
		);
	}
}

export default WidgetSelection;
