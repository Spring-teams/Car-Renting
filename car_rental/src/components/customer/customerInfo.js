import React from "react";
import Head from "./head";
import "../../css/Home.css";
import { NONAME } from "dns";
import DatePicker from "react-datepicker";
import UpdateSuccess from "../dialog/UpdateSuccess";
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
      warning: {},
      openIdError: " ",
      errorContent:"ID đã được sử dụng",
      defaultWarning:{}
    };
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.validInput=this.validInput.bind(this);
  }
  componentDidMount = () => {
    fetch("/api/getCurrentCustomer/")
      .then(res => res.json())
      .then(data => {
        this.setState({
          customerInfo: data[0],
          old_info: data[0]
        });
      })
      .then(() => {
        let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
        obj["birthday"] = new Date(
          obj["birthday"].slice(0, 4),
          parseInt(obj["birthday"].slice(5, 7)) < 10
            ? parseInt(obj["birthday"].slice(5, 7)) - 1
            : "0" + (parseInt(obj["birthday"].slice(5, 7)) - 1),
          parseInt(obj["birthday"].slice(8, 10)) + 1 < 10
            ? parseInt(obj["birthday"].slice(8, 10)) + 1
            : "0" + (parseInt(obj["birthday"].slice(8, 10)) + 1)
        );
        this.setState({
          OwnerInfo: obj,
          isload: true,
          birthday: obj["birthday"]
        });
        // console.log(obj['birthday'].slice(0,4) +" "+ obj['birthday'].slice(5,7) +" "+obj['birthday'].slice(8,10))
      });
    let obj = {
      name: 0,
      customerId: 0,
      birthday: 0,
      email: 0,
      pass: 0,
      companyName: 0,
      phone: 0
    };
    this.setState({
      warning: obj,
      defaultWarning:JSON.parse(JSON.stringify(obj))
    });
  };
  componentWillMount() {
    fetch("/api/checkLogin")
      .then(res => res.text())
      .then(data => {
        if (data == "false") {
          window.location.href = "/login";
        }
      });
  }
  async validInput(){
    let obj = this.state.customerInfo;
    let warning = this.state.warning;
    let isOk = true;
    
    
    this.setState({
      warning: warning
    });
    if (this.state.customerInfo["customerId"] != this.state.old_info["customerId"]) {
      await fetch("/api/customer/checkExist/" + this.state.customerInfo["customerId"])
        .then(res => res.text())
        .then(data => {
          if (data == "true") {
            this.setState({ openIdError: "show" , errorContent:"ID đã được sử dụng"});
            isOk = false;
          } else this.setState({ openIdError: " " });
        })
        .then(()=>{
          return isOk;
        })
    }
    if(!phoneValidate(obj['phone'])){
      isOk=false;
      warning['phone']=1;
      
        this.setState({
          errorContent: "Định dạng điện thoại không hợp lệ",
          openIdError: "show"
        })
    }
    for (let proper in obj) {
      if (obj[proper] == "" && warning.hasOwnProperty(proper)) {
        warning[proper] = 1;
        isOk = false;
        this.setState({
          errorContent: "Bạn phải nhập các trường có dấu *",
          openIdError: "show"
        })
      }
    }
    return isOk;
  };

  showDialogSuccess = () => {
    this.setState({
      showSuccessDialog: true
    });
  };
  openButton = () => {
    this.setState({
      show: "inline",
      readOnly: false
    });
  };
  closeButton = () => {
    let obj = JSON.parse(JSON.stringify(this.state.old_info))
    obj["birthday"] = new Date(obj['birthday'].slice(0,4),parseInt(obj['birthday'].slice(5,7))<10?parseInt(obj['birthday'].slice(5,7))-1:"0"+(parseInt(obj['birthday'].slice(5,7))-1),parseInt(obj['birthday'].slice(8,10))+1<10?parseInt(obj['birthday'].slice(8,10))+1:"0"+(parseInt(obj['birthday'].slice(8,10))+1));

    this.setState({
      show: "none",
      readOnly: true,
      OwnerInfo: obj,
      openIdError: " ",
      warning: JSON.parse(JSON.stringify(this.state.defaultWarning))
    });
  };
  handleEdit = () => {
    
    this.openButton();
  };
  handleName = event => {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["name"] = event.target.value;
    let warning = JSON.parse(JSON.stringify(this.state.warning));
    if (event.target.value != "") {
      warning["name"] = 0;
      this.setState({openIdError:" "})

    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  };
  handleId = event => {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["customerId"] = event.target.value;
    let warning = JSON.parse(JSON.stringify(this.state.warning));
    if (event.target.value != "") {
      warning["customerId"] = 0;
      
      this.setState({
        openIdError: " "
      })
    }
    this.setState({
      customerInfo: obj
    });
  };
  handleBirthDay = event => {
    this.setState({
      birthday: event
    });
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    // obj["birthday"] = begin;
    obj["birthday"] = event;
    this.setState({
      customerInfo: obj
    });
  };
  handleEmail = event => {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["email"] = event.target.value;
    let warning = JSON.parse(JSON.stringify(this.state.warning));
    obj["birthday"] = this.state.birthday;
    if (event.target.value != "") {
      warning["email"] = 0;
      this.setState({openIdError:" "})

    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  };
  handlePass = event => {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["pass"] = event.target.value;
    let warning = JSON.parse(JSON.stringify(this.state.warning));
    obj["birthday"] = this.state.birthday;
    if (event.target.value != "") {
      warning["pass"] = 0;
      this.setState({openIdError:" "})

    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  };
  handleCompany = event => {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["companyName"] = event.target.value;
    let warning = JSON.parse(JSON.stringify(this.state.warning));
    obj["birthday"] = this.state.birthday;
    if (event.target.value != "") {
      warning["companyName"] = 0;
      this.setState({openIdError:" "})

    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  };
  handlePhone = event => {
    let obj = JSON.parse(JSON.stringify(this.state.customerInfo));
    obj["phone"] = event.target.value;
    let warning = JSON.parse(JSON.stringify(this.state.warning));
    obj["birthday"] = this.state.birthday;
    if (event.target.value != "") {
      warning["phone"] = 0;
      this.setState({openIdError:" "})

    }
    this.setState({
      customerInfo: obj,
      warning: warning
    });
  };
  handleChange=(event)=>{
    let proper=event.target.name;
    let obj =JSON.parse(JSON.stringify(this.state.customerInfo));
    
    obj[proper]=event.target.value;
    
  } 
  async handleSubmit(){
    let result = await this.validInput();
    if (!result) {
      return;
    }
    let data = JSON.parse(JSON.stringify(this.state.customerInfo));
    data["old_id"] = this.state.old_info["customerId"];
    let e = new Date(data["birthday"]);
    let begin = new Date(e.getFullYear(), e.getMonth(), e.getDate());
    data["birthday"] = formatDate(begin);
    fetch("/api/updateCustomer", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(data => {
        if (data == "true") {
          this.showDialogSuccess();
        }
      });
  };
  render() {
    let customer = this.state.customerInfo;
    return (
      <div>
        <Head isLogin={this.props.isLogin} url={"/"} />
        <div className="info-container">
          <i className="fas fa-edit icon" onClick={this.handleEdit}></i>
          <h2>Thông tin cá nhân</h2>
          <div className="customer-info-wrapper">
            <div className="label">
              Họ và tên<font style={{ display: this.state.show }}>*</font>
            </div>
            <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="name"
              value={customer.name}
              onChange={this.handleName}
            />
            <span
              className="warning"
              style={{ opacity: this.state.warning["name"] }}
            ></span>
            <font></font>
          </div>
          <div className="customer-info-wrapper">
            <div className="label">
              Số CMND<font style={{ display: this.state.show }}>*</font>{" "}
            </div>
            <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="customerId"
              value={customer.customerId}
              onChange={this.handleId}
            />
            <span
              className="warning"
              style={{ opacity: this.state.warning["customerId"] }}
            ></span>
          </div>
          <div className="customer-info-wrapper birthday">
            <div className="label">
              Ngày sinh <font style={{ display: this.state.show }}>*</font>
            </div>
            <DatePicker
              className="must-fill"
              selected={this.state.birthday}
              onChange={this.handleBirthDay}
              dateFormat="yyyy-MM-dd"
              timeCaption="Heure"
              showDisabledMonthNavigation
              readOnly={this.state.readOnly}
              name="birthday"
            />

            <span
              className="warning"
              style={{ opacity: this.state.warning["birthday"] }}
            ></span>
          </div>
          <div className="customer-info-wrapper">
            <div className="label">
              {" "}
              Email<font style={{ display: this.state.show }}>*</font>
            </div>
            <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="email"
              value={customer.email}
              onChange={this.handleEmail}
            />
            <span
              className="warning"
              style={{ opacity: this.state.warning["email"] }}
            ></span>
          </div>
          <div className="customer-info-wrapper">
            <div className="label">
              {" "}
              Mật khẩu<font style={{ display: this.state.show }}>*</font>{" "}
            </div>
            <input
              type="password"
              readOnly={this.state.readOnly}
              className="must-fill"
              name="pass"
              value={customer.pass}
              onChange={this.handlePass}
            />
            <span
              className="warning"
              style={{ opacity: this.state.warning["pass"] }}
            ></span>
          </div>
          

          <div className="customer-info-wrapper">
            <div className="label">Công ty </div>
            <input
              readOnly={this.state.readOnly}
              name="companyName"
              value={customer.companyName}
              onChange={this.handleCompany}
            />
            <span
              className="warning"
              style={{ opacity: this.state.warning["companyName"] }}
            ></span>
          </div>
          <div className="customer-info-wrapper">
            <div className="label">
              Số điện thoại<font style={{ display: this.state.show }}>*</font>{" "}
            </div>
            <input
              readOnly={this.state.readOnly}
              className="must-fill"
              name="phone"
              value={customer.phone}
              onChange={this.handlePhone}
            />
            <span
              className="warning"
              style={{ opacity: this.state.warning["phone"] }}
            ></span>
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
        <UpdateSuccess show={this.state.showSuccessDialog} url="/info" />
        <div className={"id-error " + this.state.openIdError}>
      <p>{this.state.errorContent}</p>
        </div>
      </div>
    );
  }
}
function formatDate(date) {
  let temp = date;

  let a = temp.getDate() > 9 ? temp.getDate() : "0" + temp.getDate();
  return temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + a;
}
function phoneValidate(number){
  let regex=/((09|03|07|08|05)+([0-9]{8})\b)/g;
  return regex.test(number);
}
export default CustomerInfo;
