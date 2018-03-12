import React, { Component } from 'react';
import './Menu.css';
import WidgetSelection from '../WidgetSelection/WidgetSelection.js';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionAccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import ActionAdd from 'material-ui/svg-icons/content/add';

class Menu extends Component{

	constructor() {
		super();
		this.state = {
			drawerOpen: false,
			isSelectionHidden: true,
		}
	}


	handleMenuToggle = () => this.setState({drawerOpen: !this.state.open});

	handleSelectionToggle = () => {
		this.setState({isSelectionHidden: !this.state.isSelectionHidden})
	}

	render() {
		
		return(
			<div id="menu">
				<AppBar
					title="CMC Watchlist"
					iconElementRight={<IconButton><ActionAdd onClick={this.handleSelectionToggle} /></IconButton>}
					iconElementLeft={<IconButton><ActionAccountBalanceWallet onClick={this.handleMenuToggle} /></IconButton>}
				/>
				<Drawer open={this.state.drawerOpen}>
					<MenuItem>Menu Item</MenuItem>
					<MenuItem>Menu Item 2</MenuItem>
				</Drawer>

				<WidgetSelection selectionToggleStatus={this.state.isSelectionHidden} />
			</div>
		)

	}

}

export default Menu