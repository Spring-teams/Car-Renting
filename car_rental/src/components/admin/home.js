import React from "react";
import AdminMenu from "./adminMenu";
import Analysis from "../owner/analysis";
import Login from "../login";
class AdminHome extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLogin:false
        }
    }
    componentDidMount=()=>{
        fetch("/api/admin/checkLogin")
        .then(res=>res.text())
        .then(data=>{
            if(data=="true"){
                this.setState({
                    isLogin: true
                })
            }
            else this.setState({
                isLogin: false
            })
        })
    }
    render(){
        if(!this.state.isLogin){
            
            return (
                <Login role={"admin"} url = {"/admin"}/>
            )
        }
        return (
            <div>
                <AdminMenu/>
                <Analysis role = {"admin"} isAdmin={true}/>
            </div>
        )
    }
}

export default AdminHome;