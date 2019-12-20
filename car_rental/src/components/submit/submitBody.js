import React from 'react';
import Head from '../customer/head';
import Footer from '../footer';
import DatePicker from 'react-datepicker';
import UpdateSuccess from '../dialog/UpdateSuccess';
import '../../css/bootstrap.min.css';
import './../../css/submitBody.css';

class SubmitBody extends React.Component {
	constructor(props) {
		super(props);
		let a = new Date();
		this.state = {
			car: { price: 0 },
			isLogin: true,
			beginDate: new Date(),
			address: '',
			customer: {},
			endDate: new Date(a.getTime() + 60 * 60 * 24 * 1000),
			totalMoney: 0,
			diffDate: 1,
			showUpdateSuccess: false
		};
		// console.log(this.props.match.params.id);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.setBeginDate = this.setBeginDate.bind(this);
		this.getCurrentCustomer = this.getCurrentCustomer.bind(this);
		this.setEndDate = this.setEndDate.bind(this);
		this.handleAddress = this.handleAddress.bind(this);
		this.calcMoney = this.calcMoney.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.openUpdateSuccessDialog = this.openUpdateSuccessDialog.bind(this);
	}
	componentDidMount() {
		fetch('/api/getcarbyid/' + this.props.match.params.id + '/', {
			method: 'GET',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				this.setState({ car: data[0], totalMoney: data[0]['price'] });
			});
		this.getCurrentCustomer();
	}
	componentWillMount() {
		fetch('/api/checkLogin').then((res) => res.text()).then((data) => {
			if (data == 'true') {
				this.setState({ isLogin: true });
			} else this.setState({ isLogin: false });
		});
	}
	openUpdateSuccessDialog() {
		this.setState({
			showUpdateSuccess: true
		});
	}
	getCurrentCustomer() {
		fetch('/api/getCurrentCustomer').then((res) => res.json()).then((data) => {
			this.setState({ customer: data[0] });
		});
	}
	setBeginDate(e) {
		this.setState({ beginDate: e }, () => {
			this.calcMoney();
		});
	}

	setEndDate(e) {
		this.setState({ endDate: e }, () => {
			this.calcMoney();
		});
	}
	handleAddress(event) {
		this.setState({ address: event.target.value });
	}
	calcMoney() {
		let begin = new Date(this.state.beginDate);
		let end = new Date(this.state.endDate);

		begin = new Date(begin.getFullYear(), begin.getMonth(), begin.getDate());
		end = new Date(end.getFullYear(), end.getMonth(), end.getDate());
		let diffDate = Math.abs(end - begin) / (1000 * 60 * 60 * 24);
		let price = diffDate * this.state.car.price;
		this.setState({ totalMoney: price });
		this.setState({ diffDate: diffDate });
	}
	handleSubmit() {
		let rental = {};
		rental['customerId'] = this.state.customer.customerId;
		rental['carId'] = this.state.car.carId;
		rental['ownerId'] = this.state.car.ownerId;
		rental['beginDate'] = formatDate(this.state.beginDate);
		rental['endDate'] = formatDate(this.state.endDate);
		rental['isRent'] = 0;
		rental['isPay'] = 0;
		rental['isConfirm'] = 0;
		rental['address'] = this.state.address;
		rental['totalMoney'] = this.state.totalMoney;
		if(this.state.address.replace(/\s+/, "")==""){
			alert("Vui lòng nhập địa chỉ nhận xe!");
			return;
		}
		fetch('/api/addrental/', {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(rental)
		})
			.then((res) => res.text())
			.then((data) => {
				if (data == 'true') {
					this.openUpdateSuccessDialog();
				}
			})
			.catch(function(error) {
				
			});
    }
	render() {
		let car = this.state.car;

		if (this.state.isLogin == false) {
			window.location.href = '/login';
			return;
		}
	
		return (
			<div style={{ background: '#f5f5f5' }}>
				<Head isLogin={this.state.isLogin} hide={'show'} handleLog={this.props.handleLog} />
				<div className="container">
					<div className="row">
						<div className="col-md-12 col-lg-6 col-xl-6">
							<div
								style={{
									height: '100%',
									background: '#fff',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<img src={`/images/${car.image}`} className="img-fluid img-thumbnail" />
							</div>
						</div>
						<div className="col-md-12 col-lg-6 col-xl-6">
							<div className="box-text" style={{ width: '100%', background: '' }}>
								<h3 style={{ color: 'orangered' }}>{car.carName}</h3>
								<p>
									<i className="fas fa-tag" />
									<font> Loại xe: {car.categoryName}</font>
								</p>
								<p>
									<i className="fas fa-car" />
									<font> Hãng xe: {car.branch}</font>
								</p>
								<p>
									<i className="far fa-square" />
									<font> Biển số: {car.carId}</font>
								</p>
								<p>
									<i className="fas fa-adjust" /> Giới hạn: 250 km/ngày
								</p>
								<p>
									<i className="fas fa-car" />
									<font> Chủ xe: {car.ownerName}</font>
								</p>
								<p>
									<i className="fas fa-couch" />
									<font> Số ghế: {car.numberSeat}</font>
								</p>
								<p
									style={{
										fontSize: '18px',
										color: 'orangered',
										fontWeight: 'bold'
									}}
								>
									<font>
										{' '}
										Giá: {formatNumber(this.state.car.price)}
										<sup>đ</sup>/Ngày
									</font>
								</p>
							</div>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-md-12 col-lg-12 col-xl-12">
							<div className=" box-text">
								<h5>Lưu ý</h5>
								<p>1. Giá trên chưa bao gồm xăng dầu, cầu phà, bến bãi.</p>
								<p>2. Bảo quản cơ sở vật chất bên trong xe, nếu hỏng quý khách sẽ phải bồi thường</p>
								<p>
									3. Giá trên có thể thay đổi theo từng thời điểm. Hãy gọi ngay về phòng điều hành để
									được tư vấn và báo giá nhanh nhất, chính xác nhất theo hành trình mà Quý khách có
									nhu cầu. Xin chân thành cảm ơn và rất mong được sự hợp tác.
								</p>
								<p>4. Quý khách cần trả xe đúng hẹn, để tránh bị ăn đấm</p>
								<p>
									5. Nếu quý khách thêm dịch vụ khác thì liên hệ với số {"0"+this.state.car.phone} để biết
									thêm thông tin chi tiết
								</p>
								
							</div>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-md-12 col-lg-6 col-xl-6">
							<div className=" box-text">
								<h5>Ngày thuê</h5>
								<DatePicker
									selected={this.state.beginDate}
									onChange={this.setBeginDate}
									dateFormat="yyyy-MM-dd"
									timeCaption="Heure"
									minDate={new Date()}
									showDisabledMonthNavigation
								/>
								<DatePicker
									selected={this.state.endDate}
									onChange={this.setEndDate}
									dateFormat="yyyy-MM-dd"
									timeCaption="Heure"
									minDate={new Date(this.state.beginDate.getTime() + 60 * 60 * 24 * 1000)}
									showDisabledMonthNavigation
								/>
							</div>
						</div>
						<div className="col-md-12 col-lg-6 col-xl-6">
							<div className="box-text">
								<h5>Địa chỉ nhận hàng</h5>
								<textarea
									name=""
									value={this.state.address}
									id="address"
									onChange={this.handleAddress}
								/>
							</div>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-md-12 col-lg-6 col-xl-6">
							<div className=" box-text">
								<h5>Thông tin xe</h5>
								<p>
									<i className="fas fa-car" /> Hãng xe: {this.state.car.branch}
								</p>
								<p>
									<i className="fas fa-couch" /> Số ghế: {this.state.car.numberSeat}
								</p>
								<p>
									<i className="fas fa-money-bill-wave-alt" /> Đơn giá:{' '}
									{formatNumber(this.state.car.price)}
								</p>
								<p>
									<i className="fas fa-table" /> Số ngày: {this.state.diffDate}
								</p>
								<p className="total-money">
									<i className="fas fa-money-bill" /> Thành tiền:{' '}
									{formatNumber(this.state.diffDate * this.state.car.price)}
								</p>
							</div>
						</div>
						<div className="col-md-12 col-lg-6 col-xl-6">
							<div className="box-text">
								<h5>Thông tin khách hàng</h5>
								<p>
									<i className="fas fa-user-circle" /> Tên khách hàng: {this.state.customer.name}
								</p>
								<p>
									<i className="fas fa-id-card" /> Số CMND: {this.state.customer.customerId}
								</p>
								<p>
									<i className="fas fa-phone" /> Số điện thoại: {this.state.customer.phone}
								</p>
								<p>
									<i className="fas fa-table" /> Ngày sinh:{' '}
									{this.state.customer.birthday == null ? (
										''
									) : (
										this.state.customer.birthday.slice(0, 10)
									)}
								</p>
							</div>
						</div>
					</div>
					<div className="row mt-3">
                    <button type="text" className="btn btn-success" id="submit" onClick={this.handleSubmit}>
						Xác nhận thuê xe
					</button>
                    <button type="text" className="btn btn-danger ml-4" onClick={this.onClose}>
                       <a href="/" alt="" style={{color:'#fff', textDecoration:'none',}}>Hủy bỏ</a>
                    </button>
                    </div>
				</div>
				<UpdateSuccess show={this.state.showUpdateSuccess} url="/order" />
				<Footer />
			</div>
		);
	}
}
function formatNumber(num) {
	if (num == null) return;
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
function formatDate(date) {
	let temp = date;

	let a = temp.getDate() > 9 ? temp.getDate() : '0' + temp.getDate();
	return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + a;
}
export default SubmitBody;
