import React from "react";
import OwnerHead from "./OwnerHead";
import CustomerItem from "./CustomerItem";
import "../../css/O_DanhSachSanPham.css";
import "../../css/bootstrap.min.css";
import "../../css/Home.css";
// import "../../css/boostrap.min.css";
class Customer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            customers:[],
            isLoad: false
        }
    }
    componentDidMount(){
        fetch("/api/getCustomerByOwner")
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            this.setState({customers: data})
            this.setState({
                isLoad: true
            })
        })
    }
    render(){
        
        return (
            <div>
            <OwnerHead/>
            <div className="panel panel-warning text-center mt-1">
            <div className="panel-heading">
                <div className="row">
                    <div className="col-3">Ảnh</div>
                    <div className="col-4">Thông tin</div>
                    <div className="col-2">Trạng thái</div>
                    <div className="col-3">Thành tiền</div>
                </div>
            </div>
            <div className="panel-body">
        {this.state.isLoad==true ? this.state.customers.map((customer)=> <CustomerItem rental={customer}/>) : " "}
            </div>
            </div>
        </div>
        )
    }
}
export default Customer;