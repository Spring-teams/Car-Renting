import React from "react";
import Head from "../head";
import Orderdetail from "./orderdetail";
import { timingSafeEqual } from "crypto";
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        listOrder:[],
        customer:{},
        listRender: " ",
    }
    this.componentWillMount=this.componentWillMount.bind(this);
    this.getRental=this.getRental.bind(this);
    this.isComfirm=this.isComfirm.bind(this);
    this.isComfirmming=this.isComfirmming.bind(this);
    
  }
  componentWillMount(){
      fetch("/api/getCurrentCustomer/")
      .then(res=>res.json())
      .then((data)=>{
          this.setState({customer: data[0]})
          
      })
      .then(()=>this.getRental())
  }
  getRental(){
      fetch("/api/getrental/"+this.state.customer.customerId)
      .then(res=>res.json())
      .then((data)=>{
          this.setState({listOrder: data});
          this.setState({listRender: this.state.listOrder.length!=0 ? this.state.listOrder.map((rental)=><Orderdetail rental={rental}/>):" "})
          // console.log(data)
      })
  }
 
  isComfirm(){
      let filtered= this.state.listOrder.filter((rental)=>rental.isConfirm=="1");
      let listRender = filtered.length!=0 ? filtered.map((rental)=><Orderdetail rental={rental}/>):" ";
      this.setState({listRender: listRender});
      
  }
  isComfirmming(){
    // this.setState({listRender:""});
    let filtered = this.state.listOrder.filter((rental)=>rental.isConfirm==0);
    this.setState({listRender: " "},()=>{
          let listRender = filtered.length!=0 ? filtered.map((rental)=><Orderdetail rental={rental}/>):" ";
          this.setState({listRender: listRender});

    })
  }
  render() {
    // console.log(this.props.customer)
    // console.log(this.state.listOrder.length)
    return (
    
      <div>
        <Head isLogin={this.props.isLogin} handleLog={this.props.handleLog} />
        <div id="gio-hang">
			<div className="container">
				<div className="filler">
					<div className="row">
						<div className="col-10" id="myBtnContainer">
							<button type="button" className="btn" id="isConfirm" onClick={this.isComfirm}>Đã xác nhận thuê</button>
							<button type="button" className="btn" id="isConfirming" onClick={this.isComfirmming}>Đang đợi xác nhận</button>
							<button type="button" className="btn" id="isNotConfirm">Bị hủy</button>
							<button type="button" className="btn" >Đang thuê</button>
							<button type="button" className="btn" >Đã Thuê</button>
						</div>
					</div>
				</div>
				<div className="panel panel-warning text-center mt-1">
					<div className="panel-heading">
						<div className="row">
							<div className="col-3">Ảnh</div>
							<div className="col-4">Thông tin</div>
							{/* <div className="col-2">Trạng thái</div> */}
							<div className="col-3">Thành tiền</div>
						</div>
					</div>
					<div className="panel-body">
              {this.state.listRender}
					</div>
				</div>

			</div>
		</div>
      </div>
    );
  }
}
export default Order;
