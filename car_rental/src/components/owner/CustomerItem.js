import React from "react";
import "../../css/ownerOrder.css";
import { join } from "path";
class CustomerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      status:{
        isRent: 0,
        isPay:0,
        isConfirm: 0,
        isDelete:0,
      }
    }
    this.handleChange=this.handleChange.bind(this);
  }
  componentDidMount=()=>{
    let obj={};
    obj['isRent']=this.props.rental.isRent;
    obj['isPay']=this.props.rental.isPay;
    obj['isConfirm']=this.props.rental.isConfirm;
    obj['isDelete']=this.props.rental.isDelete;
    this.setState({
      status: obj
    })
   
  }
  handleChange(event){
    let name =event.target.name;
    let obj = JSON.parse(JSON.stringify(this.state.status));
    let rental = JSON.parse(JSON.stringify(this.props.rental));
    if(obj['isDelete']==1){
      return
    }
    if(name=="isPay"){
      if(obj['isRent']==0||obj['isConfirm']==0){
        return
      }
    }
    if(name=='isDelete'){
      if(obj['isPay']==1){
        return;
      }
    }
    if(name=='isRent'){
      if(obj['isConfirm']==0){
        return;
      }
    }

    obj[name]= obj[name]==0 ? 1:0;

    rental[name]=obj[name];
    fetch("/api/updateRental",{
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rental)
    })
    .then(res=>res.text)
    .then(data=>{
      console.log(data)
    })
    this.setState({
      status: obj
    })
  }
  render() {
    let status = this.state.status;
    return (
      <tr>
        <td>
          <img
            src={"/images/"+this.props.rental.image}
            width="100%"
          />
        </td>
        <td>
          <div style={{ float: "left", width: "50%" }}>
            <p>Tên xe: {this.props.rental.carName}</p>
            <p>Biển số: {this.props.rental.carId}</p>
            <p>Giá: {this.props.rental.price} VND/ngày</p>
            <p>Ngày lấy xe: {this.props.rental.beginDate.slice(0,10)}</p>
            <p>Ngày trả xe: {this.props.rental.endDate.slice(0,10)}</p>
          </div>
          <div style={{ float: "left", width: "50%" }}>
            <p>Mã đơn hàng: {this.props.rental.rentalId}</p>
            <p>Tên khách hàng : {this.props.rental.name}</p>
    <p>SDT: {this.props.rental.phone}</p>
    <p>Địa điểm: {this.props.rental.address}</p>
    
    <h6 style={{ marginTop: "5px" }}>Tổng tiền: {this.props.rental.totalmoney} VND</h6>
          </div>
        </td>
        <td>
          <label className="container-checkbox">
            <input type="checkbox" name = "isRent" checked={status.isRent==1? true:false} onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
        </td>
        <td>
          <label className="container-checkbox">
            <input type="checkbox" name="isPay" checked={status.isPay==1? true: false} onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
        </td>
        <td>
          <label className="container-checkbox">
            <input type="checkbox" name="isConfirm" checked={status.isConfirm==1 ? true: false} onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
        </td>
        <td>
          <label className="container-checkbox">
            <input type="checkbox" name="isDelete" checked={status.isDelete==1 ? true: false} onChange={this.handleChange}/>
            <span className="checkmark"></span>
          </label>
        </td>
      </tr>
    );
  }
}

function formatNumber(num) {
  if (num == null) {
    return;
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export default CustomerItem;