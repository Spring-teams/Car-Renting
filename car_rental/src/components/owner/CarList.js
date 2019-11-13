import React from "react";
import CarItem from "./Caritem";
import Modal from "./Dialog";
// import "../../css/boostrap.min.css";
class CarList extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        carItems:[],
        isOpen: false,
        selectedCar:{}
    }
    this.componentDidMount=this.componentDidMount.bind(this);
    // this.toggleModal = this.toggleModal.bind(this);
  }
  componentDidMount(){
    if(typeof this.props.owner !="undefined"){
        fetch("/api/getCarByOwnerId/"+this.props.owner.ownerId)
    .then((res)=>res.json())
    .then((data)=>{
        this.setState({
            carItems: data
        })
    })

    }
    // console.log(this.props.ow)
    
  }
  toggleModal = (car) => {
    this.setState({
      isOpen: !this.state.isOpen,
      selectedCar: car
    });
    // console.log(car)
  }
  render() {
    let owner = this.props.owner;
    let renderedCar= this.state.carItems.map((car)=><CarItem car = {car} toggleModal = {this.toggleModal}/>)
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-8" id="seach-box">
            <h5>
              Tên : <span>{owner.ownerName}</span>
            </h5>
            <p>SĐT: {owner.phone}</p>
            {/* <p>Địa chỉ: Hà Nội</p> */}
          </div>
          <div className="col-4 " id="add-sort" style={{ float: "right" }}>
            <button
              className="btn btn-success mr-3"
              data-toggle="modal"
              data-target="#add"
              onClick = {()=>this.toggleModal("")}
            >
              Thêm xe
            </button>
            <div className="dropdown">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="account"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sắp xếp
              </button>
              <div className="dropdown-menu" aria-labelledby="account">
                <button className="dropdown-item" type="button">
                  Mới nhất
                </button>
                <button className="dropdown-item" type="button">
                  Giá thấp đến cao
                </button>
                <button className="dropdown-item" type="button">
                  Giá cao đến thấp
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="text-center mt-2">
          <thead>
            <tr>
              <th>Tên xe</th>
              <th>Ảnh</th>
              <th>Thông tin xe</th>
              <th>Sửa - Xóa</th>
            </tr>
          </thead>
          <tbody>
            {renderedCar}
          </tbody>
        </table>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} car ={this.state.selectedCar}>
        Here's some content for the modal
        </Modal>
      </div>
    );
  }
}

export default CarList;
