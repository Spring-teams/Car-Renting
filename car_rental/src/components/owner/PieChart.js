import React from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            chartData: this.props.chartData
        }
    }
    static defaultProps = {
      displayTitle:true,
      displayLegend: true,
      legendPosition:'right',
      year:2019
    }
    render(){
    return (
      <div class="char text-center">
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Thông tin doanh thu của các loại xe trong năm:  " + this.props.year,
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

export default PieChart;
