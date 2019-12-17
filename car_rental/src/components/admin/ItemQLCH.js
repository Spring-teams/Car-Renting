import React, { Component } from 'react';

class ItemQLCH extends Component {
	constructor(props){
		super(props);
	}
	handleClick=()=>{
		window.location.href="/owner/"+this.props.owner.ownerId;
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
					<button className=" btn-danger">Xóa</button>
				</td>
			</tr>
		);
	}
}

export default ItemQLCH;
