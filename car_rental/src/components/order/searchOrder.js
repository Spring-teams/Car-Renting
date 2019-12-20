import React, { Component } from 'react';

class searchOrder extends Component {
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
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <input type="text" style={styleSearchBox} />
                        <button style={styleButtonSearch}>Tìm Kiếm</button>
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
                                <a className="dropdown-item" href="anchor">
                                    Tất cả
								</a>
                                <a className="dropdown-item" href="anchor">
                                    Bị hủy
								</a>
                                <a className="dropdown-item" href="anchor">
                                    Đã xác nhận
								</a>
                                <a className="dropdown-item" href="anchor">
                                    Đang đợi xác nhận
								</a>
                                <a className="dropdown-item" href="anchor">
                                    Quá hạn
								</a>
                                <a className="dropdown-item" href="anchor">
                                    Đang thuê
								</a>
                                <a className="dropdown-item" href="anchor">
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
