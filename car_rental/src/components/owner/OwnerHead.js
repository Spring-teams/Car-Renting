import React from "react"

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
            <nav className="navbar navbar-expand-lg navbar-dark" style={{position: "relative"}}>
			<div className="container">
					<a className="navbar-brand" href="/chothuexe"><img src="/images/image/image/Capture.png" id="logo" alt="" className="img-fluid" /> CarRenting.com</a>
					<button className="navbar-toggler collapsed " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
						<span className="navbar-toggler-icon"></span>
					</button>
				<div className={"navbar-collapse collapse "+this.props.hide} id="navbarSupportedContent">
				    <form className="form-inline my-2 my-lg-0 w-100 ml-4">
						<input className="form-control mx-sm-3 w-60" type="search" placeholder="Search for..." aria-label="Search for..." />
					</form>
					<ul className="navbar-nav ml-auto w-100 ml-5">
						<li className="nav-item active ml-4">
							<a className="nav-link" onClick={this.handleCustomer}><i className="fas fa-users" ></i> Danh sách đơn hàng<span className="sr-only">(current)</span></a>
						</li>
						<li className="nav-item dropdown active ml-4">
						<a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user"></i>
						 Tài khoản</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdown" id="Account">
								{this.props.role=="admin"?" ":<a className="dropdown-item" data-toggle="modal" data-target="#singinModal" onClick={()=>window.location.href="/chothuexe/thong-tin-ca-nhan"}>Thông tin cá nhân</a>}
								<a className="dropdown-item"  data-toggle="modal" onClick={this.getAnalysis}>Thống kê</a>
								{this.props.role=="admin"?" ":<a className="dropdown-item"  data-toggle="modal" data-target="#loginModal" onClick={this.doLogout}>Đăng xuất</a>}
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
        )
    }
}

export default OwnerHead;