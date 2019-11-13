$(document).ready(function(){
    var car= new Car();
    var isLogin;
    if($("#login").length){
        isLogin=false;
    }
    else isLogin=true;

    $(".card-car").on("click",".price",function(){
        if(!isLogin){
            window.open("/login","_self");
            return;
        }
        let carid= $(this).parent().attr("id");
        let customerid=$("body").attr("id");
        window.open("/getSubmitForm?carid="+carid+"&customerid="+customerid);
    });
    $("#login,#logout").on("click",function () {
        window.open("/"+$(this).attr('id'),"_self");
    });
    var rental = new Rental();
    rental.loadToView();
    $("#myBtnContainer #isConfirm").addClass("blue-background");
    rental.filter("isConfirm");
    $("#myBtnContainer").on("click",".btn",function(){
        var id= $(this).attr("id");
        rental.filter(id);
        let allBtn = $("#myBtnContainer button");
        $.each(allBtn,function (index,item) {
            $(this).removeClass("blue-background");
        })
        $(this).addClass("blue-background");

    })

});

function Car(){
    this.loadToView();
}
Car.prototype= {
    constructor: Car,
    getAllCar:function() {
        let data = {};
        $.ajax({
            url: "/api/getallcar",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (res) {
                data = res;

            },
            error: function (res) {
                alert("Lỗi lấy xe");
            }
        });
        return data;
    },
    loadToView: function(){
        let object= this.getAllCar();
        let container=$("#XeTheThao");
        $.each(object , function(index,item){
            var temp=template(item);
            container.append(temp);
        })
    }

}
function template(item){
    let temp=$("<div class=\"card-car\" id='"+item.carID+"'>\n" +
        "\t\t\t\t\t<div class=\"sale\">\n" +
        "\t\t\t\t\t\t<p>ACTIVE</p>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t<div class=\"text-center  img\">\n" +
        "\t\t\t\t\t\t<img src=\"images\\"+item.image+".png\" "+" alt=\"\">\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t<h5 class=\"text-center  mt-2\">"+item.carName+"</h5>\n" +
        "\t\t\t\t\t<div class=\"title\">\n" +
        "\t\t\t\t\t\t<p ><i class=\"fas fa-tag\"></i> Kiểu xe : "+item.categoryName+"</p>\n" +
        "\t\t\t\t\t\t<p><i class=\"fas fa-car\"></i> Hãng: "+item.branch+"</p>\n" +
        "\t\t\t\t\t\t<p><i class=\"fas fa-car\"></i> Biển số: "+item.carID+"</p>\n" +
        "\t\t\t\t\t\t<p><i class=\"fas fa-car\"></i> Chủ xe: "+item.ownerName+"</p>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t<div class=\"price text-center\">\n" +
        "\t\t\t\t\t\t<p>"+item.price+"</p>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t</div>");
    return temp;
}

function Rental(){

}
Rental.prototype={
    constructor: Rental,
    getAllRental: function(){
        let id=$("body").attr("id");
        let data={};
        $.ajax({
            url: "/api/getrental/"+id,
            type: "get",
            contentType: "application/json",
            dataType:"json",
            async: false,
            success: function(res){
                data=res;
            },
            error: function (res) {
                alert("Lỗi lấy rental từ client");
            }
        });
        return data;
    },
    getTemplate: function(rental,car){
        let temp=$("<div class=\"gio-hang-card filterDiv\">\n" +
            "\t\t\t\t\t\t\t<div class=\"row\">\n" +
            "\t\t\t\t\t\t\t\t<div class=\"col-3\">\n" +
            "\t\t\t\t\t\t\t\t\t<img src=\"./images/"+car.image+".png\" class=\"img-fluid\" alt=\"Responsive image\">\n" +
            "\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t<div class=\"col-4\">\n" +
            "\t\t\t\t\t\t\t\t\t<p>Tên xe:"+car.carName+"</p><br>\n" +
            "\t\t\t\t\t\t\t\t\t<p>Biển số:"+car.carID+"</p><br>\n" +
            "\t\t\t\t\t\t\t\t\t<p>Ngày thuê:"+rental.beginDate+"-"+rental.endDate+"</p>\n" +
            "\t\t\t\t\t\t\t\t\t<p>Đơn giá:"+ rental.totalMoney +"VNĐ</p>\n" +
            "\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t<div class=\"col-2 gio-hang-card-status\">\n" +
            "\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success da-nhan\">Đã nhận</button><br>\n" +
            "\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger tu-choi\">Từ chối</button><br>\n" +
            "\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-info da-tra\">Đã trả</button>\n" +
            "\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t\t<div class=\"col-3 thanh-tien\">\n" +
            "\t\t\t\t\t\t\t\t\t<p>Đơn giá: 5.000.000</p><br>\n" +
            "\t\t\t\t\t\t\t\t\t<p>Số ngày thuê: 2</p><br>\n" +
            "\t\t\t\t\t\t\t\t\t<p>Trang trí hoa: 0</p><br>\n" +
            "\t\t\t\t\t\t\t\t\t<p>Thuê tài xế: 0</p><br>\n" +
            "\t\t\t\t\t\t\t\t\t<p>Giao xe tận nơi: 400.000</p><br>\n" +
            "\t\t\t\t\t\t\t\t\t<p class=\"orange\">Tổng:  <span>10.400.000</span></p>\n" +
            "\t\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t\t</div>");
        return temp;
    },
    loadToView: function(){
        let data=this.getAllRental();
        let body = $(".panel-body");
        let me = this;
        body.empty();
        $.each(data.rentals,function(index,item){
            body.append(me.getTemplate(item,data.cars[index]));

        })
    },
    filter(how){
        let data = this.getAllRental();
        let body = $(".panel-body");
        let me = this;
        body.empty();
        if(how=="isConfirm"){
            $.each(data.rentals,function(index,item){
                if(item.confirm==1 && item.isRent==0){
                    body.append(me.getTemplate(item,data.cars[index]));
                }
            })
        }
        else if(how=="isConfirming"){
            $.each(data.rentals,function(index,item){
                if(item.confirm==0 && item.isRent==0){
                    body.append(me.getTemplate(item,data.cars[index]));
                }
            })
        }
        else if(how=="isNotConfirm"){
            $.each(data.rentals,function(index,item){
                if(item.confirm==-1){

                    body.append(me.getTemplate(item,data.cars[index]));
                }
            })
        }
        else if(how=="renting"){
            $.each(data.rentals,function(index,item){
                if(item.confirm==1 && item.isRent==1 && item.isPay==0){

                    body.append(me.getTemplate(item,data.cars[index]));
                }
            })
        }


    },
}