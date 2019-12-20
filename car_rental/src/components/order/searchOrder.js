import React, { Component } from 'react';

class searchOrder extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            filterStatus: "Tất cả",
            searchKey:""
        }
    }
    
    onFilter = (e, filterStatus) => {
        e.preventDefault();
        console.log(filterStatus);
        this.setState({
            filterStatus: filterStatus
        })
        this.props.filterStatus(filterStatus);
    }
    onChange = (e) => {
		if (e.target.name === "searchKey") {
			this.setState({
				searchKey: e.target.value
			})
		}
    }
    onSearch = (searchKey) => {
        this.props.onSearch(searchKey)
    }
    render() {
        let styleSearchBox = {
            width: '70%',
            height: '35px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            paddingLeft: '10px'
        };
        let styleButtonSearch = {
            background: '#17a2b8',
            color: 'white',
            height: '35px',
            padding: '0 15px',
            borderRadius: '3px',
            border: '1px solid #ccc'
        };
        let {searchKey} = this.state;
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <input type="text" name="searchKey" value={searchKey} onChange={this.onChange} style={styleSearchBox} />
                        <button style={styleButtonSearch} onClick={() => this.onSearch(searchKey)}>Tìm Kiếm</button>
                    </div>
                    <div className="col">
                        <div className="btn-group" style={{ float: 'right' }}>
                            <button
                                type="button"
                                style={styleButtonSearch}
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Lọc theo trạng thái
							</button>
                            <div className="dropdown-menu" >
                                <a className="dropdown-item" href="anchor" onClick={e => this.onFilter(e, "Tất cả")}>
                                    Tất cả
								</a>
                                <a className="dropdown-item" href="anchor" onClick={e => this.onFilter(e, "Bị hủy")}>
                                    Bị hủy
								</a>
                                <a className="dropdown-item" href="anchor" onClick={e => this.onFilter(e, "Đã xác nhận")}>
                                    Đã xác nhận
								</a>
                                <a className="dropdown-item" href="anchor" onClick={e => this.onFilter(e, "Đợi xác nhận")}>
                                    Đợi xác nhận
								</a>
                                <a className="dropdown-item" href="anchor" onClick={e => this.onFilter(e, "Quá hạn")}>
                                    Quá hạn
								</a>
                                <a className="dropdown-item" href="anchor" onClick={e => this.onFilter(e, "Đang thuê")}>
                                    Đang thuê
								</a>
                                <a className="dropdown-item" href="anchor" onClick={e => this.onFilter(e, "Đã thuê")}>
                                    Đã thuê
								</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default searchOrder;
