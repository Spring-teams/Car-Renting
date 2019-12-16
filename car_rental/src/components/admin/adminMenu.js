import React, { Component } from 'react';
import './adminMenu.css';
import {NavLink} from 'react-router-dom'
class adminMenu extends Component {
    render() {
        return (
            
            <div id="ADMIN-MENU">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                            <a className="navbar-brand mr-5" href="/" style={{float:'left'}}>INT3306-4</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-menu-content" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse ml-5" id="nav-menu-content">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to='/'>
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
                            </ul>
                        </div>
                    </div>
                </nav>
            </div >
        );
    }
}

export default adminMenu;