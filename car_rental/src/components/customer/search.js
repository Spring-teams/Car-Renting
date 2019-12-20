import React from 'react';
import '../../css/bootstrap.min.css';
import './../../css/search.css';
class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterBranch: 'Tất cả',
			filterNumberSeat: 'Tất cả',
			filterCategory: 0
		};
	}
	onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		this.props.onFilter(
			name === "filterCategory" ? value : this.state.filterCategory,
			name === "filterBranch" ? value : this.state.filterBranch,
			name === "filterNumberSeat" ? value : this.state.filterNumberSeat,
		)
		this.setState({
			[name]: value
		})
	}
	onSearch = () => {
		this.props.onSearch();
	}
	render() {
		let {filterCategory,filterBranch,filterNumberSeat} = this.state;
		// console.log(filterCategory,filterBranch, filterNumberSeat);
		return (
			<div
				className="container"
				id="search-form-customer"
				style={{
					width: '100%',
					height: '',
					background: '#e9ecefe0',
					padding: '15px',
					display: 'flex',
					flexWrap: 'wrap'
				}}
			>
				<div className="select">
					<select name="filterBranch" onChange={this.onChange}>
						<option value="Tất cả">--- Hãng xe ---</option>
						<option>Mercedes</option>
						<option>Toyota</option>
						<option>Ford</option>
						<option>Honda</option>
						<option>Mazda</option>
						<option>Vinfast</option>
						<option>Huyndai</option>
						<option>Samco</option>
						<option>Audi</option>
						<option>Khác</option>
					</select>
				</div>
				<div className="select">
					<select name="filterCategory" onChange={this.onChange}>
						<option value={0}>--- Loại xe ---</option>
						<option value={1}>Xe du lịch</option>
						<option value={2}>Xe thể thao</option>
						<option value={3}>Xe thương mại</option>
						<option value={4}>Khác</option>
					</select>
				</div>
				<div className="select">
					<select name="filterNumberSeat" onChange={this.onChange}>
						<option value="Tất cả">--- Số chỗ ngồi---</option>
						<option>2</option>
						<option>4</option>
						<option>7</option>
						<option>16</option>
						<option>29</option>
						<option>45</option>
						<option>47</option>
					</select>
				</div>

				<button
					onClick={this.onSearch}
					className="btn"
					style={{ background: '#fd710d', color: '#fff', marginLeft: '15px', marginTop: '5px' }}
				>
					Tìm kiếm
				</button>
			</div>
		);
	}
}

export default Search;
