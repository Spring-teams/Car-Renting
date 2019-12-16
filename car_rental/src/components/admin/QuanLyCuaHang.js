import React, { Component } from 'react';
import './QuanLyCuaHang.css'
import ItemQLCH from './ItemQLCH';
class QuanLyCuaHang extends Component {
    render() {
        return (
            <div id="quan-ly-cua-hang" className="mt-5">
                <div className="container-fluid">
                    <table className="rwd-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã cửa hàng</th>
                                <th>Tên cửa hàng</th>
                                <th>Số  điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ItemQLCH/>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

export default QuanLyCuaHang;