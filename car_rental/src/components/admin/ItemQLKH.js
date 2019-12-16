import React, { Component } from 'react';

class ItemQLKH extends Component {
	render() {
		return (
			<tr>
				<td>id</td>
				<td>name</td>
				<td>phone</td>
				<td data-toggle="modal" data-target={`#modal${this.props.index}`}>
					companyName
				</td>
				<td>gender</td>
				<td>birthday</td>
				<td>email</td>
				<td>ádasdas</td>
				<td>
					<button className=" btn-danger">Xóa</button>
				</td>
			</tr>
		);
	}
}

export default ItemQLKH;
