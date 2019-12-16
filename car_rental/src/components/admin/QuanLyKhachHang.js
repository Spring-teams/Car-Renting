import React, { Component } from 'react';
import './QuanLyKhachHang.css'
import ItemQLKH from './ItemQLKH';
class QuanLyKhachHang extends Component {
    constructor(props) {
        super(props);
        this.state = {status: 0};
      }
    render() {
        return (
            <div id="quan-ly-khach-hang" className="mt-5">
                <div className="container-fluid">
                    <table className="rwd-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã khách hàng</th>
                                <th>Tên khách hàng</th>
                                <th>Số  điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ItemQLKH/>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

export default QuanLyKhachHang;