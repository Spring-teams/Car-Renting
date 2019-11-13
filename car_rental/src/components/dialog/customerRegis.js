import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="regis-background" style={{display: this.props.show}}>
        <div className="regis-main" id="sign-up-dialog">
            <h3>Đăng ký</h3>
          <p>Bạn phải nhập tất cả các trường có dấu *</p>
          <div className="sign-up-container">
            <div className="sign-up-wrapper">
              <div>
                Họ và tên:<font>*</font>{" "}
              </div>
              <input name="name" className="must-fill" />
              <span className="warning"></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Số CMND: <font>*</font>{" "}
              </div>
              <input name="customerId" class="must-fill" />
              <span className="warning"></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Ngày sinh:<font>*</font>{" "}
              </div>
              <input placeholder="yy-mm-dd" name="birthday" className="must-fill" />
              <span className="warning"></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Số điện thoại:<font>*</font>{" "}
              </div>
              <input name="phone" className="must-fill" />
              <span className="warning"></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Email:<font>*</font>{" "}
              </div>
              <input name="email" className="must-fill" />
              <span className="warning"></span>
            </div>
            <div className="sign-up-wrapper">
              <div>Tên công ty: </div>
              <input name="companyName" />
            </div>
            <div className="sign-up-wrapper">
              <div>
                Mật khẩu:<font>*</font>{" "}
              </div>
              <input name="pass" class="must-fill" />
              <span class="warning"></span>
            </div>
            <div className="sign-up-wrapper">
              <div>
                Nhập lại mật khẩu:<font>*</font>{" "}
              </div>
              <input />
              <span className="warning"></span>
            </div>
            <div className="sign-up-button-wrapper">
              <button className="regis-discard">Bỏ qua</button>
              <button className="register">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;