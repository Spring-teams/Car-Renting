import React from "react";
import "../../css/bootstrap.min.css";
class Search extends React.Component {
  constructor(props) {
	super(props);
	this.state={
		branch: "Tất cả",
		numberSeat: "Tất cả",
		category:"Tất cả",
	}
	this.handleChangeBranch=this.handleChangeBranch.bind(this);
	this.handleChangeCategory=this.handleChangeCategory.bind(this);
	this.handleChangeNumberSeat= this.handleChangeNumberSeat.bind(this);
  }

  handleChangeBranch(event){
	if(event.target.value=="Tất cả"){
		this.setState({branch: ""})
	  }
	  this.setState({branch: event.target.value})
  }
  handleChangeNumberSeat(event){
	  if(event.target.value=="Tất cả"){
		this.setState({numberSeat: ""})
	  }
	  this.setState({numberSeat: event.target.value})
  }
  handleChangeCategory(event){
	if(event.target.value=="Tất cả"){
		this.setState({category: ""})
	  }
	
	if(event.target.value=="Xe du lịch"){
		this.setState({category: "1"})
	}
	if(event.target.value=="Xe thể thao"){
		this.setState({category: "2"})
	}
	if(event.target.value=="Xe thương mại"){
		this.setState({category: "3"})
  }
  if(event.target.value=="Khác"){
    this.setState({category: "4"})
  }
  }
  

  render() {
    return (
      <div id="menu-bar">
        <div className="row text-center">
          
        </div>
        <div className="mt-2 search-sort">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Hãng xe</label>
                <select className="form-control" onChange={this.handleChangeBranch}>
                  <option>Tất cả</option>
                  <option>Mercedes</option>
                  <option>Ford</option>
                  <option>Honda</option>
                  <option>Mazda</option>
                  <option>Toyota</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Số chỗ ngồi</label>
                <select className="form-control" onChange={this.handleChangeNumberSeat}>
                  <option>Tất cả</option>
                  <option>2</option>
                  <option>4</option>
                  <option>7</option>
                  <option>16</option>
                  <option>29</option>
                </select>
              </div>
            </div>
            {/* <div className="col">
              <div className="form-group">
                <label>Tên xe</label>
                <input type="text" className="form-control" name="" />
              </div>
            </div> */}
            <div className="col">
              <div className="form-group">
                <label>Loại xe</label>
                <select className="form-control" onChange={this.handleChangeCategory}>
                  <option>Tất cả</option>
                  <option id="1">Xe du lịch</option>
                  <option id="2">Xe thể thao</option>
                  <option id="3">Xe thương mại</option>
                  <option id="4">Khác</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group" style={{marginTop: "45px"}}>
                <button className="btn btn-success" onClick={()=>this.props.handleSearch(this.state.branch,this.state.numberSeat,this.state.category)}>Tìm kiếm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
