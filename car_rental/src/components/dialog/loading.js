import React from "react";

class Loading extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        
        return (
            <div style={{display: this.props.show, zIndex: 100}} className="loading">

            </div>
        )
    }
}
export default Loading;