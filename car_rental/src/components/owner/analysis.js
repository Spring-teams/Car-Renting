import React from "react";
import OnwerHead from "./OwnerHead";
import OwnerHead from "./OwnerHead";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Footer from "../footer";
import "../../css/Analysis.css";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5 ",
          "Tháng 6",
          " Tháng 7",
          "Tháng 8",
          "Tháng 9 ",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ],
        datasets: [
          {
            label: "Doanh thu (VND)",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
              'rgba(0, 140, 255, 0.9)',
            ]
          }
        ]
      },
      pieData: {
        labels: [
          "Mercedes",
          "Ford",
          "Honda",
          "Mazda",
          "Toyota",
          "Khác"
        ],
        datasets: [
          {
            label: "Doanh thu (VND)",
            data: [6994, 1845, 3060, 1069, 100, 100],
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

  render() {
    return (
      <div id="analysis">
        <OwnerHead />

        <div class="container" id="thong-ke">
          {/* <h4 class="text-center">Thông kê trong năm 2019</h4> */}
          <div className="year-selection">
            <p>Chọn năm</p>
            <select>
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
                year={2019}
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
              year={2019}
              legendPosition="bottom"
              />
            </div>
          <div class="row mt-5">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div class="char" id="tk-doanh-so">
                <p>Tổng số đơn hàng: 123</p>
                <p>Doanh thu cả năm: 12412421412</p>
                <p>Chiết khấu: 5%</p>
                <p>Tổng: 1241245521</p>
              </div>
            </div>
          </div>
          
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Analysis;
