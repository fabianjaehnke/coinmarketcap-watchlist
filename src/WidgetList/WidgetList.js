import React, { Component } from 'react';
import CoinWidget from '../CoinWidget/CoinWidget'
import './WidgetList.css'
import TransitionGroup from 'react-transition-group/TransitionGroup'; // ES6


class WidgetList extends Component {

	removeWidget = (coinID) => {
		console.log("removeing Widget");
		if(window.confirm('Delete the widget from list?')){
			this.props.onDeleteWidget(coinID)
		}
	}
	eachWidget(coindata) {
		return(
			<div id="game">
				<CoinWidget key={coindata.id} coin={coindata} deleteFromList={this.removeWidget} />
			</div>
		)
	}
	
	render() {
		return(

					<TransitionGroup
						className="widgetlist"
					>
					{/*this.props.coins.map(this.eachWidget)*/}

					{
						this.props.coins.map( (coindata) => {
							return( 				
								// this.state.widgets.map(this.eachWidget)
								// <CoinWidget coin={coindata} key={coindata.id} />
								<CoinWidget key={coindata.id} coin={coindata} deleteFromList={this.removeWidget} />
							)
						})
					}
					</TransitionGroup>
		)
	}


}

export default WidgetList;