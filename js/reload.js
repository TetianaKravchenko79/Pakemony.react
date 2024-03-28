import React from 'react'

export default class ReloadDialog extends React.Component {

	constructor(props) {
	   super(props);
 
	   this.makeReload = this.makeReload.bind(this);

	   this.state = {
		  //...
	   };
	}

	makeReload() {
		localStorage.users = JSON.stringify([]);
		
		this.props.getAPI();
	}
 
	render() {
	   return (
			<div>
               <button className="btn btn-danger" onClick={this.makeReload}>Reload API</button>
			</div>
	   );    	
	}
 
 }

