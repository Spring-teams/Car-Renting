import React from "react";
import './ConfirmDialog.css'
class Confirm extends React.Component{
    constructor(props){
        super(props);
        this.deleteCar=this.deleteCar.bind(this);
    }
    async deleteCar(){
        if(this.props.isRental==true){
            await fetch("/api/deleterental/"+this.props.rental.rentalId);
            window.location.href=this.props.url;
            return;
        }
        else if(this.props.isOnwer==true){
            let rental = this.props.rental;
            rental.beginDate = rental.beginDate.slice(0, 8) + (Number(rental.beginDate.slice(8, 10)) + 1);
            rental.endDate= rental.endDate.slice(0, 8) + (Number(rental.endDate.slice(8, 10)) + 1);
            rental['isDelete']=1;
            fetch("/api/updateRental", {
                method: "POST",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rental)
            })
                .then(res => res.text)
                .then(data => {
                    
                })
        }
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
            width: "400px",
            margin:"100px auto",
            paddingTop: "30px",
            paddingBottom: "30px",
            textAlign:"center",
            background: '#f8f9fa',
            border: '2px solid #fff',
            borderRadius: '20px/50px',
            backgroundClip: 'padding-box',  
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
                    <p style={{fontSize:"22px", padding: "10px 30px"}}>{this.props.content}</p>
                    <div className="comfirmButton" style={buttonGroup}>
                        <button style={{color: "white",background:"#098625", padding:"3px 10px", border:'none', borderRadius:"3px", display:this.props.canDeleteCar==true?"none":"block"}} onClick={this.deleteCar}>Đồng ý</button>
                        <button style={{color: "white",background:"red", padding:"3px 10px", border:'none', borderRadius:"3px",}} onClick={()=>this.props.close()}>Bỏ qua</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirm;