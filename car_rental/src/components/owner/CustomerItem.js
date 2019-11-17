import React from "react"

class CustomerItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="gio-hang-card filterDiv">
            <div className="row" style={{fontSize: "16px"}}>
              <div className="col-3">
                <img
                  src={"/images/" + this.props.rental.image }
                  className="img-fluid"
                  alt="Responsive image"
                />
              </div>
              <div className="col-4" style={{ fontSize: "15px" }}>
                <p>Tên xe:{this.props.rental.carName}</p>
                <br />
                <p>Biển số: {this.props.rental.carId}</p>
                <br />
                <p>Mã đơn hàng: {this.props.rental.rentalId}</p>
                <br />
                <p>Tên khách hàng: {this.props.rental.name}</p>
                <p>
                  Ngày thuê: {this.props.rental.beginDate==null ? "":this.props.rental.beginDate.slice(0,10)} đến  {this.props.rental.endDate==null ? "":this.props.rental.endDate.slice(0,10)}
                </p>
                {/* <p>Đơn giá: {formatNumber(this.state.car.price)}</p> */}
              </div>
              <div className="col-2 gio-hang-card-status">
                <button type="button" className="btn btn-success da-nhan">
                  Đã nhận
                </button>
                
                <button type="button" className="btn btn-danger tu-choi">
                  Từ chối
                </button>
                
                <button type="button" className="btn btn-info da-tra">
                  Đã trả
                </button>
              </div>
              <div className="col-3 thanh-tien">
                
                <p className="orange">
                  Tổng: <span>{formatNumber(this.props.rental.totalmoney)} VND</span>
                </p>
              </div>
            </div>
          </div>
            
        )
    }
}
function formatNumber(num) {
    if (num == null) {
      return;
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
export default CustomerItem;