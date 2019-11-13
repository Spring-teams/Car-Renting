import React from "react";
import CarItem from "./car";
import "../css/bootstrap.min.css";

class CarTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: [{}]
    };
    this.componentDidMount = this.componentDidMount.bind(this);
	this.resetCars = this.resetCars.bind(this);
	this.componentDidUpdate=this.componentDidUpdate.bind(this);
  }
  async componentDidMount() {
    await fetch("/api/getallcar", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          object: data
        });
      });
  }
  componentDidUpdate(prevProps) {
	if(JSON.stringify(prevProps.condition)==JSON.stringify(this.props.condition)){
		return ;
	}
    let con = this.props.condition;
    let obj = {};
    
    if (JSON.stringify(con)!="{}") {
      console.log(con);
      console.log(
        "/api/searchCar/" +
          (con["branch"]==""||con['branch']=="Tất cả"?"no":con['branch']) +
          "/" +
          (con["category"]==""||con['category']=="Tất cả"?"no":con['category']) +
          "/" +
          (con["numberSeat"]==""||con['numberSeat']=="Tất cả"?"no":con['numberSeat'])
      );
      fetch(
        "/api/searchCar/" +
          (con["branch"]==""||con['branch']=="Tất cả"?"no":con['branch']) +
          "/" +
          (con["category"]==""||con['category']=="Tất cả"?"no":con['category']) +
          "/" +
          (con["numberSeat"]==""||con['numberSeat']=="Tất cả"?"no":con['numberSeat']),
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(data => {
			console.log(data);
          this.setState({object: data});
		  // this.resetCars(data);
		  
        });
    }
  }
  resetCars(data) {}
  render() {
    const listCar = this.state.object.map((carItem,key) => <CarItem car={carItem} key={key}/>);
    return (
      <div className="container" id="wrapper-xtt">
        <div id="XeTheThao" className=" mt-2">
          {listCar}
          <div
            style={{ width: "97%", margin: " 0 auto", position: "relative" }}
          >
            <div className="container pagination-style">
              <nav
                aria-label="..."
                className="mt-3 "
                style={{ position: "absolute", right: 0 }}
              >
                <ul className="pagination">
                  <li className="page-item disabled">
                    <span className="page-link"> </span>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item " aria-current="page">
                    <span className="page-link">2</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      5
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      {" "}
                      >{" "}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarTable;
