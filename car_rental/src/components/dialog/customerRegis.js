import React from "react";
import { isReferenced } from "@babel/types";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      obj:{
        "name": "",
        "id":"",
        "birthday":"",
        "phone":"",
        "email":"",
        "pass":"",
        "repass":"",
        "companyName":""
      },
      warning:{
        "name": "",
        "id":"",
        "birthday":"",
        "phone":"",
        "email":"",
        "pass":"",
        "repass":"",
        "companyName":""
      },
      inputError: " ",
      errorContent: " ",
    }
    this.validInput=this.validInput.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    
  }
  handleChange=(event)=>{
    let data= JSON.parse(JSON.stringify(this.state.obj));
    data[event.target.name]=event.target.value;
    this.setState({
      obj:data
    })
  }
  async validInput(data){
    let warning= this.state.warning;
    let isError= false;
    let errorContent=" ";
    if(data['id']!=""){
      let regrex=/^\d+$/;
      if(!regrex.test(data['id'])){
        isError=true;
        warning['id']="show";
        errorContent="Số CMND không bao gồm chữ cái!";
        
      }
      else {
        await fetch("/api/"+this.props.role+"/checkExist/"+data['id'])
        .then(res=>res.text())
        .then(data=>{
          if(data==true){
            isError=true;
            warning['id']="show";
            errorContent='Số CMND đã tồn tại!';
          }
        })
      }
    }
    this.setState({
      warning: warning,
      inputError: isError==true?"show":' ',
      errorContent: errorContent
    })
  }
  onSubmit(event){
    event.preventDefault();
    this.validInput(this.state.obj)
  }
  render() {
    let data=this.state.obj;
    return (
      <div className="regis-background" style={{display: this.props.show}}>
        <div className="regis-main" id="sign-up-dialog">
            <h3>Đăng ký</h3>
          <p>Bạn phải nhập tất cả các trường có dấu *</p>
          <div className="sign-up-container">
            <div className="sign-up-wrapper">
              <div>
                Họ và tên:<font>*</font>{" "}
              </div>
              <input name="name" className="must-fill" value={data['name']} onChange={this.handleChange} />
              <span className={"warning "+this.state.warning['name']} ></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Số CMND: <font>*</font>{" "}
              </div>
              <input name="id" className="must-fill" value={data['id']} onChange={this.handleChange} />
              <span className={"warning "+this.state.warning['id']}></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Ngày sinh:<font>*</font>{" "}
              </div>
              <input placeholder="yy-mm-dd" name="birthday" value ={data['birthday']} className="must-fill" onChange={this.handleChange}/>
              <span className={"warning "+this.state.warning['birthday']}></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Số điện thoại:<font>*</font>{" "}
              </div>
              <input name="phone" className="must-fill" value={data['phone']} onChange={this.handleChange}/>
              <span className={"warning "+this.state.warning['phone']}></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Email:<font>*</font>{" "}
              </div>
              <input name="email" className="must-fill" value={data['email']} onChange={this.handleChange}/>
              <span className={"warning "+this.state.warning['email']}></span>
            </div>
            <div className="sign-up-wrapper">
              <div>Tên công ty: </div>
              <input name="companyName" value={data['companyName']} onChange={this.handleChange} />
            </div>
            <div className="sign-up-wrapper">
              <div>
                Mật khẩu:<font>*</font>{" "}
              </div>
              <input name="pass" className="must-fill"  type="password" value={data['pass']} onChange={this.handleChange}/>
              <span className={"warning "+this.state.warning['pass']}></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Nhập lại mật khẩu:<font>*</font>{" "}
              </div>
              <input name = "repass" className='must-fill'  type = "password" value={data['repass']} onChange={this.handleChange} />
              <span className={"warning "+this.state.warning['repass']}></span>
            </div>
            <div className="sign-up-button-wrapper">
              <button className="regis-discard">Bỏ qua</button>
              <button className="register" onClick={this.onSubmit}>Đăng ký</button>
            </div>
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
function phoneValidate(number){
  let regex=/((09|03|07|08|05)+([0-9]{8})\b)/g;
  return regex.test(number);
}
export default Register;