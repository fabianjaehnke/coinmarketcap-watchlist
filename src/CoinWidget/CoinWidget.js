import React, { Component } from 'react';
import './CoinWidget.css'

class CoinWidget extends Component {

	render() {
		const { coin } = this.props //destructuring assignment

		let lastUpdate = new Date(coin.last_updated*1000);
		let hours = ("0" + lastUpdate.getHours()).substr(-2)
		// Minutes part from the timestamp
		let minutes = ("0" + lastUpdate.getMinutes()).substr(-2)
		// Seconds part from the timestamp
		let seconds = ("0" + lastUpdate.getSeconds()).substr(-2)

		return(
			<div className="coinwidget">
				<div className="coinwidget-inner">
					<img src={`https://files.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`} alt={coin.id}/>
					<div>
						<h2>{coin.name} ({coin.symbol})</h2>
						<h3>$ {Math.round(coin.price_usd * 100) / 100}<br />
						€ {Math.round(coin.price_eur * 100) / 100}</h3>
						<p><small>updated: {`${hours}:${minutes}:${seconds}`}</small></p>
					</div>
				</div>
			</div>
		)
	}
}

export default CoinWidget
