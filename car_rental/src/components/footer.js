import React from "react";

class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="footer" className="mt-5">
		<div className="container">
			<div className="row ">

				<div className="col-12 col-md-4 mt-4">
					<p>Đại học Công Nghệ</p>
					<address><i className="fas fa-map-marker-alt"></i>
						  144 Xuân Thủy, Cầu Giấy, Hà Nội
					</address>
					<p><i className="fas fa-phone"></i> Liên hệ: 033 481 5049</p>
					<p className="mt-3"><i className="fas fa-fax"></i>  Fax: 413 546 789 </p>
				</div>
				
			</div>
		</div>
	</div>
        );
    }
}

export default Footer;