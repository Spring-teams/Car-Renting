$(document).ready(function(){
    var car= new Car();

    $(".menu-content").on("click",".filter",function(){

        if($(this).hasClass("color-button")){
            $(this).removeClass("color-button");
        }
        else{
            $('.filter').removeClass("color-button");
            $(this).addClass("color-button");
        }
    });

    $(".menu-content").on("click","#find-button",function () {

        var seatNumber=$(".color-button").attr('id');
        if(seatNumber==null){
            car.loadAllToView();
            return;
        }
        var branch=$("select option:selected ").html();
        car.filterCar(seatNumber,branch);

    });
    $(".let-rent").on("click",function(){
        var parent=$(this).parent();
        var carId=parent.find(".carId").attr('name');
        window.open('/getSubmitForm?id='+carId);

    });
});

function Car(){
    this.loadAllToView();
};
Car.prototype={
    constructor: Car,
    getAllCar: function () {
        var data={};
        $.ajax({
            url: "api/getallcar",
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res){
                data=res;

            },
            error: function(){
                alert("Lỗi từ client");
            }
        });
        return data;
    },
    getWrapper: function(item){
        var wrapper=$("<div class=\"wrapper\">\n" +
            "                <div class=\"car-image\"></div>\n" +
            "                <div class=\"car-content\">\n" +
            "                    <div class=\"car-header\">\n" +
            "                        <div class=\"car-name\">"+item.carName+"</div>\n" +
            "                        <div class=\"car-price\">"+item.price+"</div>\n" +
            "                    </div>\n" +
            "                    <hr>\n" +
            "                    <div class=\"car-info\">\n" +
            "                        <div class=\"car-branch\">\n" +
            "                            <i class=\"icon\"></i>\n" +
            "                            Nhãn hiệu:"+item.branch+"\n" +
            "                        </div>\n" +
            "                        <div class=\"setting\">\n" +
            "                            <i class=\"icon\"></i>\n" +
            "                            Hộp số: Tự động\n" +
            "                        </div>\n" +
            "                        <div class='number-seat'><i class='icon'></i> Số ghế: " + item.numberSeat+" chỗ</div>\n" +
            "                        <div class=\"ventor\">\n" +
            "                            <i class=\"icon\"></i>\n" +
            "                            Máy lạnh: có\n" +
            "                        </div>\n" +
            "                        <div class=\"battery\">\n" +
            "                            <i class=\"icon\"></i>\n" +
            "                            Tiêu hao: 5 L/100km\n" +
            "                        </div>\n" +
            "                        <button class=\"let-rent\">Thuê Ngay</button>\n" +
            "                        <div class=\"carId\" name="+item.carID+">\n" +
            "                            <i class=\"icon\"></i>\n" +
            "                            Biển số: " + item.carID+"\n"+
            "                        </div>\n" +
            "                        <div class=\"limit\">\n" +
            "                            <i class=\"icon\"></i>\n" +
            "                            Giới hạn: 250 km/ngày\n" +
            "                        </div>\n" +
            "                        <div class='category'><i class='icon'></i>Loại xe: " +item.categoryName +"</div>\n" +
            "\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "\n" +
            "            </div>");
        return wrapper;
    },
    loadAllToView: function(){
        var data = this.getAllCar();
        var me=this;
        var main_content=$(".main-content");
        main_content.empty();
        $.each(data,function(index,item){
            main_content.append(me.getWrapper(item));
        });
    },
    filterCar: function(numberSeat,branch){
        var me=this;

        var data=this.getAllCar();
        var main_content=$(".main-content");
        main_content.empty();
        $.each(data,function(index,item){
            if(item.numberSeat==numberSeat && (item.branch==branch || branch=="Tất cả hãng xe")){
                main_content.append(me.getWrapper(item));

            }
        })

    }
}