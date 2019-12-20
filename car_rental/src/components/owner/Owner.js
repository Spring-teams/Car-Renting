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
        if(this.props.role!="admin"){
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
        else {
            fetch("/api/getowner/"+this.props.match.params.id)
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
    let id ;
    if(this.props.role=="admin"){
        id = this.props.match.params.id;
    }
    else id =this.state.owner.ownerId;
    if(typeof this.state.owner =="undefined"){
        let listCar;
        this.setState({
            listCar: listCar
        })
        return ;
    }
    
      fetch("/api/getCarByOwnerId/"+id)
      .then((res=>res.json()))
      .then((data)=>{
          this.setState({
              listCar: data
          })
      })
    }
    render(){
        let {listCar} = this.state;
        console.log(this.state.owner);
        
        if(this.state.isLogin==false&&this.props.role!="admin"){
            return <Login role={"owner"} url={"/chothuexe"}/>
        }
        return (
            <div className="owner">
                <OwnerHead owner = {this.state.owner} role={this.props.role} id = {this.props.role=="admin"?this.props.match.params.id:-1}/>
                {this.state.isLoad==true ? <CarList cars={this.state.listCar} owner = {this.state.owner} role={this.props.role}/>: " "}
                <Footer/>
                
            </div>
        )
    }
}

export default Owner