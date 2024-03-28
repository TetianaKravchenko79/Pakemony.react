import React from 'react'
import { Link } from 'react-router-dom'
import ReloadDialog from './reload'
import {fetchData, resultAPI} from './api'

export default class ListDialog extends React.Component {

	constructor(props) {
	   super(props);

       this.handleUsers = this.handleUsers.bind(this);
	   this.getAPI = this.getAPI.bind(this);

	   this.state = {
		   API: 'https://pokeapi.co/api/v2/pokemon/',
	   };
	}
 
	componentDidMount() {
		this.getAPI();   
	}
 
	getAPI() {
        let self = this;

		if (! localStorage.users || ! JSON.parse(localStorage.users).length) {
			/*
			fetch(this.state.API)
				.then(responce => {
					return responce.json();
				})
				.then(data => {
					let users = data.results;
	
					users.map(function(user, index) {
					   user.indexOriginal = index;
					});
	
					console.log(users);
	
					localStorage.users = JSON.stringify(users);
	
					self.handleUsers(users);
				});
			*/
			
			fetchData(this.state.API);

			//console.log(resultAPI); //null

			const result = new Promise((resolve, reject) => { //!!!
				let interval = setInterval(() => {
				   if (resultAPI && resultAPI.results && resultAPI.results.length) {
                      resolve(resultAPI.results);
					  clearInterval(interval);
				   }
				}, 50);
			  });  
		
			  result
				.then(value => {
				  console.log(result);
				  console.log(value);
		
				  let users = value;
	
				  users.map(function(user, index) {
					 user.indexOriginal = index;
				  });
  
				  console.log(users);
  
				  localStorage.users = JSON.stringify(users);
  
				  self.handleUsers(users);        
				})
				.catch(value => {
				  console.log(result);
				  console.error(value);
				});					
		} else {
			this.handleUsers(JSON.parse(localStorage.users));	
		} 
	}
	
	makeRemove(index) {
	   console.log(index);	
	
       let users = JSON.parse(localStorage.users);

	   users.splice(index, 1); 
	
	   users.map(function(user, index) {
		  user.indexOriginal = index;
	   });
	
	   localStorage.users = JSON.stringify(users);
	
	   this.handleUsers(users);
	}	

	handleUsers(users) {
		//this.setState({
		///	users: users,	
		//});
		this.props.handleUsers(users);
	}

	render() {
	   return (
			<div>

                <ReloadDialog getAPI={this.getAPI} />

				<div className="row">
					<div className="col font-weight-bold">Name</div>
					<div className="col font-weight-bold">Url</div>
					<div className="col">Remove</div>
				</div>	
				<div className="users">
					{this.props.users.map((item, key) =>
						<div className="row" key={key}>
							<div className="col">{item.name}</div>
							<div className="col"><a href={item.url}>{item.url}</a></div>
							<div className="col"><Link className="btn btn-link" to={{ pathname: "/user", userId: item.indexOriginal, userName: item.name }}>show</Link></div>
						</div>	
					)}
				</div>
			</div>
	   );    	
	}
 
 }

