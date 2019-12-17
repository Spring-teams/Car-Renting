import React, { Component } from 'react';
import './QuanLyCuaHang.css'
import ItemQLCH from './ItemQLCH';
class QuanLyCuaHang extends Component {

    constructor(props){
        super(props);
        this.state={
            owners:[]
        }
    }
    componentDidMount=()=>{
        fetch("/api/admin/getAllOwner")
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                owners: res
            })
        })
    }
    render() {
        let rendered= this.state.owners.size==0 ?" " : this.state.owners.map((owner,index)=><ItemQLCH owner={owner} index={index}/>)
        return (
            <div id="quan-ly-cua-hang" className="mt-5">
                <div className="container-fluid">
                    <table className="rwd-table">
                        <thead>
                        <tr>
                                <th>STT</th>
                                <th>Mã chủ xe</th>
                                <th>Tên chủ xe</th>
                                <th>Số điện thoại</th>
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

export default QuanLyCuaHang;