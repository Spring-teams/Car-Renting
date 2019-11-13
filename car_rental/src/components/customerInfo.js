import React from "react";
import Head from "./head";
import "../css/Home.css";
import { NONAME } from "dns";
import DatePicker from "react-datepicker";
import UpdateSuccess from "./dialog/UpdateSuccess";
class CustomerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerInfo: "",
      show: "none",
      readOnly: true,
      old_info: {},
      birthday: new Date(),
      showSuccessDialog: false,
      warning:{}
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.openButton = this.openButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeButton = this.closeButton.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleId = this.handleId.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleBirthDay = this.handleBirthDay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showDialogSuccess=this.showDialogSuccess.bind(this);
    this.validInput=this.validInput.bind(this);
  }
  componentDidMount() {
    fetch("/api/getCurrentCustomer/")
      .then(res => res.json())
      .then(data => {
        this.setState({
          customerInfo: data[0],
          old_info: data[0]
        });
      });
      let obj = {
        "name": 0,
        "customerId":0,
        'birthday':0,
        'email':0,
        'pass':0,
        'companyName':0,
        'phone':0
      }
      this.setState({
        warning: obj
      })
  }
  validInput(){
    let obj = this.state.customerInfo;
    let warning=this.state.warning;
    let isOk=true;
    for(let proper in obj){
      if(obj[proper]=="" && warning.hasOwnProperty(proper)){
        warning[proper]=1;
        isOk=false;
      }
    }
    this.setState({
      warning: warning
    })
    return isOk;
  }

  showDialogSuccess(){
    this.setState({
      showSuccessDialog: true
    })
  }
  openButton() {
    this.setState({
      show: "block",
      readOnly: false
    });
  }
  closeButton() {
    this.setState({
      show: "none",
      readOnly: true,
      customerInfo: this.state.old_info
    });
  }
  handleEdit() {
    this.openButton();
  }
  handleName(event) {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["name"] = event.target.value;
    let warning=JSON.parse(JSON.stringify(this.state.warning))
    if(event.target.value!=""){
      warning['name']=0
    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  }
  handleId(event) {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["customerId"] = event.target.value;
    let warning=JSON.parse(JSON.stringify(this.state.warning))
    if(event.target.value!=""){
      warning['customerId']=0
    }
    this.setState({
      customerInfo: obj
    });
  }
  handleBirthDay(event) {
    this.setState({
      birthday: event
    });
    let e = new Date(event);
    let begin = new Date(e.getFullYear(), e.getMonth(), e.getDate());
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["birthday"] = formatDate(begin);
    this.setState({
      customerInfo: obj
    });
  }
  handleEmail(event) {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["email"] = event.target.value;
    let warning=JSON.parse(JSON.stringify(this.state.warning))
    if(event.target.value!=""){
      warning['email']=0
    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  }
  handlePass(event) {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["pass"] = event.target.value;
    let warning=JSON.parse(JSON.stringify(this.state.warning))
    if(event.target.value!=""){
      warning['pass']=0
    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  }
  handleCompany(event) {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["companyName"] = event.target.value;
    let warning=JSON.parse(JSON.stringify(this.state.warning))
    if(event.target.value!=""){
      warning['companyName']=0
    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  }
  handlePhone(event) {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["phone"] = event.target.value;
    let warning=JSON.parse(JSON.stringify(this.state.warning))
    if(event.target.value!=""){
      warning['phone']=0
    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  }
  handleSubmit() {
    if(!this.validInput()){
      return ;
    }
    let data = this.state.customerInfo;
    data["old_id"] = this.state.old_info["customerId"];

    fetch("/api/updateCustomer", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res=>res.text())
    .then(data=>{
      if(data=='true'){
        this.showDialogSuccess();
      }
    })
    console.log(data);
  }
  render() {
    let customer = this.state.customerInfo;
    return (
      <div>
        <Head isLogin={this.props.isLogin} />
        <div className="info-container">
          <i className="fas fa-edit icon" onClick={this.handleEdit}></i>
          <h2>Thông tin cá nhân</h2>
          <div className="customer-info-wrapper">
            <div className="label">Họ và tên: </div>
            <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="name"
              value={customer.name}
              onChange={this.handleName}
            />
            <span className="warning" style={{opacity: this.state.warning['name']}}></span>
            <font></font>
          </div>
          <div className="customer-info-wrapper">
            <div className="label">Số CMND: </div>
            <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="customerId"
              value={customer.customerId}
              onChange={this.handleId}
            />
            <span className="warning" style={{opacity: this.state.warning['customerId']}}></span>
          </div>
          <div className="customer-info-wrapper birthday">
            <div className="label">Ngày sinh: </div>
            <DatePicker
              className="must-fill"
              selected={this.state.birthday}
              onChange={this.handleBirthDay}
              dateFormat="yyyy-MM-dd"
              timeCaption="Heure"
              showDisabledMonthNavigation
            />
            {/* <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="birthday"
              value={customer == "" ? "" : customer.birthday.slice(0, 10)}
            /> */}
            <span className="warning" style={{opacity: this.state.warning['birthday']}}></span>
          </div>
          <div className="customer-info-wrapper">
            <div className="label">Email: </div>
            <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="email"
              value={customer.email}
              onChange={this.handleEmail}
            />
            <span className="warning" style={{opacity: this.state.warning['email']}}></span>
          </div>
          <div className="customer-info-wrapper">
            <div className="label">Mật khẩu: </div>
            <input
              type="password"
              readOnly={this.state.readOnly}
              className="must-fill"
              name="pass"
              value={customer.pass}
              onChange={this.handlePass}
            />
            <span className="warning" style={{opacity: this.state.warning['pass']}}></span>
          </div>
          {/* <div className="customer-info-wrapper">
          <div>Nhập lại mật khẩu: </div>
          <input type="password" readOnly className="must-fill" value={customer.pass} />
          <span className="warning"></span>
        </div> */}

          <div className="customer-info-wrapper">
            <div className="label">Công ty: </div>
            <input
              readOnly={this.state.readOnly}
              name="companyName"
              value={customer.companyName}
              onChange={this.handleCompany}
            />
            <span className="warning" style={{ opacity: this.state.warning['companyName'] }}></span>
          </div>
          <div className="customer-info-wrapper">
            <div className="label">Số điện thoại </div>
            <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="phone"
              value={customer.phone}
              onChange={this.handlePhone}
            />
            <span className="warning" style={{opacity: this.state.warning['phone']}}></span>
          </div>
          <div className="info-button-wrapper">
            <button
              className="update-info-discard"
              style={{ display: this.state.show }}
              onClick={this.closeButton}
            >
              Bỏ qua
            </button>
            <button
              className="update-info-save"
              style={{ display: this.state.show }}
              onClick={this.handleSubmit}
            >
              Lưu
            </button>
          </div>
        </div>
        <UpdateSuccess show = {this.state.showSuccessDialog} url="/info"/>
      </div>
    );
  }
}
function formatDate(date) {
  let temp = date;

  let a = temp.getDate() > 9 ? temp.getDate() : "0" + temp.getDate();
  return temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + a;
}

export default CustomerInfo;
