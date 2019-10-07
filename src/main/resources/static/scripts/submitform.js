$(document).ready(function(){
    $( ".input-begin-date,.input-end-date").datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
        autoClose: true
    });
    // set car image
    var imageName=$(".form-car-image").attr("imageName");
    var imageFile="url('./images/"+imageName+'.png'+"')";
    var price;
    $(".form-car-image").css("background-image",imageFile)


    $(".input-end-date,.input-begin-date").on("change",function () {
        var beginDate=$(".input-begin-date").val().split("-");
        var endDate=$(".input-end-date").val().split("-");

        if(beginDate.length==1 || endDate.length==1){
            return ;
        }

        beginDate=new Date(beginDate[2],beginDate[1],beginDate[0]);
        endDate=new Date(endDate[2],endDate[1],endDate[0]);
        var diffDate=Math.abs(endDate-beginDate)/(1000*60*60*24);
        price=parseInt($(".form-total-money").attr("id"));
        price=price*diffDate;
        $(".form-total-money").text(formatNumber(price)+" Đ");
    });
    // submit button event
    // 4/10/2019 dominhkha
    $(".mustfill input").blur(function(){
        if($(this).val()!=""){
            $(this).removeClass("red-border");
            $(this).next("span").css("display","none");
        }
    })
    $(".div-button").on("click",".confirm-button",function(){

        var customerAndRental=getInforFromForm(price);
        var customer=customerAndRental[0];
        var rental=customerAndRental[1];

        var data_={};
        data_["customer"]=customer;
        data_["rental"]=rental;

        if(validInputForm()){
            $.ajax({
                url:"/api/addcustomerandrental",
                type:"POST",
                contentType:"application/json; charset=utf-8",
                dataType:"text",
                data: JSON.stringify(data_),
                async: false,

                success: function (response) {
                    alert("Xác nhận thành công!");
                    location.reload()
                },
                error: function (response) {
                    alert("lỗi")
                }
            });

        }


    });

})

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function getInforFromForm(price){
    var customerInputProperties=$(".infor-wrapper input[belong=customer]");
    var rentalInputProperties=$(".infor-wrapper input[belong=rental]");
    var customer={};
    var rental={};

    $.each(customerInputProperties,function(index,item){
            customer[$(this).attr('name')]=$(this).val();

    });
    $.each(rentalInputProperties,function(index,item){
        // if($(this).attr('class')=="form-total-money"){
        //     var money=parseInt($(this).text().split(" ")[0]);
        //     rental[$(this).attr('name')]=money;
        // }
        // else {
        //     rental[$(this).attr('name')]=$
        // }
        if($(this).attr("name")=="beginDate" || $(this).attr("name")=="endDate" ){
            var date=$(this).val().split("-").reverse().join("-");
            rental[$(this).attr("name")]=date;
        }
        else {
            rental[$(this).attr('name')]=$(this).val();
        }

    });
    var money=parseInt($(".form-total-money").text().split(' '));
    rental['totalMoney']=price;
    rental['isRent']=0;
    rental['isPay']=0;
    rental['customerId']=customer['customerId'];
    rental['ownerId']=$(".owner").attr('id');
    rental['carId']=$(".form-car-content").attr("id");
    rental['confirm']=0;
    debugger
    return [customer,rental];
}

function validInputForm(){
    var mustFill=$(".mustfill input");
    var isOK=true;
    $.each(mustFill,function(index,item){
       if($(this).val()==""){
           $(this).addClass("red-border");
           $(this).next("span").css("display","block");
           isOK=false;
       }
    });
    return isOK;

}