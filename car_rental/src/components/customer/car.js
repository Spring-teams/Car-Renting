import React from "react";
import {Redirect} from "react-router-dom";
class CarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isClick: false
    }
    this.handleCarClick=this.handleCarClick.bind(this);
    }
  handleCarClick(){
    this.setState({isClick: true});
  }
  render() {
    if(this.state.isClick){
      window.location.href="/carinfo/"+this.props.car.carId+"/";
    }
    return (
        <div className="card-car">
        <div className="sale">
            <p>ACTIVE</p>
        </div>
        <div className="text-center img">
            <img src={"images/"+this.props.car.image} alt=""/>
        </div>
        <h5 className="text-center mt-2">{this.props.car.carName}</h5>
        <div className="title">
            <p ><i className="fas fa-tag"></i> Kiểu xe : {this.props.car.categoryName}</p>
            <p><i className="fas fa-car"></i> Hãng : {this.props.car.branch}</p>
            <p><i className="fas fa-eye"></i> Biển số: {this.props.car.carId}</p>
            <p><i className="fas fa-star"></i>Chủ xe: {this.props.car.ownerName}</p>
        </div>
        <div className="price text-center" onClick={this.handleCarClick}>
            <p>{this.props.car.price}</p>
        </div>
    </div>
    );
  }
}

export default CarItem;
