import React from 'react';

class CarItem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
        // console.log(this.props.car);
        let cat = this.props.car.categoryId;
		return (
            <tr>
                <td style={{textAlign: "left"}}>{this.props.car.carName}</td>
                <td>
                    <img src={'/images/' + this.props.car.image} style={{width:"100px", padding:'1px 0'}} class="img-fluid" alt="" />
                </td>
                <td style={{textAlign: "left"}}>{this.props.car.carId}</td>
                <td style={{textAlign: "left"}}>{this.props.car.branch}</td>
                <td style={{textAlign: "left"}}>{cat === 1 ? "Xe thể thao" : (cat === 2)? "Xe du lịch":(cat === 3)? "Xe thương mại": "Khác"}</td>
                <td>{this.props.car.numberSeat}</td>
                <td style={{textAlign: "left"}}>{formatNumber(this.props.car.price)}<sup>đ</sup></td>
                <td>
                <button
						style={{background:"#ffc107", padding:'2px 5px', color:"#fff", border:'none', borderRadius:"3px"}}
						data-toggle="modal"
						data-target="#edit"
						onClick={() => {
							this.props.toggleModal(this.props.car);
						}}
						disabled={this.props.role == 'admin' ? true : false}
					>
						<i class="fas fa-edit"></i>
					</button>
                </td>
                <td>
                <button
						style={{background:"#ffc107", padding:'2px 7px', color:"#fff", border:'none', borderRadius:"3px"}}
						data-toggle="modal"
						data-target="#delete"
						onClick={() => {
							this.props.deleteCar(this.props.car.carId);
						}}
						disabled={this.props.role == 'admin' ? true : false}
					>
						<i class="fas fa-trash"></i>
					</button>
                </td>
            </tr>
        );
        function formatNumber(num) {
            if (num == null) {
                return;
            }
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
	}
}

export default CarItem;
