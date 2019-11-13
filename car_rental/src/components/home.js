import React from "react";

// import {Login,Head,Search,CarTable,Slider} from "./index";
import Login from "./login";
import CarTable from "./cartable";
import Search from "./search";
import Slider from "./slider";
import Head from "./head";
import "../css/Home.css";
import Footer from "./footer";
import "../font/fontawesome-free-5.11.2-web/css/all.css";
// import "../css/boostrap.min.css";

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            condition: {}
        }
        this.handleSearch=this.handleSearch.bind(this);
    }
    handleSearch(a,b,c){
        let condition={
            "branch": a,
            "numberSeat":b,
            "category":c
        }
        this.setState({condition: condition});

    }
    render(){
        return (
            <div id="nothing">
                <Head isLogin={this.props.isLogin} handleLog={this.props.handleLog}/>
                
                <Slider />
                
                <h4 className="text-center">Bảng giá xe</h4>
                <Search handleSearch ={this.handleSearch}/>
                <CarTable condition={this.state.condition} />
                <Footer/>
            </div>
        )
    }
}

export default Home;