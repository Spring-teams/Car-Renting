import React from "react"
import './../../css/ownerHead.css'
import { NavLink } from 'react-router-dom'
class OwnerHead extends React.Component{
    constructor(props){
        super(props);
        this.doLogout=this.doLogout.bind(this);
    }
    doLogout(){
        fetch("/api/ownerLogout")
        window.location.href="/chothuexe";
	}
	getAnalysis=()=>{
		if(this.props.role=="admin"){
			window.location.href="/owner/thong-ke/"+this.props.id;
			
		}
		else {
			window.location.href="/chothuexe/thong-ke";
		}
	}
	handleCustomer=()=>{
		if(this.props.role=="admin"){
			window.location.href="/owner/khach-hang/"+this.props.id;
		}
		else window.location.href="/chothuexe/khach-hang";
	}
    render(){
		
        // let Log = this.props.isOwnerLogin
        return (
			<div id="owner-head">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="container">
						<a className="navbar-brand mr-5" href={this.props.role=="admin"?"/admin":"/chothuexe"} style={{ float: 'left' }}>{this.props.owner.ownerName}</a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-menu-content" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse ml-5" id="nav-menu-content">
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink to='#' onClick={this.handleCustomer}>
										<i className="fas fa-cart-plus" style={{ fontSize: "13px", color:"yellow !important" }}></i> Đơn hàng
							</NavLink>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="anchor" id="loai-xe" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<i className="fas fa-user" style={{ fontSize: "13px",color:"yellow" }}></i> Tài khoản
						</a>
									<div className="dropdown-menu" aria-labelledby="loai-xe">{
										this.props.role=="admin"?"":<NavLink to='#' className="dropdown-item" data-toggle="modal" data-target="#singinModal" onClick={()=>window.location.href="/chothuexe/thong-tin-ca-nhan"}>
										Thông tin cá nhân
									</NavLink>
									}
										
										<NavLink to='#' className="dropdown-item" data-toggle="modal" data-target="#loginModal" onClick={this.getAnalysis}>
											Thống kê
										</NavLink>
										{
										this.props.role=="admin"?"":<NavLink to='#' className="dropdown-item" data-toggle="modal" data-target="#loginModal" onClick={this.doLogout}>
										Đăng xuất
									</NavLink>
									}
										
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

export default OwnerHead;