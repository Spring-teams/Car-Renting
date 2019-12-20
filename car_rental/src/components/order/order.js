import React from 'react';
import Head from '../customer/head';
import Orderdetail from './orderdetail';
import { timingSafeEqual } from 'crypto';
import './../../css/order.css';
import SearchOrder from'./searchOrder'
class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listOrder: [],
			customer: {},
			listRender: ' ',
			filterStatus: 'Tất cả',
			searchKey:""
		};
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount = () => {
		fetch('/api/checkLogin')
			.then((res) => res.text())
			.then((data) => {
				if (data == 'false') {
					window.location.href = '/login';
				}
			})
			.then(() => {
				fetch('/api/getCurrentCustomer/')
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						this.setState({ customer: data[0] });
					})
					.then(() => this.getRental());
			});
	};
	getRental() {
		fetch('/api/getrental/' + this.state.customer.customerId).then((res) => res.json()).then((data) => {
			console.log(data);
			
			this.setState({ listOrder: data });
			this.setState({
				
			});
		});
	}
	filterStatus = (filterStatus) => {
		this.setState({
			filterStatus:filterStatus
		})
	}
	onSearch = (searchKey) => {
		console.log(searchKey);
		this.setState({
			searchKey:searchKey
		})
	}
	render() {
		let {listOrder,filterStatus,searchKey} = this.state;
		if(filterStatus === "Tất cả"){
			listOrder = listOrder
		}
		else if(filterStatus === "Đã xác nhận"){
			listOrder = listOrder.filter((rental) => {
				rental = rental;
				return rental.isConfirm == 1 && rental.isRent == 0 && rental.isDelete == 0
			})
		}
		else if(filterStatus === "Đợi xác nhận"){
			listOrder = listOrder.filter((rental) => {
				rental = rental;
				return rental.isConfirm == 0 && rental.isDelete == 0
			})
		}
		else if(filterStatus === "Quá hạn"){
			listOrder = listOrder.filter((rental) => {
				rental = rental;
				let lastDay = rental.endDate;
				lastDay = new Date(lastDay.slice(0, 4), lastDay.slice(5, 7) - 1, Number(lastDay.slice(8, 10))+1);
				var date = new Date();
				date.setDate(date.getDate() + 1);
				return lastDay < date
			})
		}
		else if(filterStatus === "Đang thuê"){
			listOrder = listOrder.filter((rental) => {
				rental = rental;
				let lastDay = rental.endDate;
				console.log(lastDay)
				lastDay = new Date(lastDay.slice(0, 4), lastDay.slice(5, 7) - 1, Number(lastDay.slice(8, 10))+1);
				var date = new Date();
				date.setDate(date.getDate() + 1);
				return lastDay > date
			})
		}
		else if(filterStatus === "Đã thuê"){
			listOrder = listOrder.filter((rental) => {
				rental = rental;
				return rental.isRent == 1 && rental.isPay == 1 && rental.isDelete == 0
			})
		}
		else if(filterStatus === "Bị hủy"){
			listOrder = listOrder.filter((rental) => {
				rental = rental;
				return rental.isDelete == 1
			})
		}	
		if (searchKey) {
			console.log(searchKey);
			listOrder = listOrder.filter((car) => {
				console.log(car);
				return car.carId.toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
				|| car.carName.toString().toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
				|| car.ownerName.toString().toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
				|| car.phone.toString().toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
				|| car.address.toString().toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
				|| car.beginDate.slice(0,10).toString().toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
				|| car.endDate.slice(0,10).toString().toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
				|| car.price.toString().toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
				|| car.totalmoney.toString().toLowerCase().search(searchKey.toString().toLowerCase()) !== -1
			})
		}
		let listRender = listOrder.length != 0 ? listOrder.map((rental) => <Orderdetail rental={rental} />): ' ';
		return (
			<div style={{background:'#f5f5f5'}}>
				<Head isLogin={this.props.isLogin} handleLog={this.props.handleLog} />
				<div className="container-fluid "  id="order">
                    <h2 className="text-center" style={{paddingTop:"20px"}}>Danh sách đơn hàng</h2>
					<SearchOrder filterStatus={this.filterStatus} onSearch={this.onSearch}/>
					<table className="mt-3">
						<thead>
							<tr>
								<th>Tên xe</th>
								<th>Ảnh</th>
								<th>Biển số</th>
								<th>Chủ xe</th>
								<th>SĐT chủ xe</th>
								<th>Địa chỉ nhận</th>
								<th>Ngày thuê</th>
								<th>Đơn giá</th>
								<th>Thành tiền</th>
								<th>Trạng thái</th>
								<th>Hủy</th>
							</tr>
						</thead>
						<tbody>
                            {listRender}
                        </tbody>
						<tfoot />
					</table>
				</div>
			</div>
		);
	}
}
export default Order;
