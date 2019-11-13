import React from "react";

class CarItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            
            
            <tr>
              <td>
                <p>
        <span>{this.props.car.carName}</span>
                </p>
        <p>Biển số: {this.props.car.carId}</p>
              </td>
              <td>
                <img
                  src={"images/"+this.props.car.image}
                  className="img-fluid"
                  alt="Responsive image"
                />
              </td>
              <td>
        <p>Hãng xe: {this.props.car.branch}</p>
        <p>Loại xe: {this.props.car.categoryName}</p>
        <p>Số ghế: {this.props.car.numberSeat}</p>
        <p className="price-rent">Giá thuê: {this.props.car.price} VND</p>
                <br />
              </td>
              <td>
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#edit"
                  onClick={()=>{this.props.toggleModal(this.props.car)}}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger mt-1"
                  data-toggle="modal"
                  data-target="#delete"
                >
                  Xóa
                </button>
              </td>
            </tr>
            
        )
    }
}

export default CarItem;