import React, { Component } from 'react';
import './QuanLyKhachHang.css'
import ItemQLKH from './ItemQLKH';
class QuanLyKhachHang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            customers:[]
        };
      }
    componentDidMount=()=>{
        fetch("/api/admin/getAllCustomer")
        .then((res)=>res.json())
        .then((res)=>{
            
            this.setState({
                customers: res
            })
        })
    }

    render() {
        let rendered = this.state.customers.length==0?" ":this.state.customers.map((customer,index)=><ItemQLKH customer={customer} index = {index}/>)
        return (
            <div id="quan-ly-khach-hang" className="mt-5">
                <h2 className="text-center p-3">Quản lý khách hàng</h2>
                <div className="container-fluid">
                    <table className="rwd-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã khách hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Số  điện thoại</th>
                                <th>Ngày sinh</th>
                                <th>Email</th>
                                <th>Công ty</th>
                                
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rendered}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

export default QuanLyKhachHang;