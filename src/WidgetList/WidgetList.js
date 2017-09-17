import React, { Component } from 'react';
import CoinWidget from '../CoinWidget/CoinWidget'
import './WidgetList.css'

class WidgetList extends Component {


	render() {
		return(
			<div className="widgetlist">
				{
					this.props.coins.map( (coindata) => {
						return <CoinWidget coin={coindata} key={coindata.id} />
					})
				}

			</div>
		)
	}


}

export default WidgetList;