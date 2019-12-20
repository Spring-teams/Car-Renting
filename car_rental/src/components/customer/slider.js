import React from "react";


class Slider extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="slider" className="mt-1">
				<div className="bd-example">
					<div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
						<div className="carousel-inner">
							<div className="carousel-item active">
								<img src="images/5.png" className="d-block w-100" alt="..." />
							</div>
							<div className="carousel-item">
								<img src="images/2.png" className="d-block w-100" alt="..." />
							</div>
							<div className="carousel-item">
								<img
									src="images/image/image/2018 MERCEDES S-CLASS.jpg"
									className="d-block w-100"
									alt="..."
								/>
							</div>
							<div className="carousel-item">
								<img
									src="images/image/image/2018 AUDI A3 SEDAN.jpg"
									className="d-block w-100"
									alt="..."
								/>
							</div>
							<div className="carousel-item">
								<img
									src="images/image/image/2018 Honda Civic.jpg"
									className="d-block w-100"
									alt="..."
								/>
							</div>
						</div>
						<a
							style={{background:'#6c757d', width:"5%", height:'20%', top:'50%',left:'3%', transform:'translate(-50%, -50%)'}}
							className="carousel-control-prev"
							href="#carouselExampleFade"
							role="button"
							data-slide="prev"
						>
							<span className="carousel-control-prev-icon" aria-hidden="true" />
							<span className="sr-only">Previous</span>
						</a>
						<a
							style={{background:'#6c757d', width:"5%", height:'20%', top:'50%',right:'-2%', transform:'translate(-50%, -50%)'}}
							className="carousel-control-next"
							href="#carouselExampleFade"
							role="button"
							data-slide="next"
						>
							<span className="carousel-control-next-icon" aria-hidden="true" />
							<span className="sr-only">Next</span>
						</a>
					</div>
				</div>
			</div>
        )
    }
}

export default Slider;