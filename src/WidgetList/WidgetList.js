import React, { Component } from 'react';
import CoinWidget from '../CoinWidget/CoinWidget'
import './WidgetList.css'
import TransitionGroup from 'react-transition-group/TransitionGroup'; // ES6

class WidgetList extends Component {


	render() {
		return(

					<TransitionGroup
						className="widgetlist"
					>
					{
						this.props.coins.map( (coindata) => {
							return <CoinWidget coin={coindata} key={coindata.id} />
						})
					}
					</TransitionGroup>

		)
	}


}

export default WidgetList;