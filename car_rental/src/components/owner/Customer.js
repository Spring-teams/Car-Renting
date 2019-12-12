import React from "react";
import OwnerHead from "./OwnerHead";
import CustomerItem from "./CustomerItem";

import "../../css/bootstrap.min.css";
import "../../css/Home.css";
// import "../../css/boostrap.min.css";
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            origin:[],
            isLoad: false,
            car_search: "",
            customer_search:"",
        }
    }
    componentDidMount() {
        fetch("/api/getCustomerByOwner")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ customers: data, origin: data })
                this.setState({
                    isLoad: true
                })
            })
    }
    handleFilter=(event)=>{
        let name = event.target.id;
        let customers = JSON.parse(JSON.stringify(this.state.origin));
        
        if(name=="isLose"){
            let a = "2019-12-10"
            let day = new Date(a.slice(0,4),a.slice(5,7)-1,a.slice(8,10));
            customers=customers.filter((customer)=> (new Date(customer.endDate.slice(0,4),customer.endDate.slice(5,7)-1,customer.endDate.slice(8,10)) < new Date() && customer.isRent ==1 ))
            
        }
        else if(name=="isDelete"){
            customers=customers.filter((customer)=>customer['isDelete']==1)
        }
        else if(name=="isConfirm"){
            customers=customers.filter((customers)=>customers['isConfirm']==0 && customers['isDelete']==0)
        }
        else if(name=='isPay'){
            customers=customers.filter((customer)=>customer['isPay']==1)
        }
        else if(name=="isRent"){
          
            customers=customers.filter((customer)=>customer['isRent']==1 && customer['isPay']==0)
        }
        else if(name!="all"){
            customers=customers.filter((customer)=>customer[name]==0)
        }
        
        this.setState({
            customers: customers
        })
    }
    handleSearch=(event)=>{
        let name = event.target.name;
        let data=JSON.parse(JSON.stringify(this.state.origin));
        let value=event.target.value;
        let customers;
        if(name=="car-search"){
            customers=data.filter((customer)=>customer.carId.indexOf(value)!=-1);
            this.setState({customers: customers,car_search:value})
        }
        else if(name=="customer-search"){
            customers=data.filter((customer)=>customer.name.indexOf(value)!=-1);
            this.setState({customers: customers,customer_search: value})
        }
    }
    
    render() {
        // {this.state.isLoad==true ? this.state.customers.map((customer)=> <CustomerItem rental={customer}/>) : " "}
        
        return (
            <div>
                <OwnerHead />

                <div id="owner-rent-car">
                    <div className="container mt-3">
                        <div className="card border-dark mb-3">
                            <div className="card-header">
                                <p className="float-left">Danh sách đơn hàng</p>
                                <div className="dropdown float-right mr-3" >
                                    <button style={{ width: '150px' }} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Lọc đơn hàng
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item"  id ="all" onClick={this.handleFilter}>Tất cả</a>
                                        <a className="dropdown-item"  id= "isConfirm" onClick={this.handleFilter}>Đang đợi xác nhận</a>
                                        <a className="dropdown-item" id = "isRent" onClick={this.handleFilter}>Đang thuê</a>
                                        <a className="dropdown-item"  id ="isLose" onClick={this.handleFilter}>Quá hạn</a>
                                        <a className="dropdown-item"  id = "isPay" onClick={this.handleFilter}>Đã thuê</a>
                                        <a className="dropdown-item" id = "isDelete" onClick={this.handleFilter}>Bị hủy</a>
                                    </div>
                                </div>
                                <div className="dropdown float-right mr-3" style={{ width: '100px' }}>
                                    <button style={{ width: '120px' }} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sắp xếp
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <a className="dropdown-item" href="#">Mới nhất</a>
                                        <a className="dropdown-item" href="#">Cũ nhất</a>
                                    </div>
                                </div>
                                <div className="float-right" style={{ height: "40px", marginRight: "30px"}}>
                                    <label style={{fontWeight:"bold"}}>Tìm kiếm xe  </label>  <input  type="text" style={{height: "90%"}} name="car-search" onChange={this.handleSearch} value={this.state.car_search}/>
                                </div >
                                <div className="float-right" style={{ height: "40px", marginRight: "10px"  }}>
                                    <label style={{fontWeight:"bold"}}>Tìm khách hàng  </label> <input  type="text" style={{height: "90%"}} name="customer-search" onChange={this.handleSearch}/>
                                </div>
                            </div>
                            <div className="card-body text-dark">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ảnh</th>
                                            <th scope="col">Thông tin xe</th>
                                            <th scope="col">Đã lấy xe</th>
                                            <th scope="col">Đã trả xe</th>
                                            <th scope="col">Xác nhận cho thuê</th>
                                            <th scope="col">Hủy</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.isLoad == true ? this.state.customers.map((customer) => <CustomerItem  key = {customer.rentalId} rental={customer}/>) : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Customer;