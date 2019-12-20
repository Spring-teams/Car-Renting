import React from "react";
import OnwerHead from "./OwnerHead";
import OwnerHead from "./OwnerHead";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Footer from "../footer";
import "../../css/Analysis.css";
import AdminMenu from "../admin/adminMenu";

class Analysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: "",
            year: 2019,
            owner:{},
            chartData: {
                labels: [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5 ",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12"
                ],
                datasets: [
                    {
                        label: "Doanh thu (VND)",
                        data: [],
                        backgroundColor: [
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)",
                            "rgba(0, 140, 255, 0.9)"
                        ]
                    }
                ]
            },
            pieData: {
                labels: [],
                datasets: [
                    {
                        label: "Doanh thu (VND)",
                        data: [],
                        backgroundColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(247, 202, 24, 1)",
                            "rgba(123, 239, 178, 1)",
                            "rgba(232, 126, 4, 1)",
                            "rgb(197, 239, 247)",
                            "rgb(210, 215, 211)"
                        ]
                    }
                ]
            }
        };
    }
    handleYear = event => {
        this.setState(
            {
                year: event.target.value
            },
            () => {
                this.getData();
            }
        );
    };
    componentDidMount=()=>{
        

    }
    getData = () => {
        let id = "/" + -1 + "/";
        let isAdmin = "";
        if (this.props.isAdmin == true) {
            id = "/";
            isAdmin = "/admin"

        }
        else if (this.props.role == 'admin') {
            id = this.props.match.params.id;
            id = "/" + id + "/";
        }
        
        fetch("/api" + isAdmin + "/befinite" + id + this.state.year)
            .then(res => res.json())
            .then(res => {
                

                let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                if (res.length == 0) {

                }
                else {
                    for (let i = 0; i < res.length; i++) {
                        let month = res[i].month;
                        data[month - 1] = res[i].total;
                    }
                }
                let chartData = this.state.chartData;

                chartData.datasets[0].data = data;

                this.setState({
                    chartData: chartData
                });
            });
        
        fetch("/api" + isAdmin + "/branchanalysis" + id + this.state.year)
            .then(res => res.json())
            .then(res => {
                let label = [];
                let data = [];
                let pieData = this.state.pieData;
                
                if (res.length == 0) {
                }
                else {
                    for (let i = 0; i < res.length; i++) {
                        label[i] = res[i]["branch"];
                        data[i] = res[i]["total"];
                    }
                }
                pieData.labels = label;
                pieData.datasets[0].data = data;
                this.setState({
                    pieData: pieData
                });
            });
        
        fetch("/api" + isAdmin + "/getanalysis" + id + this.state.year)
            .then(res => res.json())
            .then(res => {
               
                let obj = {
                    num: 0,
                    totalmoney: 0
                }
                if (res.length != 0) {
                    obj = res[0];

                }
                this.setState({
                    total: obj
                })

            })
    };
    componentWillMount = () => {
        this.getData();
        let id = "/" + -1 + "/";
        let isAdmin = "";
        if (this.props.isAdmin == true) {
            id = "/";
            isAdmin = "/admin"

        }
        else if (this.props.role == 'admin') {
            id = this.props.match.params.id;
            id = "/" + id;
        }
        
        fetch("/api/getowner"+id)
        .then((res)=>res.json())
        .then((res)=>{
            
            this.setState({
                owner: res[0]
            })
        })
    };

    render() {
        
        return (

            <div id="analysis">
                {typeof this.props.match == "undefined" ? (this.props.role =="admin" ? <AdminMenu/> : <OwnerHead owner={this.state.owner}/>) : <OwnerHead role={this.props.role} id={this.props.role == "admin" ? this.props.match.params.id : -1} owner={this.state.owner}/>}
                
                 {/* <OwnerHead owner={this.state.owner}/> */}
                 {/* {this.props.role =="admin" ? <AdminMenu/> : <OwnerHead owner={this.state.owner}/>} */}
                <div class="container" id="thong-ke">
                    {/* <h4 class="text-center">Thông kê trong năm 2019</h4> */}
                    <div className="year-selection">
                        <p>Chọn năm</p>
                        <select onChange={this.handleYear}>
                            <option>2018</option>
                            <option selected>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                        </select>
                    </div>
                    <div class="row mt-5">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <BarChart
                                chartData={this.state.chartData}
                                year={this.state.year}
                                legendPosition="bottom"
                            />
                            {/* <div class="char text-center">
                <canvas id="xe-thue-nhieu-nhat"></canvas>
                <i>
                  <u>Biểu đồ thống kê xe được thuê nhiều nhất trong năm 2019</u>
                </i>
              </div> */}
                        </div>
                    </div>

                    <div class="row mt-5">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <PieChart
                                chartData={this.state.pieData}
                                year={this.state.year}
                                legendPosition="bottom"
                            />
                        </div>
                        <div class="row mt-5">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div class="char" id="tk-doanh-so">
                                    <p>Tổng số đơn hàng: {this.state.total['num']}</p>
                                    <p>Doanh thu cả năm: {formatNumber(this.state.total['totalmoney'])}<sup>đ</sup></p>
                                    <p>Chiết khấu: 5% = {formatNumber(this.state.total['totalmoney'] * 0.05)}<sup>đ</sup></p>
                                    <p>Tổng: {this.props.isAdmin == true ? formatNumber(this.state.total['totalmoney'] * 0.05) : formatNumber(this.state.total['totalmoney'] - this.state.total['totalmoney'] * 0.05)} VND</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
        function formatNumber(num) {
            if (num == null) {
                return;
            }
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
    }
}
export default Analysis;
