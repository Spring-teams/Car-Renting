import React from "react";

class Confirm extends React.Component{
    constructor(props){
        super(props);
        this.deleteCar=this.deleteCar.bind(this);
    }
    async deleteCar(){
        let carId = this.props.deletedCarId;
        await fetch("/api/deletecar/"+carId);
        window.location.href=this.props.url;
    }

    render(){
        let backprop={
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:'rgba(0,0,0,0.3)',
            display: this.props.show
        }
        let confirmDialog={
            height: "150px",
            width: "400px",
            margin:"100px auto",
            backgroundColor: "white",
            paddingTop: "30px",
            textAlign:"center"
        }
        let buttonGroup={
            width: "100%",
            display:"flex",
            justifyContent: "space-around",
            color: "white !important"
        }
        return (
            <div className="backProp" style={backprop} >
                <div className="confirmDialog" style={confirmDialog}>
        <p>{this.props.content}</p>
                    <div className="comfirmButton" style={buttonGroup}>
                        <button style={{color: "white", display:this.props.canDeleteCar==true?"none":"block"}} onClick={this.deleteCar}>Xác nhận</button>
                        <button style={{color: "white"}} onClick={()=>this.props.close()}>Bỏ qua</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirm;