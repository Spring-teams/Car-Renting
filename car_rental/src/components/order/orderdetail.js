import React from "react";
import { runInThisContext } from "vm";
// import { deflate } from "zlib";
import ConfirmDialog from "../dialog/ConfirmDialog"
class Orderdetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: null,
            isLoad: 0,
            show: "none"
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.callApi = this.callApi.bind(this);
        this.checkRental = this.checkRental.bind(this);
    }
    componentDidMount() {
        this.callApi()
            .then(res => res.json())
            .then(data => {
                this.setState({ isLoad: 1 })
                this.setState({ car: data[0] });
            })
            .catch(error => {

            });


    }
    checkRental(rental) {
        let firstDay = rental.beginDate;
        let lastDay = rental.endDate;
        lastDay = new Date(lastDay.slice(0, 4), lastDay.slice(5, 7) - 1, lastDay.slice(8, 10));
        return lastDay > new Date();
    }
   

    callApi() {
        return fetch("/api/getcarbyid/" + this.props.rental.carId)
    }
    showConfirmDialog=()=>{
        this.setState({
            show: "block"
        })
    }
    closeDialog=()=>{
        this.setState({
            show: "none"
        })
    }
    
    render() {
        let rental = this.props.rental;
        this.checkRental(rental)
        if (this.state.car == null) {
            return this.props.rental.carId;
        }
        // console.log(rental);
        let lastDay = rental.endDate;
        lastDay = new Date(lastDay.slice(0, 4), lastDay.slice(5, 7) - 1, lastDay.slice(8, 10));
        let status = "";
        if (rental.isConfirm == 0 && rental.isDelete == 0) status = "Đợi xác nhận";
        else if (rental.isConfirm == 1 && rental.isRent == 0 && rental.isDelete == 0) status = "Đã xác nhận";
        else if (rental.isRent == 1 && rental.isDelete == 0 && rental.isPay == 0) {
            let lastDay = rental.endDate;
            lastDay = new Date(lastDay.slice(0, 4), lastDay.slice(5, 7) - 1, Number(lastDay.slice(8, 10))+1);
            var date = new Date();
            date.setDate(date.getDate() + 1);
            if (lastDay < date) status = "Quá hạn";
            else status = "Đang thuê";
        }
        else if (rental.isRent == 1 && rental.isPay == 1 && rental.isDelete == 0) {
            status = "Đã thuê";
        }
        else status = "Bị hủy";
        return (

            <tr>
                <ConfirmDialog url = "/order" rental={this.props.rental} content= {"Bạn có chắc chắn không muốn thuê xe: "+ rental.carName} show={this.state.show} deleteCar={this.state.deleteOrder} isRental={true} close={this.closeDialog}/>
                <td>{rental.carName}</td>
                <td>
                    <img src={"/images/" + rental.image} style={{ width: "100px", padding: '1px 0' }} class="img-fluid" alt="" />
                </td>
                <td>{rental.carId}</td>
                <td>{rental.ownerName}</td>
                <td>{rental.phone}</td>
                <td>{rental.address}</td>
                <td>{rental.beginDate == null ? "" : rental.beginDate.slice(0, 8) + (Number(rental.beginDate.slice(8, 10)) + 1)} đến  {rental.endDate == null ? "" : rental.endDate.slice(0, 8) + (Number(rental.endDate.slice(8, 10)) + 1)}</td>
                <td>{formatNumber(rental.price)}<sup>đ</sup></td>
                <td>{formatNumber(rental.totalmoney)}<sup>đ</sup></td>
                <td>
                    <label className="label-status" style={{backgroundColor: status=="Đã xác nhận"|| status =="Đang thuê"?"green":status=="Đợi xác nhận"?"yellow":""}} >
                        {status}
                    </label>
                </td>
                <td><label className={status ==="Đợi xác nhận"? "label-huy": ""} onClick={this.showConfirmDialog}>{status ==="Đợi xác nhận"? "Hủy": ""}</label></td>
            </tr>
        );
    }
}
function formatNumber(num) {
    if (num == null) {
        return;
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
export default Orderdetail;
