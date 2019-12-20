import React from "react";
import PropTypes from "prop-types";

class UpdateSuccess extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(){
        window.location.href=this.props.url;
    }
    render(){
        if(!this.props.show){
            return null;
        }
         // The gray background
    const backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50,
        zIndex: 100
      };
  
      // The modal "window"
      const modalStyle = {
        backgroundColor: 'white',
        borderRadius: 5,
        width: "400px",
        height: "190px",
        margin: '0 auto',
        left: "20%",
        margin: "150px auto",
        overflowY: "auto",
        zIndex: 100
      };
        return (
            <div className="backdrop" style={backdropStyle}>
                <div style={modalStyle}>
                    <div className="successContainer">
                        <div className="successContent">
                            <span className="successIcon"></span>
                            <p >Thành công</p>
                        </div>
                        <button onClick={this.handleClick}>Ok, Cool!</button>
                    </div>
                </div>
            </div>
        )
    }
}
UpdateSuccess.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
  };
export default UpdateSuccess;