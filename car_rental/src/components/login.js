import React from "react";
import reactDOM from "react-dom";
// import {Dialog} from "./dialog";
import Loading from "./dialog/loading";
import "../css/login.css";
import Register from"./dialog/customerRegis";
import { tsExpressionWithTypeArguments } from "@babel/types";
import {Redirect} from "react-router-dom";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this);
    this.handleEmail=this.handleEmail.bind(this);
    this.handlePass=this.handlePass.bind(this);
    this.openDialog=this.openDialog.bind(this);
    this.showLoading=this.showLoading.bind(this);
    this.closeLoading=this.closeLoading.bind(this);
    this.state={
        username:"",
        pass:"",
        showRegis: "none",
        showError: "loginError",
        isLogin: false,
        showLoading: "none"
    }
  }
  async handleClick(event){
      event.preventDefault();
      await this.showLoading();
      let customer={};
      customer['customerId']=this.state.username;
      customer['pass']=this.state.pass;
      // console.log(user);

      fetch("/api/"+this.props.role+"/confirm",{
        method: "POST",
        // body: JSON.stringify(user)
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      })
      .then(res=>res.text())
      .then((data)=>{
        if(data=="true"){
          this.setState({isLogin: true});
        }
        else {
          this.setState({
            isLogin: false,
            showError: "showLoginError"
          });
        }
      })
      .catch(function(error){
        console.log(error);
      }).then(()=>{
        this.closeLoading();
      })
  }
  showLoading(){
    this.setState({
      showLoading: "block"
    })
  }
  closeLoading(){
    this.setState({
      showLoading:"none"
    })
  }
  handleEmail(event){
      this.setState({
          username: event.target.value,
          showError : "loginError"
      })
  }
  handlePass(event){
      this.setState({
          pass: event.target.value,
          showError : "loginError"
      })
  }
  openDialog(){
      this.setState({
          showRegis: "block"
      })
  }
  
  render() {
    if(this.state.isLogin){
      window.location.href=this.props.url;
      return;
    }
    return (
      
      <form className="container">
        <div className={"loginError "+this.state.showError}>
          <p>Tên đăng nhập hoặc mật khẩu không chính xác!</p>
        </div>
        <div className="login-form">
          <h1>Đăng nhập</h1>
          <div className="js-txtb">
            <input type="text"  onChange={this.handleEmail}/>
            <span data-placeholder="Số CMND"></span>
          </div>

          <div className="js-txtb">
            <input type="password" onChange={this.handlePass}/>
            <span data-placeholder="password"></span>
          </div>
          <button className="js-logbutton" onClick={this.handleClick}>Đăng nhập</button>
          <div className="button-text">
            Bạn chưa có tài khoản?{" "}
            <a  className="form-register" onClick={this.openDialog}>
              Đăng ký
            </a>
          </div>
          
        </div>
        {/* <Dialog visible={this.state.dialog}></Dialog> */}
        <Loading show = {this.state.showLoading}/>
        <Register show ={this.state.showRegis}/>
      </form>
      
    );
  }
}



export default Login;
