import React, { Component } from 'react';
import './CoinWidget.css'
import CSSTransition from 'react-transition-group/CSSTransition'; // ES6
// import DeleteConfirm from 'react-delete-confirm';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import ActionArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ActionArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';


class CoinWidget extends Component {
	constructor() {
		super();
		this.state = {
			shown: true,
		};
	}	

	toggle = () => {
		this.setState({
			shown: !this.state.shown
		});
	}
	componentDidMount() {
		if ( localStorage.getItem('shownWidgets') ) {
			this.setState( {shown: localStorage.getItem('shownWidgets')} )
		}
	}

	calculateDigits(price) {
		switch (true) {
			//0.00000001 = 1 Satoshi
			case (price < 0.001):
				return price;

			case (price < 0.01):
				return Math.round(price * 10000) / 10000;
			
			case (price < 0.1):
				return Math.round(price * 1000) / 1000;

			case (price < 0):
				return Math.round(price * 1000) / 1000;
				
			default:
				return Math.round(price * 100) / 100;
				
		}
	};

	removeWidget = () => {
		this.props.deleteFromList(this.props.coin.id)
	}


	showOpenOrCloseStatus(){
		if (this.state.shown) {
			return <ActionArrowDown className="icon-open-close" />
		}	else{
			return <ActionArrowUp className="icon-open-close" />
		}
	}

	render() {
		const {coin, deleteFromList, ...transitionProps} = this.props // rest operator
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

			<div className="coinwidget" onClick={this.toggle}>
				<div className="coinwidget-inner">
					<div className="coinwidget--left">
						<img src={`https://files.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`} alt={coin.id}/>
						
						<strong style={ shown } >{coin.symbol}</strong>

					</div>
					<div className="coinwidget--right">

						<h2>{coin.name}</h2>
						<div className="price-default">
							<div className="h3"><strong>$</strong> {this.calculateDigits(coin.price_usd)}</div>
							{this.showOpenOrCloseStatus()}
						</div>

						<div style={ shown } className="coindetails">
							<div className="h3"><strong>€</strong> {this.calculateDigits(coin.price_eur)}</div>
							<div className="h3"><span className="btc">BTC</span> {this.calculateDigits(coin.price_btc)}</div>
							<br />
							<small>1h:</small> {coin.percent_change_1h}% <br />
							<small>24h:</small> {coin.percent_change_24h}% <br />
							<small>7d:</small> {coin.percent_change_7d}% <br />
							<br />
							<span><small>updated: {`${hours}:${minutes}:${seconds}`}</small></span>
							<div style={ shown } className="button-delete">			 
								<IconButton><ActionRemoveCircleOutline onClick={this.removeWidget} /></IconButton>
			 				</div>
						</div>
					</div>
				</div>
			</div>
			</CSSTransition>
		)
	}
}

export default CoinWidget
