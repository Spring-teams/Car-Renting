# Hệ thống cho thuê xe trực tuyến 

## Cơ sở dữ liệu


### Xác định các thực thể

* **Customer** (Người cần thuê xe): là những người có nhu cầu thuê xe trong thời gian ngắn.

Thuộc tính | Kiểu|Mô tả
-----------|------|-----
customerId|int |Mã khách hàng (Số CMND)
name|varchar|Tên khách hàng
phone|varchar|Số điện thoại khách hàng
pass|varchar|Mật khẩu
companyName|varchar|Tên công ty
birthday|datetime|Ngày sinh
email|varchr|Email

* **Owner** (Chủ xe): Là những người có xe và có nhu cầu cho thuê.

Thuộc tính|Kiểu|Mô tả
---|--|--
OwnerId|int|Mã chủ xe (Số CMND)
name|varchar|Tên chủ xe
phone|varchar|Số điện thoại chủ xe
pass|varchar|Mật khẩu
birthday|datetime|Ngày sinh
companyName|varchar|Tên công ty
email|varchar|Email
 * **Car**(Xe cho thuê): Là xe có giá trị cho thuê
 
 Thuộc tính|Kiểu|Mô tả
 -|-|-
 carId|varchar|Biển số xe
 categoryid|int|Mã loại xe
 ownerId|int|Mã chủ xe
 price|int|giá thuê trong 1 ngày
 carName|varchar|Tên xe
 branch|varchar|Hãng xe
 numberSeat|int|Số ghế
 image|varchar|Ảnh xe
 
 * **Category**(Phân loại xe)

 Thuộc tính|Kiểu|Mô tả
 -|-|-
 categoryId|int|Mã loại xe
 categoryName|varchar|tên loại xe


* **Rental**(Đơn hàng): Do liên kết giữa Customer và Ownwer là m-n nên sẽ sinh ra một bảng rental để thể hiện mối quan hệ giữa 2 thực thể này.

Thuộc tính | Kiểu | Mổ tả
--|--|--
rentalId|int| Mã đơn hàng (auto increment)
customerId|int|Mã khách hàng
carId| varchar|Mã xe
ownerId|int|Mã chủ xe
beginDate|datetime|Ngày bắt đầu thuê
endDate|datetime|Ngày kết thúc thuê
totalMoney|int|Tống số tiền thanh toán
isRent|int|Trạng thái đang thuê (0,1)
isPay|int|Trạng thái đã trả xe (0,1)
isConfirm|int|Trạng thái đã xác nhận cho thuê (0,1)
address|varchar|Địa chỉ giao nhận xe


### Sơ đồ thực thể liên kết
![CSDL](db.jpg)




