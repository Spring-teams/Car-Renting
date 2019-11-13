$(document).ready(function () {
    $(".swiper-container").css("background-image","url('images/"+$(".swiper-container").attr('id')+".png')");
    var totalPrice=0;

    $("#datetimepicker4,#datetimepicker5").on('change',function(){
        let beginDate=$("#datetimepicker4").val().split("-");
        let endDate=$("#datetimepicker5").val().split("-");
        beginDate=new Date(beginDate[0],beginDate[1],beginDate[2]);
        endDate=new Date(endDate[0],endDate[1],endDate[2]);

        let diffDate=Math.abs(endDate-beginDate)/(1000*60*60*24);
        let price=parseInt($("h3[id]").attr("id"));
        price=price*diffDate;

        if(price!==price || beginDate > endDate){
            return;
        }
        $("#total").text(formatNumber(price)+" Đồng");
        let listCheck=$("input[type=checkbox]");
        $.each(listCheck,function (index,item) {
            if($(this).prop("checked")){
                price+=parseInt($(this).attr('price'));

            }
        })
        $("#total-day").text(diffDate);
        $("#all-total").text(formatNumber(price)+" Đồng");
        totalPrice=price;
    });
    $("input[type=checkbox]").on("change",function(){
        if($(this).prop('checked')){
            totalPrice=totalPrice+parseInt($(this).attr('price'));
        }
        else {
            totalPrice=totalPrice-parseInt($(this).attr('price'));
        }
        $("#all-total").text(formatNumber(totalPrice) + " Đồng");
    });
    blurInput();
    $(".container").on("click","#submit",function(){
        let rental=getAllInfo(totalPrice);
        if(validForm()){

            $.ajax({
                url: "api/addrental",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(rental),
                dataType: "text",
                async: false,
                success: function (res) {
                    if(res=="ok"){
                        alert("Thành công!");
                    }
                    else alert("Error from server!");
                },
                error: function(){
                    alert("Error from client!")
                }
            })
        }

    });

})

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function getAllInfo(totalMoney) {
    let rental={};
    rental["customerId"]=$("body").attr("customerid");
    rental["ownerId"]=$("body").attr("ownerid");
    rental["carId"]=$("body").attr("carid");
    rental["beginDate"]=$("#datetimepicker4").val();
    rental["endDate"]=$("#datetimepicker5").val();
    rental["totalMoney"]=totalMoney;
    rental["isRent"]=0;
    rental["isConfirm"]=0;
    rental["isPay"]=0;
    rental["address"]=$("#address").val();
    return rental;
}
function validForm(){
    let location="#description-car";
    let isok=true;
    if($("#datetimepicker4").val()==""){
        $("#datetimepicker4").addClass("red-border");
        // location="#datetimepicker4";
        isok=false;
    }
    if($("#datetimepicker5").val()==""){
        $("#datetimepicker5").addClass("red-border");
        // location="#datetimepicker4";
        isok=false;
    }
    if($("#address").val()==""){
        $("#address").addClass("red-border");
        // location="#address";
        isok=false;
    }
    if($("#datetimepicker4").val()!="" && $("#datetimepicker5").val()!=""){
        let beginDate=$("#datetimepicker4").val().split("-");
        let endDate=$("#datetimepicker5").val().split("-");
        beginDate=new Date(beginDate[0],beginDate[1],beginDate[2]);
        endDate=new Date(endDate[0],endDate[1],endDate[2]);
        if(endDate<=beginDate){
            $("#datetimepicker4").addClass("red-border");
            $("#datetimepicker5").addClass("red-border");
            isok=false;

        }
    }


    if(isok==false) {
        window.location=location;
    }
    return isok;

}
function blurInput(){
    $("#address,#datetimepicker4,#datetimepicker5").blur(function () {
        if($("#address").val()!=""){
            $("#address").removeClass("red-border");
        }
        if($("#datetimepicker4").val()!=""){
            $("#datetimepicker4").removeClass("red-border");
        }
        if($("#datetimepicker5").val()!=""){
            $("#datetimepicker5").removeClass("red-border");
        }
    })

}
