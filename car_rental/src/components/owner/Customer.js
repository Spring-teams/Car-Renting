import React from "react";
import OwnerHead from "./OwnerHead";
import CustomerItem from "./CustomerItem";
import "../../css/bootstrap.min.css";
import "./../../css/ownerOrder.css";
// import "../../css/boostrap.min.css";
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            origin: [],
            isLoad: false,
            car_search: "",
            customer_search: "",
            owner: {},
            searchKey: '',
            key: '',
            sortStartDate: 0
        }
    }
    componentDidMount =() => {
        if (typeof this.props.match == "undefined") {
            fetch("/api/getCustomerByOwner")
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ customers: data, origin: data })
                    this.setState({
                        isLoad: true,
                        owner: data[0],
                    })
                })

        }
        else {
            fetch("/api/getCustomerByOwner/" + this.props.match.params.id)
                .then((res) => res.json())
                .then((data) => {

                    this.setState({ customers: data, origin: data })
                    this.setState({
                        isLoad: true
                    })
                })
            fetch("/api/getowner/" + this.props.match.params.id)
                .then((res => res.json()))
                .then(((data) => {
                    
                    this.setState({
                        owner: data[0]
                    })
                }))
        }

    }
    handleFilter = (event) => {
        let name = event.target.id;
        let customers = JSON.parse(JSON.stringify(this.state.origin));

        if (name == "isLose") {
            let a = "2019-12-10"
            let day = new Date();
            day.setDate(day.getDate() - 2);
            customers = customers.filter((customer) => (new Date(customer.endDate.slice(0, 4), customer.endDate.slice(5, 7) - 1, customer.endDate.slice(8, 10)) < day && customer.isRent == 1 && customer.isPay==0))

        }
        else if (name == "isDelete") {
            customers = customers.filter((customer) => customer['isDelete'] == 1)
        }
        else if (name == "isConfirm") {
            customers = customers.filter((customers) => customers['isConfirm'] == 0 && customers['isDelete'] == 0)
        }
        else if (name == 'isPay') {
            customers = customers.filter((customer) => customer['isPay'] == 1)
        }
        else if (name == "isRent") {

            customers = customers.filter((customer) => customer['isRent'] == 1 && customer['isPay'] == 0)
        }
        else if (name != "all") {
            customers = customers.filter((customer) => customer[name] == 0)
        }

        this.setState({
            customers: customers
        })
    }
    handleSearch = (event) => {
        let name = event.target.name;
        let data = JSON.parse(JSON.stringify(this.state.origin));
        let value = event.target.value;
        let customers;
        if (name == "car-search") {
            customers = data.filter((customer) => customer.carId.indexOf(value) != -1);
            this.setState({ customers: customers, car_search: value })
        }
        else if (name == "customer-search") {
            customers = data.filter((customer) => customer.name.indexOf(value) != -1);
            this.setState({ customers: customers, customer_search: value })
        }
    }
    onChange = (e) => {
        if (e.target.name === "searchKey") {
			this.setState({
				searchKey: e.target.value
			})
		}
    }
    onSearch = (searchKey) => {
		this.setState({
			key: searchKey
		})
    }
    onSort = (e,value) => {
        e.preventDefault();
        if(value==="new"){
            this.setState({
                sortStartDate: 1,
            })
        }else if(value==="old"){
            this.setState({
                sortStartDate: -1,
            })
        }
    }
     render() {
        // {this.state.isLoad==true ? this.state.customers.map((customer)=> <CustomerItem rental={customer}/>) : " "}
       

        let styleSearchBox = {
            width: '70%',
            height: '35px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            paddingLeft: '10px'
        };
        let styleButtonSearch = {
            background: '#17a2b8',
            color: 'white',
            height: '35px',
            padding: '0 15px',
            borderRadius: '3px',
            border: '1px solid #ccc'
        };
        let {customers,searchKey, key,sortStartDate} =this.state;
        if(sortStartDate === 1){
           customers = customers.sort((a,b)=>(new Date(a.beginDate.slice(0,4),a.beginDate.slice(5,7)-1,a.beginDate.slice(8,10)) < new Date(b.beginDate.slice(0,4),b.beginDate.slice(5,7)-1,b.beginDate.slice(8,10)))?1:-1);
        }
        if(sortStartDate === -1){
            customers.sort((a,b)=>(new Date(a.beginDate.slice(0,4),a.beginDate.slice(5,7)-1,a.beginDate.slice(8,10)) > new Date(b.beginDate.slice(0,4),b.beginDate.slice(5,7)-1,b.beginDate.slice(8,10)))?1:-1);
        }
        if (key) {
			// console.log(key);
			customers = customers.filter((customer) => {
				
				return customer.name.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					customer.phone.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					customer.ownerId.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
                    customer.address.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					customer.price.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					customer.totalmoney.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					customer.beginDate.slice(0,10).toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					customer.endDate.slice(0,10).toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1 ||
					customer.carName.toString().toLowerCase().indexOf(key.toString().toLowerCase()) !== -1
                    
			})
			
		}
        return (
            <div>
                <OwnerHead owner={this.state.owner} role={this.props.role} id={this.props.role == "admin" ? this.props.match.params.id : -1} />
                <div className="container">
                    <h2 className="text-center p-3">Danh sách đơn hàng</h2>
                    <div className="row">
                        <div className="col">
                            <input type="text" name="searchKey" value={searchKey} onChange={this.onChange} style={styleSearchBox}  />
                            <button style={styleButtonSearch} onClick={() => this.onSearch(searchKey)}>Tìm Kiếm</button>
                        </div>
                        <div className="col">
                            <div className="btn-group" style={{ float: 'right' }}>
                                <button
                                    type="button"
                                    style={styleButtonSearch}
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Lọc theo trạng thái
							</button>
                                <div className="dropdown-menu" >
                                    <a className="dropdown-item" id="all" onClick={this.handleFilter}>Tất cả</a>
                                    <a className="dropdown-item" id="isConfirm" onClick={this.handleFilter}>Đang đợi xác nhận</a>
                                    <a className="dropdown-item" id="isRent" onClick={this.handleFilter}>Đang thuê</a>
                                    <a className="dropdown-item" id="isLose" onClick={this.handleFilter}>Quá hạn</a>
                                    <a className="dropdown-item" id="isPay" onClick={this.handleFilter}>Đã thuê</a>
                                    <a className="dropdown-item" id="isDelete" onClick={this.handleFilter}>Bị hủy</a>
                                </div>
                            </div>
                            <div className="dropdown float-right mr-3" style={{ width: '100px' }}>
                                <button style={styleButtonSearch} className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sắp xếp
                                    </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <a className="dropdown-item" href="#" onClick={(e) => this.onSort(e,"new")}>Mới nhất</a>
                                    <a className="dropdown-item" href="#" onClick={(e) => this.onSort(e,"old")}>Cũ nhất</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" id="owner-order-details">
                    <table className="mt-3">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ nhận</th>
                                <th>Tên xe</th>
                                <th>Ảnh</th>
                                <th>Ngày thuê</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>Đã lấy xe</th>
                                <th>Đã trả xe</th>
                                <th>Xác nhận thuê</th>
                                <th>Hủy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isLoad == true ? customers.map((customer) => {
                                let a = "2019-12-10"
                                let day = new Date();
                                day.setDate(day.getDate() - 2);
                                let color="black";
                                if(new Date(customer.endDate.slice(0, 4), customer.endDate.slice(5, 7) - 1, customer.endDate.slice(8, 10)) < day && customer.isRent == 1 && customer.isPay==0){
                                    color="red";
                                }

                                return <CustomerItem key={customer.rentalId} rental={customer} role={this.props.role} color={color}/>
                            
     }) : null}
                        </tbody>
                        <tfoot />
                    </table>
                </div>
            </div>
        )
    }
}
export default Customer;