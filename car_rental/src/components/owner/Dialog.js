import React from 'react';
import PropTypes from 'prop-types';
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.handleFile = this.handleFile.bind(this);
		this.state = {
			carName: '',
			old_carId: '',
			carId: '',
			carBranch: '',
			numberSeat: 0,
			file: '',
			image: '',
			price: 0,
			categoryId: 0,
			car: {},
			isLoad: false,
			isActive: 1,
			carIsDelete: 0
		};
		// this.componentWillMount=this.componentWillMount.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.handleCarId = this.handleCarId.bind(this);
		this.handleCarName = this.handleCarName.bind(this);
		this.handleBranch = this.handleBranch.bind(this);
		this.handleNumberSeat = this.handleNumberSeat.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handlePrice = this.handlePrice.bind(this);
		this.handleCate = this.handleCate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validInput = this.validInput.bind(this);
	}
	componentWillReceiveProps(props) {
		if (this.state.isLoad == false) {
			this.setState({ car: props['car'] });
			this.setState({ old_carId: props['car']['carId'] });
		}
	}
	closeError=()=>{
		this.props.closeError();
	}
	handleFile(event) {
		
		let _car = JSON.parse(JSON.stringify(this.state.car));
		_car['file'] = event.target.files[0];
		_car['image'] = _car['file'].name;
		
		this.setState({
			file: event.target.files[0],
			car: _car
		});
		
	}
	handleCarName(event) {
		// this.props.closeError();
		let _car = JSON.parse(JSON.stringify(this.state.car));
		_car['carName'] = event.target.value;
		
		this.setState({
			carName: event.target.value,
			car: _car
		});
		
	}

	handleCarId(event) {
		let _car = JSON.parse(JSON.stringify(this.state.car));
		_car['carId'] = event.target.value;
		// this.props.closeError();
		
		
		this.setState({
			carId: event.target.value,
			car: _car
		});
		
	}

	handlePrice(event) {
		// this.props.closeError();
		let _car = JSON.parse(JSON.stringify(this.state.car));
		_car['price'] = event.target.value;
		
		this.setState({
			price: event.target.value,
			car: _car
		});
		
		
	}
	handleNumberSeat(event) {
		// this.props.closeError();
		let _car = JSON.parse(JSON.stringify(this.state.car));
		_car['numberSeat'] = event.target.value;
		
		this.setState({
			numberSeat: event.target.value,
			car: _car
		});
	}
	handleBranch(event) {
		// this.props.closeError();
		let _car = JSON.parse(JSON.stringify(this.state.car));
		_car['branch'] = event.target.value;
		
		this.setState({
			branch: event.target.value,
			car: _car
		});
	}
	handleCate(event) {
		// this.props.closeError();
		let cateDict = {
			'Xe du lịch': 1,
			'Xe thể thao': 2,
			'Xe thương mại': 3,
			'Khác': 4
		};
		
		let _car = JSON.parse(JSON.stringify(this.state.car));
		_car['categoryId'] = cateDict[event.target.value];
		_car['categoryName'] = event.target.value;

		this.setState({
			categoryId: cateDict[event.target.value],
			car: _car
		});

		// this.setState({categoryid: cateDict[event.target.value]})
	}
	async validInput(car) {
		let listProper = ['branch','carId', 'carName', 'categoryId', 'numberSeat', 'price' ];
		let isOk = true;
		debugger
		for (let _i of listProper) {
			if (typeof car[_i] == 'undefined') {
				this.props.showError('Xin nhập tất cả thông tin của xe!');
			
				isOk = false;
				return isOk;
			}
		}
		if (typeof car['image'] == 'undefined' && typeof car['file'] == 'undefined') {
			this.props.showError('Xin nhập thêm ảnh xe!');
			isOk = false;
			return isOk;
		}
		if (typeof car['carId'] != 'undefined' && car['carId'] != car['old_carId']) {
			await fetch('/api/car/checkExist/' + car['carId']).then((res) => res.text()).then((data) => {
				
				if (data == 'true') {
					this.props.showError('Biển số xe ' + car['carId'] + ' đã tồn tại!');
					isOk = false;
				}
			});
		}
		let regrex = /^\d+$/;
		if(!regrex.test(car['price'])){
			this.props.showError("Bạn nhập sai định dạng số tiền");
			isOk= false;
			return isOk;
		}
		return isOk;
	}

	async handleSubmit(event) {
		// event.preventDefault();
		this.setState({
			isLoad: true
		});
		let car = JSON.parse(JSON.stringify(this.state.car));
		debugger
		car['old_carId'] = this.state.old_carId;
		// car['file']=this.state.file
		let form_data = new FormData();
		
		let result = await this.validInput(car);
		
		if (!result) {
			// this.props.closeError();
			return;
		}

		this.props.openLoading();
		
		form_data.append('myImage', this.state.file);

		delete car['file'];

		fetch('/api/addCarByOwner', {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(car)
		})
			.then((res) => res.text())
			.then((data) => {
				
			})
			.then(() => {
				fetch('/api/addImageCar', {
					method: 'POST',
					body: form_data
				});
			})
			.then((res) => {
				this.props.closeLoading();
				// this.props.onClose();
			});
	}

	render() {
		// Render nothing if the "show" prop is false
		if (!this.props.show) {
			return null;
		}

		// The gray background
		const backdropStyle = {
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: 'rgba(0,0,0,0.3)',
			padding: 50,
			overflowY: "auto",
			zIndex: 11
		};
		// The modal "window"
		const modalStyle = {
			backgroundColor: '#f5f5f5',
			borderRadius: '5',
			width: '500px',
			position: 'absolute',
			top: '70%',
			left: '50%',
			transform: 'translate(-50%,-50%)',
			overflowY: 'auto',
			padding: '20px 60px',
			zIndex: 11,
		};
		let car = this.state.car;
		let selectedBranch = car != '' && typeof car != 'undefined' ? car.branch : '';
		let selectedNumberSeat = car != '' && typeof car != 'undefined' ? car.numberSeat : '';
		let selectedCategory = car != '' && typeof car != 'undefined' ? car.categoryid : '';
		return (
			<div className="backdrop" style={backdropStyle}>
				<div style={modalStyle}>
					<div style={{ position: 'absolute', top: '20px', right: '30px', cursor:'pointer'}} onClick={this.props.onClose}>
						<p style={{ color: 'red', fontSize: '30px', fontWeight: '900' }}>X</p>
					</div>
					<div className="modal-dialog">
						<div className="modal-content" style={{ border: 'none' }}>
							<div className="modal-body" style={{ background: '#f5f5f5' }}>
								<h4 className="text-primary text-center">Thêm xe mới</h4>
								<div className="form-group">
									<label>Tên xe</label>
									<input
										type="text"
										style={{paddingLeft:"10px"}}
										className="form-control"
										value={typeof car == 'undefined' ? ' ' : car.carName}
										onChange={this.handleCarName}
									/>
								</div>
								<div className="form-group">
									<label>Biển số</label>
									<input
										type="text"
										className="form-control"
										style={{paddingLeft:"10px"}}
										value={typeof car == 'undefined' ? ' ' : car.carId}
										onChange={this.handleCarId}
									/>
								</div>
								<div className="form-group">
									<label>Hãng xe</label>
									<select 
										style={{paddingLeft:"10px"}}
										className="form-control" onChange={this.handleBranch}>
										<option selected={selectedBranch == 'Mercedes' ? 'selected' : ''}>
											Mercedes
										</option>
										<option selected={selectedBranch == 'Toyota' ? 'selected' : ''}>Toyota</option>
										<option selected={selectedBranch == 'Ford' ? 'selected' : ''}>Ford</option>
										<option selected={selectedBranch == 'Honda' ? 'selected' : ''}>Honda</option>
										<option selected={selectedBranch == 'Mazda' ? 'selected' : ''}>Mazda</option>
										<option selected={selectedBranch == 'Vinfast' ? 'selected' : ''}>
											Vinfast
										</option>
										<option selected={selectedBranch == 'Huyndai' ? 'selected' : ''}>
											Huyndai
										</option>
										<option selected={selectedBranch == 'Samco' ? 'selected' : ''}>Samco</option>
										<option selected={selectedBranch == 'Audi' ? 'selected' : ''}>Audi</option>
										<option selected={selectedBranch == 'Khác' ? 'selected' : ''}>Khác</option>
									</select>
								</div>
								<div className="form-group">
									<label>Số ghế</label>
									<select 
										style={{paddingLeft:"10px"}}
										className="form-control" onChange={this.handleNumberSeat}>
										<option selected={selectedNumberSeat == 2 ? 'selected' : ''}>2</option>
										<option selected={selectedNumberSeat == 4 ? 'selected' : ''}>4</option>
										<option selected={selectedNumberSeat == 7 ? 'selected' : ''}>7</option>
										<option selected={selectedNumberSeat == 16 ? 'selected' : ''}>16</option>
										<option selected={selectedNumberSeat == 29 ? 'selected' : ''}>29</option>
										<option selected={selectedNumberSeat == 45 ? 'selected' : ''}>45</option>
										<option selected={selectedNumberSeat == 47 ? 'selected' : ''}>47</option>
									</select>
								</div>
								<div className="form-group">
									<label>Loại xe</label>
									<select 
										style={{paddingLeft:"10px"}}
										className="form-control" onChange={this.handleCate}>
										<option selected={selectedCategory == 1 ? 'selected' : ''}>Xe du lịch</option>
										<option selected={selectedCategory == 2 ? 'selected' : ''}>Xe thể thao</option>
										<option selected={selectedCategory == 3 ? 'selected' : ''}>
											Xe thương mại
										</option>
										<option selected={selectedCategory == 4 ? 'selected' : ''}>Khác</option>
									</select>
								</div>
								<div className="form-group">
									<label>Ảnh</label>
									<input
										type="file"
										name="upload"
										style={{paddingLeft:"0px"}}
										className="form-control"
										placeholder="Upload File"
										onChange={this.handleFile}
									/>
								</div>
								<div class="form-group">
									<label>Giá tiền(VND)</label>
									<input
										type="text"
										style={{paddingLeft:"10px"}}
										className="form-control"
										value={typeof car == 'undefined' ? ' ' :car.price}
										onChange={this.handlePrice}
									/>
								</div>
								<div style={{ marginTop: '40px' }}>
									<button
										type="button"
										style={{
											background: 'red',
											borderRadius: '5px',
											padding: '5px 15px',
											color: '#fff',
											border: 'none',
											float: 'right'
										}}
										data-dismiss="modal"
										onClick={this.props.onClose}
									>
										Đóng
									</button>
									<button
										type="button"
										style={{
											background: 'green',
											borderRadius: '5px',
											padding: '5px 15px',
											color: '#fff',
											border: 'none',
											float: 'left'
										}}
										onClick={this.handleSubmit}
									>
										Đồng ý
									</button>
								</div>
							</div>
						</div>
						{/* <div className="modal-content">
							<div className="modal-body">
								<form >
									<div className="form-group">
										<label>Tên xe</label>
										<input type="text" className="form-control" value={typeof car == "undefined" ? " " : car.carName} onChange={this.handleCarName} />
									</div>
									<div className="form-group">
										<label>Biển số</label>
										<input type="text" className="form-control" value={typeof car == "undefined" ? " " : car.carId} onChange={this.handleCarId} />
									</div>
									<div className="form-group">
										<label>Hãng xe</label>
										<select className="form-control" onChange={this.handleBranch}>
											<option selected={selectedBranch == "Mercedes" ? "selected" : ""}>Mercedes</option>
											<option selected={selectedBranch == "Toyota" ? "selected" : ""}>Toyota</option>
											<option selected={selectedBranch == "Ford" ? "selected" : ""}>Ford</option>
											<option selected={selectedBranch == "Honda" ? "selected" : ""}>Honda</option>
											<option selected={selectedBranch == "Mazda" ? "selected" : ""}>Mazda</option>
											<option selected={selectedBranch == "Vinfast" ? "selected" : ""}>Vinfast</option>
											<option selected={selectedBranch == "Huyndai" ? "selected" : ""}>Huyndai</option>
											<option selected={selectedBranch == "Samco" ? "selected" : ""}>Samco</option>
											<option selected={selectedBranch == "Audi" ? "selected" : ""}>Audi</option>
											<option selected={selectedBranch == "Khác" ? "selected" : ""}>Khác</option>
										</select>
									</div>
									<div className="form-group">
										<label>Số ghế</label>
										<select className="form-control" onChange={this.handleNumberSeat}>
											<option selected={selectedNumberSeat == 2 ? "selected" : ""}>2</option>
											<option selected={selectedNumberSeat == 4 ? "selected" : ""}>4</option>
											<option selected={selectedNumberSeat == 7 ? "selected" : ""}>7</option>
											<option selected={selectedNumberSeat == 16 ? "selected" : ""}>16</option>
											<option selected={selectedNumberSeat == 29 ? "selected" : ""}>29</option>
											<option selected={selectedNumberSeat == 45 ? "selected" : ""}>45</option>
											<option selected={selectedNumberSeat == 47 ? "selected" : ""}>47</option>
										</select>
									</div>
									<div className="form-group">
										<label>Loại xe</label>
										<select className="form-control" onChange={this.handleCate}>
											<option selected={selectedCategory == 1 ? "selected" : ""}>Xe du lịch</option>
											<option selected={selectedCategory == 2 ? "selected" : ""}>Xe thể thao</option>
											<option selected={selectedCategory == 3 ? "selected" : ""}>Xe thương mại</option>
											<option selected={selectedCategory == 4 ? "selected" : ""}>Khác</option>
										</select>
									</div>
									<div >
										<label>Ảnh</label>
										<input type="file" onChange={this.handleFile} />
									</div>
									<div class="form-group">
										<label>Giá tiền(VND)</label>
										<input type="text" className="form-control" value={typeof car == "undefined" ? " " : car.price} onChange={this.handlePrice} />
									</div>

									<div className="float-right">
										<button type="button" className="btn btn-success" onClick={this.handleSubmit}>Đồng ý</button>
										<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.onClose}>Đóng</button>
									</div>
								</form>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}
function formatNumber(num) {
	if (num == null) {
		return;
	}
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool,
	children: PropTypes.node
};

export default Modal;
