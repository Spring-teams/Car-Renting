$(document).ready(function(){
    $("#sign-up-dialog").dialog({
        height: 600,
        width: 500,
        modal: true,
        autoOpen: false,
        resizable: false,
        show: {effect: 'fade', duration: 250},
        hide: {effect: 'fade', duration: 250}
    });
    $("input[name=birthday]").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true
    });
    $("input[class=must-fill]").blur(function(){
        if($(this).val()!=""){
            $(this).removeClass("red-border");
            $(this).next("span").css("display","none");
        }
    });
    $(".login-form").on("click",".form-register",function () {
       $("#sign-up-dialog").dialog('open');
    });
    $("#sign-up-dialog").on("click",".regis-discard",function () {
        $("#sign-up-dialog").dialog("close");
    });
    $("#sign-up-dialog").on("click",".register",function () {
        if(!checkInput()){
            return;
        }
        var data=getAllInforFromInput();
        $.ajax({
            url:"/api/addcustomer",
            type:'POST',
            contentType: "application/json",
            dataType: "text",
            data: JSON.stringify(data),
            success: function(res){
                if(res=='fail'){
                    alert("Lỗi thêm khách hàng từ server!");
                } else {
                    alert("ok");
                    $("#sign-up-dialog").dialog("close");
                }
            },
            error: function () {
                alert("Lỗi thêm khách hàng từ client!")
            }
        });
    })
})
function getAllInforFromInput(){
    var inputList=$("#sign-up-dialog input");
    var Object={};
    $.each(inputList, function (index,item) {
        if($(this).attr('name')){
            if($(this).attr('name')=='gender' ){
                if($(this).prop("checked")){
                    Object['gender']=$(this).attr("value");

                }
            }
            else Object[$(this).attr('name')]=$(this).val();
        }

    });

    return Object;
}
function checkInput() {
    var listMustFill=$("input[class=must-fill]");
    var flag=true;
    $.each(listMustFill,function (index,item) {
        if($(this).val()==""){
            $(this).next("span").css("display","block");
            flag=false;
        }
    });
    return flag;

}