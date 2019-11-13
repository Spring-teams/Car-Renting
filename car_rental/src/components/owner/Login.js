import React from "react";
import reactDOM from "react-dom";
// import {Dialog} from "./dialog";
import "../../css/login.css";
import { tsExpressionWithTypeArguments } from "@babel/types";
import {Redirect} from "react-router-dom";


class OwnerLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this);
    this.handleEmail=this.handleEmail.bind(this);
    this.handlePass=this.handlePass.bind(this);
    this.openDialog=this.openDialog.bind(this);
    this.state={
        username:"",
        pass:"",
        dialog: false,
        baseurl:"http://localhost:5000",
        isLogin: false
    }
  }
  handleClick(event){
      event.preventDefault();
      let customer={};
      customer['ownerId']=this.state.username;
      customer['pass']=this.state.pass;
      // console.log(user);
      fetch("/api/confirmOwner",{
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
          // this.props.history.push("/");
          // this.props.doLogin(true);
        }
        else this.setState({isLogin: false});
      })
      .catch(function(error){
        console.log(error);
      })
      

  }
  handleEmail(event){
      this.setState({
          username: event.target.value
      })
  }
  handlePass(event){
      this.setState({
          pass: event.target.value
      })
  }
  openDialog(){
      this.setState({
          dialog: true
      })
  }
  
  render() {
    if(this.state.isLogin){
      window.location.href="/chothuexe";
      return;
    }
    return (
      
      <form className="container">
        
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
      </form>
      
    );
  }
}



export default OwnerLogin;
