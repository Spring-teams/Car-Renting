import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/customer/home";
import SubmitBody from "./components/submit/submitBody";
import Order from "./components/order/order";
import CustomerInfo from "./components/customer/customerInfo";
import Owner from "./components/owner/Owner";
import Customer from "./components/owner/Customer";
import OwnerInfo from "./components/owner/OwnerInfo";
import "react-datepicker/dist/react-datepicker.css";
import Analysis from "./components/owner/analysis";
import AdminMenu from './components/admin/adminMenu';
import QuanLyKhachHang from './components/admin/QuanLyKhachHang';
import QuanLyCuaHang from './components/admin/QuanLyCuaHang';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleCarID = this.handleCarID.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.getCurrentCutomer = this.getCurrentCutomer.bind(this);
    this.state = {
      customerId: "0",
      isCustomerLogin: false,
      currentCustomer: {}
    };
  }
  handleCarID(carId) {
    console.log(carId);
  }
  componentDidMount() {
    fetch("/api/checkLogin")
      .then(res => res.text())
      .then(data => {
        if (data == "true") {
          this.setState({ isCustomerLogin: true });
          this.getCurrentCutomer();
        } else this.setState({ isCustomerLogin: false });
      });
  }
  handleLog() {
    if (this.state.isCustomerLogin) {
      fetch("/api/logout");
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  }
  getCurrentCutomer() {
    if (this.state.isCustomerLogin) {
      fetch("/api/getCurrentCustomer")
        .then(res => res.json())
        .then(data => {
          this.setState({
            currentCustomer: data
          });
        });
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login role={"customer"} url={"/"} />
          </Route>
          <Route
            path="/carinfo/:id"
            render={props => <SubmitBody {...props} />}
          ></Route>
          <Route path="/order">
            <Order
              isLogin={this.state.isCustomerLogin}
              url={"/"}
              customer={this.state.currentCustomer}
            />
          </Route>
          <Route path="/info">
            <CustomerInfo
              isLogin={this.state.isCustomerLogin}
              url={"/"}
              role={"customer"}
            />
          </Route>

          <Route path="/chothuexe/khach-hang">
            <Customer />
          </Route>
          <Route path="/chothuexe/thong-tin-ca-nhan">
            <OwnerInfo />
          </Route>
          <Route path="/chothuexe/thong-ke">
            <Analysis />
          </Route>
          <Route path="/admin" exact>
            <AdminMenu />
          </Route>
          <Route path="/admin/quan-ly-khach-hang">
            <AdminMenu />
            <QuanLyKhachHang />
          </Route>
          <Route path="/admin/quan-ly-cua-hang">
            <AdminMenu />
            <QuanLyCuaHang />
          </Route>
          <Route path="/chothuexe">
            <Owner />
          </Route>
          {/* <Route path="/admin">
          
        </Route> */}
          <Route path="/">
            <Home
              isLogin={this.state.isCustomerLogin}
              handleLog={this.handleLog}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
