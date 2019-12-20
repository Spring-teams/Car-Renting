import React from "react";
import { NavLink } from 'react-router-dom'
import "../../css/bootstrap.min.css";
import "./../../css/head.css"
class Head extends React.Component {
	constructor(props) {
		super(props);
	}
	handleInfo() {
		window.location.href = "/info";
	}
	handleLog = () => {
		if (this.props.isLogin) {
			fetch("/api/logout");
			window.location.href = this.props.url;

		}
		else window.location.href = "/login";
	}
	render() {
		let Log = this.props.isLogin ? "Đăng xuất" : "Đăng nhập";
		return (
			<div id="customer-head">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="container">
						<a className="navbar-brand mr-5" href="/" style={{ float: 'left' }}>CarRenting.com</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-menu-content" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse ml-5" id="nav-menu-content">
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink to='/order'>
										<i className="fas fa-cart-plus" style={{ fontSize: "13px", color: "yellow !important" }}></i> Đơn hàng
									</NavLink>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" id="loai-xe" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<i className="fas fa-user" style={{ fontSize: "13px", color: "yellow" }}></i> Tài khoản
									</a>
									<div className="dropdown-menu" aria-labelledby="loai-xe">
										<NavLink to='sport-car' className="dropdown-item" data-toggle="modal" data-target="#singinModal" onClick={this.handleInfo}>
											Thông tin cá nhân
										</NavLink>
										<NavLink to='order-detail' className="dropdown-item" data-toggle="modal" data-target="#loginModal" onClick={this.handleLog}>
											{Log}
										</NavLink>
									</div>
								</li>
								
							</ul>
							
						</div>
					</div>
				</nav>
			</div >
		)
	}


}

export default Head;