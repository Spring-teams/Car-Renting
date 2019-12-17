import React from "react";
import { isReferenced } from "@babel/types";
import DatePicker from "react-datepicker";
import { verify } from "crypto";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: {
        name: "",
        id: "",
        birthday: "",
        phone: "",
        email: "",
        pass: "",
        repass: "",
        companyName: ""
      },
      warning: {
        name: "",
        id: "",
        birthday: "",
        phone: "",
        email: "",
        pass: "",
        repass: "",
        companyName: ""
      },
      inputError: " ",
      errorContent: " "
    };
    this.validInput = this.validInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange = event => {
    let data = JSON.parse(JSON.stringify(this.state.obj));
    let warning = JSON.parse(JSON.stringify(this.state.warning));
      
    warning[event.target.name] = " ";
    data[event.target.name] = event.target.value;
    if(data['birthday']!=""){
      data['birthday'] = new Date(data['birthday']);

    }
    this.setState({
      obj: data,
      warning: warning,
      inputError: ""
    });
  };
  handleDate=(event)=>{
    
    let data = JSON.parse(JSON.stringify(this.state.obj));
    let warning = JSON.parse(JSON.stringify(this.state.warning));
    
    warning['birthday'] = " ";
    data['birthday'] = event;
    this.setState({
      obj: data,
      warning: warning,
      inputError: ""
    });

  }
  async validInput(data) {
    let warning = JSON.parse(JSON.stringify(this.state.warning));
    let isError = false;
    let errorContent = " ";

    for (let proper in data) {
      if (data[proper] == "") {
        warning[proper] = " show";
        errorContent = "Xin điền đầy đủ thông tin!";
        isError = true;
      }
    }
    if (data["id"] != "") {
      let regrex = /^\d+$/;
      if (!regrex.test(data["id"])) {
        isError = true;
        warning["id"] = "show";
        errorContent = "Số CMND không bao gồm chữ cái!";
      } else {
        const result = await fetch(
          "/api/" + this.props.role + "/checkExist/" + data["id"]
        )
          .then(res => res.text())
          .then(data => {
            if (data == "true") {
              isError = true;
              warning["id"] = "show";
              errorContent = "Số CMND đã tồn tại!";
            }
          });
      }
    }
    if(data['pass']!=data['repass']){
      isError=true;
      errorContent="Mật khẩu nhập không khớp!"
    }
    regex= /(09|01[2|6|8|9])+([0-9]{8})\b/
    if(!regex.test(data['phone'])){
      isError=true;
      errorContent="Số điện thoại không hợp lệ!"
    }
    const res = this.setState({
      warning: warning,
      inputError: isError == true ? "show" : " ",
      errorContent: errorContent
    });
    return !isError;
  }
  async onSubmit(event) {
    event.preventDefault();
    let data = JSON.parse(JSON.stringify(this.state.obj));
    const result = await this.validInput(this.state.obj);
    // console.log(this.state.obj)
    if(result){
      let date = new Date(data['birthday']);
      data['birthday'] = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
      fetch("/api/" + this.props.role + "/insert", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.text)
        .then(data => {
          // console.log(data);
          window.location.href=this.props.url;
        });
    }
    }
    
  
  render() {
    let data = this.state.obj;
    return (
      <div className="regis-background" style={{ display: this.props.show }}>
        
        <div id="register-form">
          <h2 style={{textAlign: 'center', color: 'orangered'}}>
            Đăng ký tài khoản
          </h2>
          <label>
            <i>Bạn cần nhập đầy đủ vào ô có dấu *</i>
          </label>
          <table className="register-rwd-table">
            {/* <tbody> */}
            <tr>
              <td>
                Họ và tên <span> * </span>{" "}
              </td>
              <td>
                <input type="text"  name="name" className="must-fill" value={data['name']} onChange={this.handleChange} />{" "}
                <span>
                  <i className={"fas fa-exclamation-triangle "+ this.state.warning['name']}></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                Số CMND <span> * </span>
              </td>
              <td>
                <input type="text" name="id" className="must-fill" value={data['id']} onChange={this.handleChange} />{" "}
                <span>
                  <i className={"fas fa-exclamation-triangle "+ this.state.warning['id']}></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                Ngày sinh <span> * </span>
              </td>
              <td>
              <DatePicker
                          selected={data['birthday']}
                          onChange={this.handleDate}
                          dateFormat="yyyy-MM-dd"
                          timeCaption="Heure"
                          // minDate={new Date()}
                          showDisabledMonthNavigation
                          name="birthday"
                        />
                {/* <input type="text" name="birthday" className="must-fill" value={data['birthday']} onChange={this.handleChange} />{" "} */}
                <span>
                  <i className={"fas fa-exclamation-triangle " + this.state.warning['birthday']}></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                Số điện thoại <span> * </span>
              </td>
              <td>
                <input type="text" name="phone" className="must-fill" value={data['phone']} onChange={this.handleChange} />{" "}
                <span>
                <i className={"fas fa-exclamation-triangle " + this.state.warning['phone']}></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                Email <span> * </span>
              </td>
              <td>
                <input type="text" name="email" className="must-fill" value={data['email']} onChange={this.handleChange} />{" "}
                <span>
                <i className={"fas fa-exclamation-triangle " + this.state.warning['email']}></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>Tên công ty</td>
              <td>
                <input type="text" name="companyName" className="must-fill" value={data['companyName']} onChange={this.handleChange} />{" "}
                <span>
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                Mật khẩu <span> * </span>
              </td>
              <td>
                <input type="text" name="pass" className="must-fill" value={data['pass']} onChange={this.handleChange} />{" "}
                <span>
                <i className={"fas fa-exclamation-triangle " + this.state.warning['pass']}></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                Nhập lại mật khẩu <span> * </span>
              </td>
              <td>
                <input type="text" name="repass" className="must-fill" value={data['repass']} onChange={this.handleChange} />{" "}
                <span>
                <i className={"fas fa-exclamation-triangle " + this.state.warning['repass']}></i>
                </span>
              </td>
            </tr>
            <tr>
              {/* <td></td>
              <td style={{display: "inline"}}>
                <button className="btn btn-success">Đăng ký</button>
                <button className="btn btn-danger">Hủy bỏ</button>
              </td> */}
            </tr>
            
          </table>
          <div>
          <button className="btn btn-success" onClick={this.onSubmit} >Đăng ký</button>
          <button className="btn btn-danger" style={{marginRight: "10px"}} onClick={()=>this.props.close()}>Hủy bỏ</button>
          </div>
        </div>
        <div className={"id-error "+this.state.inputError}>
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
function phoneValidate(number) {
  let regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return regex.test(number);
}
export default Register;
