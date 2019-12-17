import React from "react";
import Head from "../customer/head";
import AdOrderdetail from "./AdOrderdetail";

class AdOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        listOrder:[],
        customer:{},
        listRender: " ",
    }
    this.componentWillMount=this.componentWillMount.bind(this);
    this.getRental=this.getRental.bind(this);
    this.isComfirmed=this.isComfirmed.bind(this);
    this.isComfirmming=this.isComfirmming.bind(this);
    this.isDeleted = this.isDeleted.bind(this);
  }
  
  componentWillMount=()=>{
    let id = this.props.match.params.id;
    fetch("/api/checkLogin")
    .then(res=>res.text())
    .then(data=>{
    })
    .then(()=>{
      fetch("/api/getcustomer/"+id)
      .then(res=>res.json())
      .then((data)=>{
          this.setState({customer: data[0]})
          
      })
      .then(()=>this.getRental())
    })
  }
  getRental(){
      fetch("/api/getrental/"+this.state.customer.customerId)
      .then(res=>res.json())
      .then((data)=>{
          this.setState({listOrder: data});
          this.setState({listRender: this.state.listOrder.length!=0 ? this.state.listOrder.map((rental)=><AdOrderdetail rental={rental}/>):" "})
          // console.log(data)
      })
  }
 
  isComfirmed(){
      let filtered= this.state.listOrder.filter((rental)=>rental.isConfirm==1 && rental.isDelete==0);
      let listRender = filtered.length!=0 ? filtered.map((rental)=><AdOrderdetail rental={rental}/>):" ";
      this.setState({listRender: listRender});
      
  }
  isComfirmming(){
    // this.setState({listRender:""});
    let filtered = this.state.listOrder.filter((rental)=>rental.isConfirm==0 && rental.isDelete==0);
    this.setState({listRender: " "},()=>{
          let listRender = filtered.length!=0 ? filtered.map((rental)=><AdOrderdetail rental={rental}/>):" ";
          this.setState({listRender: listRender});
          
    })
  }
  isDeleted(event){
    event.preventDefault()
    let filtered=this.state.listOrder.filter((rental)=>rental.isDelete==1);
    
    this.setState({listRender: " "},()=>{
      let listRender = filtered.length!=0 ? filtered.map((rental)=><AdOrderdetail rental={rental}/>):" ";
      this.setState({listRender: listRender});
  })
  }
  isRenting=(event)=>{
    event.preventDefault();
    let filtered=this.state.listOrder.filter((rental)=>rental.isConfirm==1 && rental.isRent==1 && rental.isDelete==0);
    this.setState({listRender: " "},()=>{
      let listRender = filtered.length!=0 ? filtered.map((rental)=><AdOrderdetail rental={rental}/>):" ";
      this.setState({listRender: listRender});
  })
  }
  render() {
    // console.log(this.props.customer)
    // console.log(this.state.listOrder.length)
    let render = this.state.listRender;
    
    
    return (
    
      <div>
        {/* <Head isLogin={this.props.isLogin} handleLog={this.props.handleLog} /> */}
        
        <div id="gio-hang">
        <h3 style={{fontSize: "20px", margin: "0px auto", width: "60%", marginTop: "20px"}}>
    <h6>{"Mã khách hàng: "+this.state.customer.customerId}</h6>
  <h6>{"Tên khách hàng: "+this.state.customer.name}</h6>
        </h3>
			<div className="container">
				<div className="filler">
					<div className="row">
						<div className="col-10" id="myBtnContainer">
							<button type="button" className="btn" id="isConfirm" onClick={this.isComfirmed}>Đã xác nhận thuê</button>
							<button type="button" className="btn" id="isConfirming" onClick={this.isComfirmming}>Đang đợi xác nhận</button>
							<button type="button" className="btn" id="isNotConfirm" onClick={(event)=>this.isDeleted(event)}>Bị hủy</button>
							<button type="button" className="btn" onClick={(event)=>{this.isRenting(event)}}>Đang thuê</button>
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
            {render}
					</div>
				</div>

			</div>
		</div>
      </div>
    );
  }
}
export default AdOrder;
