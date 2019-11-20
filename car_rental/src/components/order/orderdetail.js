import React from "react";
// import { deflate } from "zlib";
class Orderdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: null,
      isLoad: 0
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.callApi=this.callApi.bind(this);
  }
  componentDidMount() {
      this.callApi()
      .then(res => res.json())
      .then(data => {
        this.setState({isLoad:1})
        this.setState({ car: data[0] });
      })
      .catch(error => {
        console.log(error);
      });

      
  }
  componentDidCatch
  callApi(){
    return fetch("/api/getcarbyid/" + this.props.rental.carId)
  }
  render() {
    let rental = this.props.rental;
    
    // let car = this.state.car;
    if (this.state.car == null) {
      return null;
    }
    
    return (
      <div className="gio-hang-card filterDiv">
        <div className="row">
          <div className="col-3">
            <img
              src={"/images/" + this.state.car.image}
              className="img-fluid"
              alt="Responsive image"
              style={{height: "150px"}}
            />
          </div>
          <div className="col-4" style={{ fontSize: "15px" }}>
            <p>Tên xe:{"" + this.state.car.carName}</p>
            <br />
            <p>Biển số: {this.state.car.carId}</p>
            <br />
            <p>Chủ xe: {this.state.car.ownerName}</p>
            <p>
              Ngày thuê: {rental.beginDate==null ? "":rental.beginDate.slice(0,10)} đến  {rental.endDate==null ? "":rental.endDate.slice(0,10)}
            </p>
            <p>Đơn giá: {formatNumber(this.state.car.price)}</p>
           
          </div>
          {/* <div className="col-2 gio-hang-card-status">
            <button type="button" className="btn btn-success da-nhan">
              Đã nhận
            </button>
            <br />
            <button type="button" className="btn btn-danger tu-choi">
              Từ chối
            </button>
            <br />
            <button type="button" className="btn btn-info da-tra">
              Đã trả
            </button>
          </div> */}
          <div className="col-3 thanh-tien">
            
            <p className="orange">
              Tổng: <span>{formatNumber(rental.totalmoney)} VND</span>
              {rental.isConfirm==0&&" Hủy "}
            </p>
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
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export default Orderdetail;
