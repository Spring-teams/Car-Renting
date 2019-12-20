import React from "react";
import Head from "../customer/head";
import { NONAME } from "dns";
import DatePicker from "react-datepicker";
import UpdateSuccess from "../dialog/UpdateSuccess";
import OwnerHead from "./OwnerHead";
import "../../css/ownerInfo.css"

class OwnerInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			OwnerInfo: "",
			show: "none",
			readOnly: true,
			old_info: {},
			birthday: new Date(),
			showSuccessDialog: false,
			warning: {},
			isload: false,
			openIdError: " ",
			errorContent: "ID đã được sử dụng",
			defaultWarning: {}
		};
		// this.componentDidMount = this.componentDidMount.bind(this);
		this.validInput = this.validInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount = () => {
		fetch("/api/getOwner/")
			.then(res => res.json())
			.then(data => {
				this.setState({
					OwnerInfo: data[0],
					old_info: data[0]
				});
			})
			.then(() => {
				let obj = JSON.parse(JSON.stringify(this.state.OwnerInfo));
				obj["birthday"] = new Date(obj['birthday'].slice(0, 4), parseInt(obj['birthday'].slice(5, 7)) < 10 ? parseInt(obj['birthday'].slice(5, 7)) - 1 : "0" + (parseInt(obj['birthday'].slice(5, 7)) - 1), parseInt(obj['birthday'].slice(8, 10)) + 1 < 10 ? parseInt(obj['birthday'].slice(8, 10)) + 1 : "0" + (parseInt(obj['birthday'].slice(8, 10)) + 1));

				console.log(obj['birthday'])
				this.setState({
					OwnerInfo: obj,
					isload: true,
					birthday: obj['birthday']
				});
				// console.log(obj['birthday'].slice(0,4) +" "+ obj['birthday'].slice(5,7) +" "+obj['birthday'].slice(8,10))
			})
		let obj = {
			"ownerName": 0,
			"ownerId": 0,
			'birthday': 0,
			'email': 0,
			'pass': 0,
			'companyName': 0,
			'phone': 0
		}
		this.setState({
			warning: obj,
			defaultWarning: JSON.parse(JSON.stringify(obj))
		})

	}
	//   componentWillMount(){
	//     fetch("/api/checkLogin")
	//     .then(res=>res.text())
	//     .then((data)=>{
	//       if(data=='false'){
	//         window.location.href="/login";
	//       }
	//     })
	//   }
	async validInput() {
		let obj = this.state.OwnerInfo;
		let warning = this.state.warning;
		let isOk = true;
		if (!phoneValidate(obj['phone'])) {
			isOk = false;
			warning['phone'] = 1;

			this.setState({
				errorContent: "Định dạng điện thoại không hợp lệ",
				openIdError: "show"
			})
		}
		for (let proper in obj) {
			if (obj[proper] == "" && warning.hasOwnProperty(proper)) {
				warning[proper] = 1;
				isOk = false;
				this.setState({
					errorContent: "Bạn phải nhập các trường có dấu *",
					openIdError: "show"
				})
			}
		}

		this.setState({
			warning: warning
		});
		if (this.state.OwnerInfo["ownerId"] != this.state.old_info["ownerId"]) {
			await fetch("/api/owner/checkExist/" + this.state.OwnerInfo["ownerId"])
				.then(res => res.text())
				.then(data => {
					if (data == "true") {
						this.setState({ openIdError: "show", errorContent: "ID đã được sử dụng" });
						isOk = false;
					} else this.setState({ openIdError: " " });
				})
				.then(() => {
					return isOk;
				})
		}

		return isOk;
	};

	showDialogSuccess = () => {
		this.setState({
			showSuccessDialog: true
		})
	}
	openButton = () => {
		this.setState({
			show: "inline",
			readOnly: false
		});
	}
	closeButton = () => {
		let obj = JSON.parse(JSON.stringify(this.state.old_info))
		obj["birthday"] = new Date(obj['birthday'].slice(0, 4), parseInt(obj['birthday'].slice(5, 7)) < 10 ? parseInt(obj['birthday'].slice(5, 7)) - 1 : "0" + (parseInt(obj['birthday'].slice(5, 7)) - 1), parseInt(obj['birthday'].slice(8, 10)) + 1 < 10 ? parseInt(obj['birthday'].slice(8, 10)) + 1 : "0" + (parseInt(obj['birthday'].slice(8, 10)) + 1));
		this.setState({
			show: "none",
			readOnly: true,
			OwnerInfo: obj,
			openIdError: " ",
			warning: JSON.parse(JSON.stringify(this.state.defaultWarning))
		});
	}
	handleEdit = () => {
		this.openButton();
	}
	handleName = (event) => {
		let obj = JSON.parse(JSON.stringify(this.state.OwnerInfo));
		obj["ownerName"] = event.target.value;
		let warning = JSON.parse(JSON.stringify(this.state.warning));
		obj['birthday'] = this.state.birthday;
		if (event.target.value != "") {
			warning['ownerName'] = 0;
			this.setState({ openIdError: " " })
		}
		this.setState({
			OwnerInfo: obj,
			warning: warning
		});
	}
	handleId = (event) => {
		let obj = JSON.parse(JSON.stringify(this.state.OwnerInfo));
		obj["ownerId"] = event.target.value;
		obj['birthday'] = this.state.birthday;
		let warning = JSON.parse(JSON.stringify(this.state.warning))
		if (event.target.value != "") {
			warning['ownerId'] = 0;
			this.setState({ openIdError: " " })
		}
		this.setState({
			OwnerInfo: obj,
			warning: warning
		});
	}
	handleBirthDay = (event) => {
		this.setState({
			birthday: event
		});

		let obj = JSON.parse(JSON.stringify(this.state.OwnerInfo));
		// obj["birthday"] = begin;
		obj['birthday'] = event;
		this.setState({ openIdError: " " })
		this.setState({
			OwnerInfo: obj
		});
	}
	handleEmail = (event) => {
		let obj = JSON.parse(JSON.stringify(this.state.OwnerInfo));
		obj["email"] = event.target.value;
		obj['birthday'] = this.state.birthday;

		let warning = JSON.parse(JSON.stringify(this.state.warning))
		if (event.target.value != "") {
			warning['email'] = 0;
			this.setState({ openIdError: " " })
		}
		this.setState({
			OwnerInfo: obj,
			warning: warning
		});
	}
	handlePass = (event) => {
		let obj = JSON.parse(JSON.stringify(this.state.OwnerInfo));
		obj["pass"] = event.target.value;
		let warning = JSON.parse(JSON.stringify(this.state.warning));
		obj['birthday'] = this.state.birthday;
		if (event.target.value != "") {
			warning['pass'] = 0;
			this.setState({ openIdError: " " })
		}
		this.setState({
			OwnerInfo: obj,
			warning: warning
		});
	}
	handleCompany = (event) => {
		let obj = JSON.parse(JSON.stringify(this.state.OwnerInfo));
		obj["companyName"] = event.target.value;
		let warning = JSON.parse(JSON.stringify(this.state.warning));
		obj['birthday'] = this.state.birthday;
		if (event.target.value != "") {
			warning['companyName'] = 0;
			this.setState({ openIdError: " " })
		}
		this.setState({
			OwnerInfo: obj,
			warning: warning
		});
	}
	handlePhone = (event) => {
		let obj = JSON.parse(JSON.stringify(this.state.OwnerInfo));
		obj["phone"] = event.target.value;
		let warning = JSON.parse(JSON.stringify(this.state.warning));
		obj['birthday'] = this.state.birthday;
		if (event.target.value != "") {
			warning['phone'] = 0;
			this.setState({ openIdError: " " })
		}
		this.setState({
			OwnerInfo: obj,
			warning: warning
		});
	}
	async handleSubmit() {
		let result = await this.validInput();
		if (!result) {
			return;
		}
		let data = JSON.parse(JSON.stringify(this.state.OwnerInfo));
		data["old_id"] = this.state.old_info["ownerId"];
		let e = new Date(data['birthday']);
		let begin = new Date(e.getFullYear(), e.getMonth(), e.getDate());
		data['birthday'] = formatDate(begin);
		fetch("/api/updateOwner", {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(res => res.text())
			.then(data => {
				if (data == 'true') {
					this.showDialogSuccess();
				}
			})

	}
	render() {
		let owner = this.state.OwnerInfo;

		return (
			<div id="owner-info">
				<OwnerHead owner={owner} />
				<div className="info-container">
					<i className="fas fa-edit icon" onClick={this.handleEdit}></i>
					<h2>Thông tin cá nhân</h2>
					<div className="customer-info-wrapper">
						<div className="label">Họ và tên<font style={{ display: this.state.show }}>*</font></div>
						<input
							readOnly={this.state.readOnly}
							className="must-fill"
							name="name"
							value={owner.ownerName}
							onChange={this.handleName}
						/>
						<span className="warning" style={{ opacity: this.state.warning['ownerName'] }}></span>
						<font></font>
					</div>
					<div className="customer-info-wrapper">
						<div className="label">Số CMND<font style={{ display: this.state.show }}>*</font> </div>
						<input
							readOnly={this.state.readOnly}
							className="must-fill"
							name="customerId"
							value={owner.ownerId}
							onChange={this.handleId}
						/>
						<span className="warning" style={{ opacity: this.state.warning['ownerId'] }}></span>
					</div>
					<div className="customer-info-wrapper birthday">
						<div className="label" style={{paddingLeft:"32px"}}>Ngày sinh <font style={{ display: this.state.show }}>*</font></div>
						<DatePicker
							className="must-fill"
							selected={this.state.isload ? owner['birthday'] : new Date()}
							onChange={this.handleBirthDay}
							dateFormat="yyyy-MM-dd"
							timeCaption="Heure"
							showDisabledMonthNavigation
							readOnly={this.state.readOnly}
						/>

						<span className="warning" style={{ opacity: this.state.warning['birthday'] }}></span>
					</div>
					<div className="customer-info-wrapper">
						<div className="label"> Email<font style={{ display: this.state.show }}>*</font></div>
						<input
							readOnly={this.state.readOnly}
							className="must-fill"
							name="email"
							value={owner.email}
							onChange={this.handleEmail}
						/>
						<span className="warning" style={{ opacity: this.state.warning['email'] }}></span>
					</div>
					<div className="customer-info-wrapper">
						<div className="label"> Mật khẩu<font style={{ display: this.state.show }}>*</font> </div>
						<input
							type="password"
							readOnly={this.state.readOnly}
							className="must-fill"
							name="pass"
							value={owner.pass}
							onChange={this.handlePass}
						/>
						<span className="warning" style={{ opacity: this.state.warning['pass'] }}></span>
					</div>
					{/* <div className="customer-info-wrapper">
          <div>Nhập lại mật khẩu: </div>
          <input type="password" readOnly className="must-fill" value={customer.pass} />
          <span className="warning"></span>
        </div> */}

					<div className="customer-info-wrapper">
						<div className="label">Công ty </div>
						<input
							readOnly={this.state.readOnly}
							name="companyName"
							value={owner.companyName}
							onChange={this.handleCompany}
						/>
						<span className="warning" style={{ opacity: this.state.warning['companyName'] }}></span>
					</div>
					<div className="customer-info-wrapper">
						<div className="label">Số điện thoại<font style={{ display: this.state.show }}>*</font> </div>
						<input
							readOnly={this.state.readOnly}
							className="must-fill"
							name="phone"
							value={owner.phone}
							onChange={this.handlePhone}
						/>
						<span className="warning" style={{ opacity: this.state.warning['phone'] }}></span>
					</div>
					<div className="info-button-wrapper">
						<button
							className="update-info-discard"
							style={{ display: this.state.show }}
							onClick={this.closeButton}
						>
							Bỏ qua
            </button>
						<button
							className="update-info-save"
							style={{ display: this.state.show }}
							onClick={this.handleSubmit}
						>
							Lưu
            </button>
					</div>
				</div>
				<UpdateSuccess show={this.state.showSuccessDialog} url="/chothuexe/thong-tin-ca-nhan" />
				<div className={"id-error " + this.state.openIdError}>
					<p>{this.state.errorContent}</p>
				</div>
			</div>
		);
	}
}
function formatDate(date) {
	let temp = date;

	let a = temp.getDate() > 9 ? temp.getDate() : "0" + temp.getDate();
	return temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + a;
}

function phoneValidate(number) {
	let regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
	return regex.test(number);
}
export default OwnerInfo;
