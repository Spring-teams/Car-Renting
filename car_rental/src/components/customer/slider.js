import React from "react";


class Slider extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="slider">
				<div className="bd-example">
					<div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
						<ol className="carousel-indicators">
							<li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
							<li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
							<li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
							<li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
							<li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
						</ol>
						<div className="carousel-inner">
							<div className="carousel-item active">
								<img src="images/5.png" className="d-block w-100" alt="..."/>
								<div className="carousel-caption d-none d-md-block">
								</div>
							</div>
							<div className="carousel-item">
								<img src="images/2.png" className="d-block w-100" alt="..."/>
								<div className="carousel-caption d-none d-md-block">
								</div>
							</div>
							<div className="carousel-item">
								<img src="images/image/image/2018 MERCEDES S-CLASS.jpg" className="d-block w-100" alt="..."/>
								<div className="carousel-caption d-none d-md-block">
								</div>
							</div>
							<div className="carousel-item">
								<img src="images/image/image/2018 AUDI A3 SEDAN.jpg" className="d-block w-100" alt="..."/>
								<div className="carousel-caption d-none d-md-block">
								</div>
							</div>
							<div className="carousel-item">
								<img src="images/image/image/2018 Honda Civic.jpg" className="d-block w-100" alt="..."/>
								<div className="carousel-caption d-none d-md-block">
								</div>
							</div>
						</div>
				</div>
				</div>
			</div>
        )
    }
}

export default Slider;