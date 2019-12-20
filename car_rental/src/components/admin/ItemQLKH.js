import React, { Component } from 'react';

class ItemQLKH extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: 1
		}

	}
	handleClick = () => {
		window.location.href = "/customer/" + this.props.customer.customerId;
	}
	componentDidMount = () => {
		this.setState({
			isActive: this.props.customer.isCustomerActive
		})
	}
	disable = () => {
		let customer = this.props.customer;
		fetch("/api/disablecustomer", {
			method: "POST",
			headers: {
				"Accept": "*/*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(customer)
		})
			.then(res => res.text())
			.then(res => {
				if (res == "true") {
					this.setState({
						isActive: 0
					})
				}
			})
	}
	undisable = () => {
		let customer = this.props.customer;
		fetch("/api/undisablecustomer", {
			method: "POST",
			headers: {
				"Accept": "*/*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(customer)
		})
			.then(res => res.text())
			.then(res => {
				if (res == "true") {
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
				<td onClick={this.handleClick} className="id" style={{cursor:'pointer'}} title="Click để xem chi tiết khách hàng">{this.props.customer.customerId}</td>
				<td onClick={this.handleClick} className="id" style={{cursor:'pointer'}}  title="Click để xem chi tiết khách hàng">{this.props.customer.name}</td>

				<td>{this.props.customer.phone}</td>
				<td>{this.props.customer.birthday.slice(0, 10)}</td>
				<td>{this.props.customer.email}</td>
				<td data-toggle="modal" data-target={`#modal${this.props.index}`}>
					{this.props.customer.companyName}
				</td>

				<td>
					{this.state.isActive == 0 ?
						<button className=' btn-danger' onClick={this.undisable}>Deleted</button>
						: <button className=' btn-success' onClick={this.disable}>Active</button>
					}
				</td>
			</tr>
		);
	}
}

export default ItemQLKH;
