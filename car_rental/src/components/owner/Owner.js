import React from "react";
import OwnerHead from "./OwnerHead";
import CarList from "./CarList";
import Footer from "../footer";
// import OwnerLogin from "./Login";
import "../../css/O_DanhSachSanPham.css";
// import "../.../css/boostrap.min.css";
import Modal from "./Dialog";
import { lstat } from "fs";
import Login from "../login";
class Owner extends React.Component{

    constructor(props){
        super(props);
        this.state={
            owner:{},
            listCar:[],
            listCustomer:[],
            isLoad: false,
            isLogin: false
        }
        this.componentWillMount= this.componentWillMount.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.getListCar=this.getListCar.bind(this);
    }

    componentWillMount(){
        fetch("/api/getowner")
        .then((res)=>res.json())
        .then(data=>{
            this.setState({
                owner: data[0]
            })
        })
        .then(()=>{
            this.getListCar();
        })
        .then(()=>{
            this.setState({isLoad: true})
        })
    }
    componentDidMount(){
        fetch("/api/checkOwnerLogin")
        .then(res=>res.text())
        .then((data)=>{
            if(data=="true"){
                this.setState({
                    isLogin: true
                })
            }
        })
    }
    getListCar(){
    if(typeof this.state.owner =="undefined"){
        let listCar;
        this.setState({
            listCar: listCar
        })
        return ;
    }
      fetch("/api/getCarByOwnerId/"+this.state.owner.ownerId)
      .then((res=>res.json()))
      .then((data)=>{
          this.setState({
              listCar: data
          })
      })
    }
    render(){
        if(this.state.isLogin==false){
            return <Login role={"owner"} url={"/chothuexe"}/>
        }
        return (
            <div className="owner">
                <OwnerHead/>
                
                {this.state.isLoad==true ? <CarList cars={this.state.listCar} owner = {this.state.owner}/>: " "}
                <Footer/>
                
            </div>
        )
    }
}

export default Owner