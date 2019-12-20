import React from 'react';
import './../../css/car.css';
class CarItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClick: false
		};
		this.handleCarClick = this.handleCarClick.bind(this);
	}
	handleCarClick() {
		this.setState({ isClick: true });
	}
	render() {
		if (this.state.isClick) {
			window.location.href = '/carinfo/' + this.props.elementCar.carId + '/';
		}
		function formatNumber(num) {
			return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
		}
		var price = Number(this.props.elementCar.price);
		return (
			<div className="col-md-6 col-lg-4 col-xl-3" style={{ maxWidth: '450px', padding: '5px 2px', margin: '0' }}>
				<div className="card" onClick={this.handleCarClick}>
					<img
						src={'images/' + this.props.elementCar.image}
						className="img-fluid card-img-top"
						style={{ height: '150px', borderBottom:'1px solid rgba(0,0,0,.125)'}}
						alt=""
					/>
					<div style={{ position: 'absolute', top: '120px', background: 'orangered',clipPath:' polygon(0% 0%, 85% 0, 100% 50%, 85% 100%, 0% 100%)'}}>
						<label style={{ color: '#fff', padding: '0px 20px 0 5px', marginBottom: '0', lineHeight: '30px'}}>
							{this.props.elementCar.ownerName}
						</label>
					</div>
					<div className="card-body">
						<div className="title">
							<h5
								className="text-center text-primary"
								style={{
									width: '220px',
									height: '30px',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap'
								}}
							>
								{this.props.elementCar.carName}
							</h5>
							<p>
								<i className="fas fa-tag" /> Kiểu xe : {this.props.elementCar.categoryName}
							</p>
							<p>
								<i className="fas fa-car" /> Hãng : {this.props.elementCar.branch}
							</p>
							<p>
								<i className="fas fa-user" /> Số chỗ: {this.props.elementCar.numberSeat}
							</p>
						</div>
						<div className="price-car text-center">
							<p>
								<i className="fas fa-shopping-cart" /> {formatNumber(price)}
								<sup>đ</sup>
							</p>
						</div>
					</div>
				</div>
			</div>
			//trong nay ne
			// <div className="card-car" onClick={this.handleCarClick}>
			// 	<div className="sale">
			// 		<p>ACTIVE</p>
			// 	</div>
			// 	<div className="text-center img">
			// 		<img src={"images/" + this.props.elementCar.image} alt="" />
			// 	</div>
			// 	<h5 className="text-center mt-2">{this.props.elementCar.carName}</h5>
			// 	<div className="title">
			// 		<p ><i className="fas fa-tag"></i> Kiểu xe : {this.props.elementCar.categoryName}</p>
			// 		<p><i className="fas fa-car"></i> Hãng : {this.props.elementCar.branch}</p>
			// 		<p><i className="fas fa-eye"></i> Biển số: {this.props.elementCar.carId}</p>
			// 		<p><i className="fas fa-star"></i>Chủ xe: {this.props.elementCar.ownerName}</p>
			// 	</div>
			// 	<div className="price text-center" >
			// 		<p>{this.props.elementCar.price}</p>
			// 	</div>
			// </div>
		);
	}
}

export default CarItem;
