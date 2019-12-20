import React, { Component } from 'react';
import './adminMenu.css';
import {NavLink} from 'react-router-dom'
import Login from "../login";
class adminMenu extends Component {
    constructor(props){
        super(props);
       
    }
    doLogout=(e)=>{
        e.preventDefault();
        fetch("/api/admin/dologout")
        .then(res=>res.text())
        .then(data=>{
            if(data=="true"){
                window.location.href="/admin";
            }
        })
    }
    
    render() {
        
        return (
            
            <div id="ADMIN-MENU">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                            <a className="navbar-brand mr-5" href="/admin" style={{float:'left'}}>ADMIN</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-menu-content" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse ml-5" id="nav-menu-content">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to='/admin'>
                                        Trang chủ
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/admin/quan-ly-khach-hang'>
                                        Quản lý khách hàng
                                </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/admin/quan-ly-cua-hang'>
                                        Quản lý cửa hàng
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink onClick={(e)=>this.doLogout(e)} to = "/">
                                        Đăng xuất
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div >
        );
    }
}

export default adminMenu;