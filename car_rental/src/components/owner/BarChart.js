import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class BarChart extends React.Component {
  constructor(props) {
      super(props);
      this.state={
          chartData: this.props.chartData
      }
  }
  static defaultProps = {
    displayTitle:true,
    displayLegend: false,
    legendPosition:'right',
    year:2019
  }
  render() {
    return (
      <div className="char text-center">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Thống kê doanh thu trong năm " + this.props.year,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}
export default BarChart;
