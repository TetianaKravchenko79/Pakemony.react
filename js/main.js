import React from 'react'
import SearchDialog from './search'
import ListDialog from './list'

export default class MainDialog extends React.Component {

	constructor(props) {
	   super(props);

       this.handleUsers = this.handleUsers.bind(this);

	   this.state = {
		   users: [],
	   };
	}
 
	handleUsers(users) {
		this.setState({
			users: users,	
		});
	}

	render() {
	   return (
			<div>
                <SearchDialog handleUsers={this.handleUsers} />
                <ListDialog users={this.state.users} handleUsers={this.handleUsers} />
			</div>
	   );    	
	}
 
 }

