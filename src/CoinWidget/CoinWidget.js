import React, { Component } from 'react';
import './CoinWidget.css'
import CSSTransition from 'react-transition-group/CSSTransition'; // ES6

class CoinWidget extends Component {
	constructor() {
		super();
		this.state = {
			shown: true,
		};
	}	

	toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}
	componentDidMount() {
		if ( localStorage.getItem('shownWidgets') ) {
			this.setState( {shown: localStorage.getItem('shownWidgets')} )
		}
	}

	render() {
		const {coin, ...transitionProps} = this.props // rest operator
		//const { coin } = this.props //destructuring assignment

		let lastUpdate = new Date(coin.last_updated*1000);
		let hours = ("0" + lastUpdate.getHours()).substr(-2)
		// Minutes part from the timestamp
		let minutes = ("0" + lastUpdate.getMinutes()).substr(-2)
		// Seconds part from the timestamp
		let seconds = ("0" + lastUpdate.getSeconds()).substr(-2)

		var shown = {
			display: this.state.shown ? "none" : "block"
		};

		return(
			<CSSTransition
				{...transitionProps /*spread operator*/}
			  timeout={2000}
			  classNames="coinwidget-fade"
			>

			<div className="coinwidget" onClick={this.toggle.bind(this)}>
				<div className="coinwidget-inner">
					<img src={`https://files.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`} alt={coin.id}/>
					<div>
						<h2>{coin.name} ({coin.symbol})</h2>
						<h3>$ {Math.round(coin.price_usd * 10000) / 10000}</h3>
						<h3 style={ shown }>€ {Math.round(coin.price_eur * 10000) / 10000}</h3>
						<h3 style={ shown }>B {Math.round(coin.price_btc * 10000) / 10000}</h3>
						<p style={ shown }><small>updated: {`${hours}:${minutes}:${seconds}`}</small></p>
						<div style={ shown } className="coindetails">
							<small>1h:</small> {coin.percent_change_1h}% <br />
							<small>24h:</small> {coin.percent_change_24h}% <br />
							<small>7d:</small> {coin.percent_change_7d}% <br />
						</div>
					</div>
				</div>
			</div>
			</CSSTransition>
		)
	}
}

export default CoinWidget
