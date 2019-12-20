import React from "react";

// import {Login,Head,Search,CarTable,Slider} from "./index";
import Login from "../login";
import CarTable from "./cartable";
import Search from "./search";
import Slider from "./slider";
import Head from "./head";
import "../../css/Home.css";
import Footer from "../footer";
import "../../font/fontawesome-free-5.11.2-web/css/all.css";
import Pagination from "./pagination";
// import "../css/boostrap.min.css";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            filterBranch: "Tất Cả",
            filterCategory: 0,
            filterNumberSeat: "Tất cả",
            maxPage: 1,
            pageNumber: 1,
        };
    }
    async componentDidMount() {
        await fetch(`/api/getallcar`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    maxPage: (data.count % 12 === 0) ? Math.floor(data.count / 12): Math.floor(data.count / 12)+1
                });
            });
        await fetch(`/api/getcar/${this.state.pageNumber}/12`, {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({
                        cars: data.cars
                    });
                });
    }
    onFilter = (filterCategory, filterBranch, filterNumberSeat) => {
        console.log(filterCategory, filterBranch, filterNumberSeat);
        this.setState({
            filterBranch: filterBranch,
            filterNumberSeat: filterNumberSeat,
            filterCategory: filterCategory,
        })

    }
    onSearch = () => {
        fetch(`/api/searchCar/${this.state.filterBranch === "Tất cả" ? "no" : this.state.filterBranch}/${this.state.filterCategory === 0 ? "no" : this.state.filterCategory}/${this.state.filterNumberSeat}`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    cars: data.cars,
                    maxPage: (data.count % 12 === 0) ? Math.floor(data.count / 12): Math.floor(data.count / 12)+1
                });
            });

    }
    onChangeNumberPage = (pageNumber) => {
        console.log("page " + pageNumber);
        this.setState({
            pageNumber: pageNumber
        })
        fetch(`/api/getcar/${pageNumber}/12`, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    cars: data.cars
                });
            });
    }
    render() {
        let {maxPage} = this.state;
        console.log(maxPage);
        
        return (
            <div id="nothing" style={{ backgroundColor: '#f5f5f5' }}>
                <Head isLogin={this.props.isLogin} />

                <div className="container">
                    <div className="row">
                        <div className="col-8" style={{ margin: '0px', padding: '3px' }}>
                            <Slider />
                        </div>
                        <div className="col-4" style={{ margin: '0px', padding: '3px' }}>
                            <img src="images/image/image/2018 MERCEDES S-CLASS.jpg" className="d-block w-100 mt-1" alt="..." />
                            <img src="images/image/image/2018 MERCEDES S-CLASS.jpg" className="d-block w-100 mt-1" alt="..." />
                        </div>
                    </div>
                </div>
                <Search onFilter={this.onFilter} onSearch={this.onSearch} />
                <CarTable cars={this.state.cars} />
                <Pagination maxPage={maxPage} onChangeNumberPage={this.onChangeNumberPage}/>
                <Footer />
            </div>
        )
    }
}

export default Home;