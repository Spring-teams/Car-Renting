import React from 'react';
import Head from '../customer/head';
import Orderdetail from './AdOrderdetail';
import { timingSafeEqual } from 'crypto';
import './../../css/order.css';
import SearchOrder from'./searchOrder'
import AdminMenu from "./adminMenu";
class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listOrder: [],
			customer: {},
			listRender: ' '
		};
		this.componentWillMount = this.componentWillMount.bind(this);
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
              this.setState({listRender: this.state.listOrder.length!=0 ? this.state.listOrder.map((rental)=><Orderdetail rental={rental}/>):" "})
              // console.log(data)
          })
      }
     
	
	render() {
		let render = this.state.listRender;
		return (
			<div style={{background:'#f5f5f5'}}>
				{/* <Head isLogin={this.props.isLogin} handleLog={this.props.handleLog} /> */}
				<AdminMenu/>
				<div className="container-fluid "  id="order">
                    <h2 className="text-center" style={{paddingTop:"20px"}}>Danh sách đơn hàng</h2>
					<h2>{this.state.customer.name}</h2>
					<SearchOrder/>
					<table className="mt-3">
						<thead>
							<tr>
								<th>Tên xe</th>
								<th>Ảnh</th>
								<th>Biển số</th>
								<th>Chủ xe</th>
								<th>Địa chỉ nhận</th>
								<th>Ngày thuê</th>
								<th>Đơn giá</th>
								<th>Thành tiền</th>
								<th>Trạng thái</th>
							</tr>
						</thead>
						<tbody>
                            {render}
                        </tbody>
						<tfoot />
					</table>
				</div>
			</div>
		);
	}
}
export default Order;
