import React from "react";
import CarItem from "./Caritem";
import Modal from "./Dialog";
import Loading from "../dialog/loading";
import UpdateSuccess from "../dialog/UpdateSuccess";
// import "../../css/boostrap.min.css";
class CarList extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        carItems:[],
        isOpen: false,
        selectedCar:{},
        showLoading: "none",
        showSuccess: false,
        showError: " ",
        errorContent:" "
    }
    this.componentDidMount=this.componentDidMount.bind(this);
    this.addToggleModal=this.addToggleModal.bind(this);
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

    if(this.state.isOpen==true){
      this.setState({
        showError: " "
      })
    }
    this.setState({
      isOpen: !this.state.isOpen,
      selectedCar: car
    });
    
    
    // console.log(car)
  }
  showError=(content)=>{
    this.setState({showError: " show",errorContent:content});
  }
  closeError=()=>{
    this.setState({showError: " "});
  }
  addToggleModal(){
    this.setState({
      isOpen: !this.state.isOpen,
      selectedCar: {"categoryName":"Xe du lịch","categoryId":1,"numberSeat":2,"branch":"Mercedes"}
    })
  }
  openLoading=()=>{
    this.setState({
      showLoading: "block"
    })
  }
  closeLoading=()=>{
    this.setState({
      showLoading: "none",
      showSuccess: true
    })
  }
  render() {
    
    let owner = this.props.owner;
    let renderedCar= typeof this.state.carItems=="undefined"?" ":this.state.carItems.map((car)=><CarItem car = {car} toggleModal = {this.toggleModal}/>)
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-8" id="seach-box">
            <h5>
              Tên : <span>{typeof owner =="undefined"?"": owner.ownerName}</span>
            </h5>
            <p>SĐT: {typeof owner =="undefined"?"": owner.phone}</p>
            {/* <p>Địa chỉ: Hà Nội</p> */}
          </div>
          <div className="col-4 " id="add-sort" style={{ float: "right" }}>
            <button
              className="btn btn-success mr-3"
              data-toggle="modal"
              data-target="#add"
              onClick = {()=>this.addToggleModal("")}
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
        <Modal show={this.state.isOpen} 
        onClose={this.toggleModal} 
        car ={this.state.selectedCar} 
        openLoading={this.openLoading}
        closeLoading={this.closeLoading}
        showError={this.showError}
        closeError={this.closeError}
         >
        Here's some content for the modal
        </Modal>
        <Loading show={this.state.showLoading}/>
        <UpdateSuccess show ={this.state.showSuccess} url ={"/chothuexe"}/>
        <div className={"id-error "+this.state.showError} style={{color: "red", backgroundColor: "white"}}>
    <p>{this.state.errorContent}</p>
        </div>
      </div>
    );
  }
}

export default CarList;
