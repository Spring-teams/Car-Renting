import React from 'react';
import CarItem from './Caritem';
import Modal from './Dialog';
import Loading from '../dialog/loading';
import UpdateSuccess from '../dialog/UpdateSuccess';
import Confirm from '../dialog/ConfirmDialog';
import "../../css/ownerCarList.css";
class CarList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			carItems: [],
			isOpen: false,
			selectedCar: {},
			showLoading: 'none',
			showSuccess: false,
			showError: ' ',
			errorContent: ' ',
			showConfirm: 'none',
			confirmContent: ' asf',
			canDeleteCar: true,
			deletedCarId: '',
			searchKey: '',
			key: ''
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.addToggleModal = this.addToggleModal.bind(this);
		this.handleDeleteCar = this.handleDeleteCar.bind(this);
		// this.toggleModal = this.toggleModal.bind(this);
	}
	componentDidMount() {
		if (typeof this.props.owner != 'undefined') {
			fetch('/api/getCarByOwnerId/' + this.props.owner.ownerId).then((res) => res.json()).then((data) => {
				console.log(data);

				this.setState({
					carItems: data
				});
			});
		}
		// console.log(this.props.ow)
	}
	toggleModal = (car) => {
		if (this.state.isOpen == true) {
			this.setState({
				showError: ' '
			});
		}
		this.setState({
			isOpen: !this.state.isOpen,
			selectedCar: car
		});
		// console.log(car)
	};
	showError = (content) => {
		this.setState({ showError: ' show', errorContent: content });
	};
	closeError = () => {
		this.setState({ showError: ' ' });
	};
	addToggleModal() {
		this.setState({
			isOpen: !this.state.isOpen,
			selectedCar: { categoryName: 'Xe du lịch', categoryId: 1, numberSeat: 2, branch: 'Mercedes' }
		});
	}
	openLoading = () => {
		this.setState({
			showLoading: 'block'
		});
	};
	closeLoading = () => {
		this.setState({
			showLoading: 'none',
			showSuccess: true
		});
	};
	async handleDeleteCar(carId) {
		this.setState({});
		await fetch('/api/confirmCar/' + carId).then((res) => res.text()).then((data) => {
			if (data == 'false') {
				this.setState({
					confirmContent: 'Bạn có chắc chẵn muốn xóa xe ' + carId,
					canDeleteCar: false,
					deletedCarId: carId
				});
			} else {
				this.setState({
					confirmContent: 'Bạn không thể xóa xe này do đang trong quá trình thuê !',
					canDeleteCar: true,
					deletedCarId: carId
				});
			}
		});
		this.setState({
			showConfirm: 'block'
		});
	}
	closeDeleteCar = () => {
		this.setState({
			showConfirm: 'none'
		});
	};
	handleList = (event) => {
		let listCar = JSON.parse(JSON.stringify(this.state.carItems));

		if (event.target.id == 'inorder') {
			listCar.sort((a, b) => (a.price > b.price ? 1 : -1));
			this.setState({
				carItems: listCar
			});
		} else if ((event.target.id == 'postorder')) {
			listCar.sort((a, b) => (a.price < b.price ? 1 : -1));
			this.setState({
				carItems: listCar
			});
		} else if (event.target.id == 'newest') {
			let cars = listCar.sort((a,b)=>(new Date(a.createTime.slice(0,4),a.createTime.slice(5,7)-1,a.createTime.slice(8,10)) > new Date(b.createTime.slice(0,4),b.createTime.slice(5,7)-1,b.createTime.slice(8,10)))?1:-1);
			this.setState({
				carItems: cars
			});
		}
	};
	onChange = (e) => {
		if (e.target.name === "searchKey") {
			this.setState({
				searchKey: e.target.value
			})
		}
	}
	onSearch = (searchKey) => {
		console.log(searchKey);
		this.setState({
			key: searchKey
		})
	}
	render() {
		let styleSearchBox = {
			width: '70%',
			height: '35px',
			borderRadius: '3px',
			border: '1px solid orangered',
			paddingLeft: '10px'
		};
		let styleButtonSearch = {
			background: 'orangered',
			color: 'white',
			height: '35px',
			padding: '0 15px',
			borderRadius: '3px',
			border: '1px solid orangered'
		};
		let owner = this.props.owner;
		// console.log(this.state.carItems);
		let { searchKey, key, carItems } = this.state;
		if (key) {
			
			carItems = carItems.filter((car) => {
				
				return car.carId.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					car.carName.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					car.branch.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					car.price.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1
			})
		
		}

		let renderedCar =
			typeof this.state.carItems == 'undefined' || this.props.cars == ''
				? 'Bạn chưa có xe cho thuê!'
				: carItems.map((car) => (
					<CarItem
						car={car}
						toggleModal={this.toggleModal}
						deleteCar={this.handleDeleteCar}
						role={this.props.role}
					/>
				));
		return (
			<div className="container" id="owner-car-list">
				<h2 className="text-center" style={{ paddingTop: "20px" }}>Quản lý xe</h2>
				<div className="container">
					<div className="row" style={{ padding: "10px" }}>
						<div className="col">
							<input type="text" name="searchKey" value={this.state.searchKey} onChange={this.onChange} style={styleSearchBox} />
							<button style={styleButtonSearch} onClick={() => this.onSearch(searchKey)}>Tìm Kiếm</button>
						</div>
						<div className="col">
							<div className="btn-group" style={{ float: 'right' }}>
								<button
									type="button"
									style={styleButtonSearch}
									className="dropdown-toggle"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Lọc theo trạng thái
							</button>
								<div className="dropdown-menu" >
									<button className="dropdown-item" id="newest" onClick={this.handleList} >
										Mới nhất
									</button>
										<button className="dropdown-item" id="inorder" onClick={this.handleList}>
											Giá tăng dần
									</button>
										<button className="dropdown-item" id="postorder" onClick={this.handleList}>
											Giá giảm dần
									</button>
								</div>
							</div>
							<button
								style={{
									float: 'right', marginRight: "10px", background: 'orangered',
									color: 'white',
									height: '35px',
									padding: '0 15px',
									borderRadius: '3px',
									border: '1px solid #ccc'
								}}
								data-target="#add"
								onClick={() => this.addToggleModal('')}
								disabled={this.props.role == 'admin' ? true : false}
							>
								Thêm xe
						</button>
						</div>
					</div>
				</div>
				<table className="mt-3" style={{ overflowX: "auto" }}>
					<thead>
						<tr>
							<th>Tên xe</th>
							<th>Ảnh</th>
							<th>Biển số</th>
							<th>Hãng xe</th>
							<th>Loại xe</th>
							<th>Số ghế</th>
							<th>Giá thuê</th>
							<th>Sửa</th>
							<th>Xóa</th>
						</tr>
					</thead>
					<tbody>
						{renderedCar}
					</tbody>
					<tfoot />
				</table>
				<Modal
					show={this.state.isOpen}
					onClose={this.toggleModal}
					car={this.state.selectedCar}
					openLoading={this.openLoading}
					closeLoading={this.closeLoading}
					showError={this.showError}
					closeError={this.closeError}
				>
					Here's some content for the modal
				</Modal>
				<Loading show={this.state.showLoading} />
				<UpdateSuccess show={this.state.showSuccess} url={'/chothuexe'} />
				<div className={'id-error ' + this.state.showError} style={{ color: 'red', backgroundColor: 'white' }}>
					<p>{this.state.errorContent}</p>
				</div>
				<Confirm
					show={this.state.showConfirm}
					content={this.state.confirmContent}
					close={this.closeDeleteCar}
					canDeleteCar={this.state.canDeleteCar}
					deletedCarId={this.state.deletedCarId}
					url="/chothuexe"
				/>
			</div>
		);
	}
}

export default CarList;
