
import React from "react";
import "../css/bootstrap.min.css";
import "../css/Home.css";
class Head extends React.Component{
    constructor(props){
        super(props);
	}
	handleInfo(){
		window.location.href="/info";
	}
	handleLog=()=>{
		if(this.props.isLogin){
			fetch("/api/logout");
			window.location.href=this.props.url;
			
		}
		else window.location.href="/login";
	}
    render(){
		let Log = this.props.isLogin ? "Đăng xuất" : "Đăng nhập";
        return(
        <nav className="navbar navbar-expand-lg navbar-dark" style={{position: "relative"}}>
			<div className="container">
					<a className="navbar-brand" href="/"><img src="/images/image/image/Capture.png" id="logo" alt="" className="img-fluid" /> CarRenting.com</a>
					<button className="navbar-toggler collapsed " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
						<span className="navbar-toggler-icon"></span>
					</button>
				<div className={"navbar-collapse collapse "+this.props.hide} id="navbarSupportedContent">
				    <form className="form-inline my-2 my-lg-0 w-100 ml-4">
						<input className="form-control mx-sm-3 w-60" type="search" placeholder="Search for..." aria-label="Search for..." />
					</form>
					<ul className="navbar-nav ml-auto w-100 ml-5">
						<li className="nav-item active ml-4">
							<a className="nav-link" href="/order" ><i className="fas fa-cart-plus"></i> Đơn hàng<span className="sr-only">(current)</span></a>
						</li>
						<li className="nav-item dropdown active ml-4">
						<a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user"></i>
						Tài khoản</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdown" id="Account">
								<a className="dropdown-item" data-toggle="modal" data-target="#singinModal" onClick={this.handleInfo}>Thông tin cá nhân</a>
								<a className="dropdown-item"  data-toggle="modal" data-target="#loginModal" onClick={this.handleLog}>{Log}</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		)
		}


}

export default Head;


