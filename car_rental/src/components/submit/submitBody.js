import React from "react";
import Head from "../head";
import Footer from "../footer";
import DatePicker from "react-datepicker";
import UpdateSuccess from "../dialog/UpdateSuccess";
import "../../css/bootstrap.min.css";
import "../../css/submit.css";
import "../../css/Home.css";

class SubmitBody extends React.Component {
  constructor(props) {
    super(props);
    let a = new Date();
    this.state = {
      car: {price:0},
      isLogin: true,
      beginDate: new Date(),
      address: "",
      customer:{},
      endDate: new Date(a.getTime()+60 * 60 * 24 * 1000),
      totalMoney:0,
      diffDate: 1,
      showUpdateSuccess: false
    };
    // console.log(this.props.match.params.id);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setBeginDate = this.setBeginDate.bind(this);
    this.getCurrentCustomer=this.getCurrentCustomer.bind(this);
    this.setEndDate=this.setEndDate.bind(this);
    this.handleAddress=this.handleAddress.bind(this);
    this.calcMoney=this.calcMoney.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.openUpdateSuccessDialog=this.openUpdateSuccessDialog.bind(this);
  }
  componentDidMount() {
    fetch("/api/getcarbyid/" + this.props.match.params.id + "/", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ car: data[0] });
        
      });
    this.getCurrentCustomer();

  }
  componentWillMount(){
    fetch("/api/checkLogin")
    .then(res=>res.text())
    .then((data)=>{
      if(data=="true"){
        this.setState({isLogin: true});
      }
      else this.setState({isLogin: false});
    })
  }
  openUpdateSuccessDialog(){
    this.setState({
      showUpdateSuccess: true
    })
  }
  getCurrentCustomer(){
    fetch("/api/getCurrentCustomer")
    .then(res=>res.json())
    .then((data)=>{
      this.setState({customer: data[0]});
      
    });

  }
  setBeginDate(e) {
   
    this.setState({beginDate: e},()=>{
      this.calcMoney();
    });
    
  }

  setEndDate(e){
    
    this.setState({endDate: e},()=>{
    this.calcMoney();
    });
  }
  handleAddress(event){
    this.setState({address: event.target.value});
  }
  calcMoney(){
    let begin=new Date(this.state.beginDate);
    let end= new Date(this.state.endDate);
    
    begin=new Date(begin.getFullYear(),begin.getMonth(),begin.getDate());
    end= new Date(end.getFullYear(),end.getMonth(),end.getDate());
    let diffDate=Math.abs(end-begin)/(1000*60*60*24);
    let price=diffDate*this.state.car.price;
    this.setState({totalMoney: price});
    this.setState({diffDate: diffDate});
    
  }
  handleSubmit(){
    let rental={};
    rental['customerId']=this.state.customer.customerId;
    rental['carId']=this.state.car.carId;
    rental['ownerId']=this.state.car.ownerId;
    rental['beginDate']=formatDate(this.state.beginDate);
    rental['endDate']=formatDate(this.state.endDate);
    rental['isRent']=0;
    rental['isPay']=0;
    rental['isConfirm']=0;
    rental['address']=this.state.address;
    rental['totalMoney']=this.state.totalMoney;
    console.log(rental);
    fetch("/api/addrental/",{
      method: "POST",
      headers:{
        'Accept': "*/*",
        "Content-Type":"application/json"
      },
      body: JSON.stringify(rental)
    })
    .then(res=>res.text())
    .then((data)=>{
      if(data=='true'){
        this.openUpdateSuccessDialog();
      }
    })
    .catch(function(error){
      console.log(error);
    })
  }
  render() {
    let car = this.state.car;
   
    if(this.state.isLogin==false){
      window.location.href="/login";
      return ;
    }

    return (
      <div>
        <Head isLogin={this.state.isLogin} hide={"hide"} handleLog={this.props.handleLog}/>
        <div className="text-center mt-3" style={{ color: "blue" }}>
          <h3>{car.carName}</h3>
        </div>
        <div className="container mt-4">
          <div className="slider-description">
            <div className="row pt-5 pb-2" id="slider-des">
              <div className="col-xl-8 col-lg-12 col-md-12">
                <div className="slider-wrapper " style={{ margin: "0 auto" }}>
                  <div
                    className="swiper-container gallery-top image-class"
                    style={{
                      backgroundImage: 'url("/images/' + car.image + '")'
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12">
                <div id="des-car">
                  <p>
                    <i className="fas fa-tag"></i>
                    <font> Loại xe: {car.categoryName}</font>
                  </p>
                  <p>
                    <i className="fas fa-car"></i>
                    <font> Hãng xe: {car.branch}</font>
                  </p>
                  <p>
                    <i className="far fa-square"></i>
                    <font> Biển số: {car.carId}</font>
                  </p>
                  <p>
                    <i className="fas fa-adjust"></i> Giới hạn: 250 km/ngày
                  </p>
                  <p>
                    <i className="fas fa-car"></i>
                    <font> Chủ xe: {car.ownerName}</font>
                  </p>
                  <p>
                    <i className="fas fa-couch"></i>
                    <font> Số ghế: {car.numberSeat}</font>
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "blue",
                      fontWeight: "bold"
                    }}
                  >
                    <i className="fas fa-dollar-sign"></i>
                    <font> Giá: {formatNumber(this.state.car.price)} Đ/Ngày</font>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-box">
            <h5>Lưu ý</h5>
            <div id="description-car" className="mt-1 pb-3">
              <div style={{ width: "90%", margin: "0 auto" }}>
                <b>Ghi chú thuê xe:</b>
                <p>1. Giá trên chưa bao gồm xăng dầu, cầu phà, bến bãi.</p>
                <p>
                  2. Giá do đưa ra chưa bao gồm Thuế VAT và chi phí phát sinh
                  ngoài chương trình
                </p>
                <p>
                  3. Giá trên có thể thay đổi theo từng thời điểm. Hãy gọi ngay
                  về phòng điều hành để được tư vấn và báo giá nhanh nhất, chính
                  xác nhất theo hành trình mà Quý khách có nhu cầu. Xin chân
                  thành cảm ơn và rất mong được sự hợp tác.
                </p>
                <br />
              </div>
            </div>
          </div>

          <div className="border-box">
            <h5>Địa địa chỉ nhận xe</h5>
            <div id="DiaChiNhanXe">
              <div className="mt-1 pb-3">
                <div
                  className="text-center"
                  id="customerInput"
                  style={{ width: "90%", margin: "0 auto", paddingTop: "15px" }}
                >
                  <textarea name="" id="address" onChange={this.handleAddress}></textarea>
                  <div className="row mt-2">
                    <div className="col-xl-6 col-lg-12 col-md-12 mt-2">
                      <div style={{ display: "flex" }} id="first-day">
                        <h6 className="ml-3">Ngày nhận xe : </h6>
                        <DatePicker
                          selected={this.state.beginDate}
                          onChange={this.setBeginDate}
                          dateFormat="yyyy-MM-dd"
                          timeCaption="Heure"
                          minDate={new Date()}
                          showDisabledMonthNavigation
                        />
                        
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 mt-2">
                      <div style={{ display: "flex" }} id="last-day">
                        <h6 className="ml-3">Ngày trả xe : </h6>
                        <DatePicker
                          selected={this.state.endDate}
                          onChange={this.setEndDate}
                          dateFormat="yyyy-MM-dd"
                          timeCaption="Heure"
                          minDate={new Date(this.state.beginDate.getTime()+60 * 60 * 24 * 1000)}
                          showDisabledMonthNavigation
                        />
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-box">
            <h5>Đơn giá xe</h5>
            <div className="mt-1" style={{ padding: "15px 0px" }}>
              <div className="DonGiaXe">
                <div className="DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>Loại xe</p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }}>{this.state.car.branch}</p>
                  </div>
                </div>
                <div className="DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>Số ghế</p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }}>{this.state.car.numberSeat}</p>
                  </div>
                </div>
                <div className="DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>Đơn giá</p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }}>{formatNumber(this.state.car.price)}</p>
                  </div>
                </div>
                <div className="DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>Số ngày</p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }} id="total-day">
                      {this.state.diffDate}
                    </p>
                  </div>
                </div>
                <div className="DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>Thành tiền</p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }} id="total">
                    {formatNumber(this.state.diffDate * this.state.car.price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-box">
            <h5>Thông tin khách hàng</h5>
            <div className="mt-3 pb-3">
              <div id="submit-customer-info">
                <div className="name DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>
                      <i className="fas fa-user-circle"></i> Tên khách hàng
                    </p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }}> {this.state.customer.name}</p>
                  </div>
                </div>
                <div className="name DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>
                      <i className="fas fa-user-circle"></i> Số CMND
                    </p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }}> {this.state.customer.customerId}</p>
                  </div>
                </div>
                <div className="name DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>
                      <i className="fas fa-user-circle"></i> Số điện thoại
                    </p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }}> {this.state.customer.phone}</p>
                  </div>
                </div>
                <div className="name DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>
                      <i className="fas fa-user-circle"></i> Ngày sinh:
                    </p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right" }}> {this.state.customer.birthday==null ?"":this.state.customer.birthday.slice(0,10)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-box">
            <h5></h5>
            <div className="mt-3 pb-3">
              <div id="DonGiaXe">
                <div className="DonGiaXe-row">
                  <div className="w-50 float-left">
                    <p>
                      <i className="fas fa-money-check-alt"></i> Tổng tiền
                    </p>
                  </div>
                  <div className="w-50  float-right">
                    <p style={{ float: "right", color: "red" }} id="all-total">
                      {formatNumber(this.state.totalMoney)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="container mt-3" style={{ height: "70px" }}>
          <div style={{ width: "100%", margin: "0 auto" }}>
            <button type="text" id="submit" onClick={this.handleSubmit}>
              Tiếp tục
            </button>
          </div>
        </div>
        <UpdateSuccess show={this.state.showUpdateSuccess} url="/order"/>
        <Footer />
      </div>
    );
  }
}
function formatNumber(num) {
  if(num==null) return ;
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function formatDate(date){
  let temp = date;
  
  let a = temp.getDate()>9? temp.getDate():"0"+temp.getDate();
  return temp.getFullYear()+"-"+(temp.getMonth()+1)+"-"+a;
}
export default SubmitBody;
