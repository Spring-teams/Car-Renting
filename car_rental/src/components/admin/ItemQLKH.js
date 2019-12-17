import React, { Component } from 'react';

class ItemQLKH extends Component {
	constructor(props){
		super(props);

	}
	handleClick=()=>{
		window.location.href="/customer/"+this.props.customer.customerId;
	}
	render() {
		return (
			<tr>
	<td>{this.props.index}</td>
		<td style={{cursor: "pointer", textDecoration: "underline", color: "blue", textAlign: "center"}} onClick={this.handleClick}>{this.props.customer.customerId}</td>
		<td>{this.props.customer.name}</td>
				
		<td>{this.props.customer.phone}</td>
				<td>{this.props.customer.birthday.slice(0,10)}</td>
				<td>{this.props.customer.email}</td>
				<td data-toggle="modal" data-target={`#modal${this.props.index}`}>
					{this.props.customer.companyName}
				</td>
				
				<td>
					{ this.props.customer.isCustomerActive ==0? 
					<button className=' btn-danger'>Deleted</button>
					: <button className=' btn-success'>Active</button>
				}
				</td>
			</tr>
		);
	}
}

export default ItemQLKH;
