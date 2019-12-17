import React from "react";
import CarItem from "./Caritem";
import Modal from "./Dialog";
import Loading from "../dialog/loading";
import UpdateSuccess from "../dialog/UpdateSuccess";
import Confirm from "../dialog/ConfirmDialog";
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
        errorContent:" ",
        showConfirm:"none",
        confirmContent:" asf",
        canDeleteCar: true,
        deletedCarId : "",
    }
    this.componentDidMount=this.componentDidMount.bind(this);
    this.addToggleModal=this.addToggleModal.bind(this);
    this.handleDeleteCar=this.handleDeleteCar.bind(this);
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
  async handleDeleteCar(carId){
    this.setState({
    })
    await fetch("/api/confirmCar/"+carId)
    .then(res=>res.text())
    .then(data=>{
      if(data=="false"){
        this.setState({
          confirmContent:"Bạn có chắc chẵn muốn xóa xe "+carId,
          canDeleteCar: false,
          deletedCarId: carId

        })
      }
      else {
        this.setState({
          confirmContent:"Bạn không thể xóa xe này do đang trong quá trình thuê !",
          canDeleteCar: true,
          deletedCarId: carId

        })
      }
    })
    this.setState({
      showConfirm: "block"
    })
  }
  closeDeleteCar=()=>{
    this.setState({
      showConfirm: "none"
    })
    
  }
  handleList=(event)=>{
    let listCar = JSON.parse(JSON.stringify(this.state.carItems));
    if(event.target.id=="inorder"){
      listCar.sort((a,b)=>(a.price>b.price)?1:-1);
      this.setState({
        carItems: listCar
      })
    }
    else if(event.target.id="postorder"){
      listCar.sort((a,b)=>(a.price<b.price)?1:-1);
      this.setState({
        carItems: listCar
      })
    }
    else if (event.targte.id=="newest"){
      listCar.sort((a,b)=>(new Date(a.createTime.slice(0,4),a.createTime.slice(5,7)-1,a.createTime.slice(8,10)) > new Date(b.createTime.slice(0,4),b.createTime.slice(5,7)-1,b.createTime.slice(8,10)))?1:-1);
      this.setState({
        carItems: listCar
      })
    }
  }
  render() {
    
    let owner = this.props.owner;
    let renderedCar= typeof this.state.carItems=="undefined" || this.props.cars=="" ?"Bạn chưa có xe cho thuê!":this.state.carItems.map((car)=><CarItem car = {car} toggleModal = {this.toggleModal}  deleteCar = {this.handleDeleteCar} role = {this.props.role}/>)
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
              disabled={this.props.role=="admin"? true: false}
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
              <button className="dropdown-item" type="button" id="newest" onClick={this.handleList}>
                  Mới nhất
                </button>
                <button className="dropdown-item" type="button" id="inorder" onClick={this.handleList}>
                  Giá thấp đến cao
                </button>
                <button className="dropdown-item" type="button" id="postorder" onClick={this.handleList}>
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
        <Confirm 
        show = {this.state.showConfirm} 
        content = {this.state.confirmContent}
        close = {this.closeDeleteCar}
        canDeleteCar={this.state.canDeleteCar}
        deletedCarId={this.state.deletedCarId}
        url ="/chothuexe"
        />

      </div>
    );
  }
}

export default CarList;
