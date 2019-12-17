import React, { Component } from 'react';

class ItemQLCH extends Component {
	constructor(props){
		super(props);
		this.state={
			isActive: 0
		}
	}
	handleClick=()=>{
		window.location.href="/owner/"+this.props.owner.ownerId;
	}
	componentDidMount=()=>{
		this.setState({
			isActive: this.props.owner.isOwnerActive
		})
	}
	disable=()=>{
		let customer= this.props.owner;
		fetch("/api/disableowner",{
			method: "POST",
			headers:{
				"Accept":"*/*",
				"Content-Type":"application/json"
			},
			body: JSON.stringify(customer)
		})
		.then(res=>res.text())
		.then(res=>{
			if(res=="true"){
				this.setState({
					isActive: 0
				})
			}
		})
	}
	undisable=()=>{
		let customer= this.props.owner;
		fetch("/api/undisableowner",{
			method: "POST",
			headers:{
				"Accept":"*/*",
				"Content-Type":"application/json"
			},
			body: JSON.stringify(customer)
		})
		.then(res=>res.text())
		.then(res=>{
			if(res=="true"){
				this.setState({
					isActive: 1
				})
			}
		})
	}
	render() {
		return (
			<tr>
	<td>{this.props.index}</td>
	<td style={{cursor: "pointer", textDecoration: "underline", color: "blue", textAlign: "center"}} onClick={this.handleClick}>{this.props.owner.ownerId}</td>
		<td>{this.props.owner.ownerName}</td>
				<td data-toggle="modal" data-target={`#modal${this.props.index}`}>
					{this.props.owner.phone}
				</td>
				
		<td>{this.props.owner.birthday.slice(0,10)}</td>
		<td>{this.props.owner.email}</td>
		<td>{this.props.owner.companyName}</td>
				<td>
				{ this.state.isActive ==0? 
					<button className=' btn-danger'onClick={this.undisable}>Deleted</button>
					: <button className=' btn-success'onClick={this.disable}>Active</button>
				}
				</td>
			</tr>
		);
	}
}

export default ItemQLCH;
