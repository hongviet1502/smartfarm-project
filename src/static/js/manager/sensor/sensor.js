import showAlert from "../../alert.js";

var process_load;
$('.close').click(function(){
    clearInterval(process_load);
})
// $(".btn_add_sensor").click(function() {
//     const numb = document.querySelector("#number");
//     let counter = 59;
//     let res = null;
//     numb.textContent = 59 + "s còn lại";
//     $(".modal-footer").css("display", "none");
//     $(".modal-body-text").css("display", "flex");
//     $(".modal-body-text").text("Hệ thống đang dò tìm thiết bị. Vui lòng chờ trong giây lát.");
//     $(".loader").css({
//                     "border": "7px solid #E5E5E5", 
//                     "border-top": "10px solid #2C698D",
//                     "border-bottom": "10px solid #2C698D",
//                     "animation": "spin 2s linear infinite"});
    
//     var id_greenhouse = $('#id_greenhouse').text();

//     process_load = setInterval(function(){ 
//         if(counter == 0 ){
//             clearInterval(process_load);
//             $(".modal-footer").css("display", "flex");
//             $(".modal-body-text").css("display", "none");
//             $(".loader").css({"border": "7px solid #E5E5E5", "animation": "none"});
//             numb.textContent = "Không tìm thấy thiết bị mới"
//         }
//         else{
//             counter-= 1;
//             numb.textContent = counter + "s còn lại";
//         }

//     }, 1000);
// });

$('#edit_relay').click(function(){
    if($('#name_relay').val() == $('#name_relay').attr("placeholder")){
        showAlert("Không thể đặt tên giống với tên cũ!","Cập nhật","danger")
    }
    else if ($('#name_relay').val() == ''){
        showAlert("Phải nhập vào tên cảm biến!","Cập nhật","danger")
    }
    else if ($('#modalEditRelay #min').val() != '' && $('#modalEditRelay #max').val() != '' && $('#modalEditRelay #min').val() > $('#modalEditRelay #max').val()){
        showAlert("Giá trị min phải nhỏ hơn giá trị max!","Cập nhật","danger")
    }
    else{

        var checked = 1;
        $("#modalEditRelay .nb").each(function(){
            
            if(Number($(this).val()) == 0 ){
                checked = checked * 1;
            }
            else
                checked = checked * Number($(this).val());

        });
        if(checked < 0){
            showAlert("Các giá trị nhập vào không thể âm!","Cập nhật","danger") 
        }
        else{
            var sensor = {};
            if ($('#name_relay').val() != '')
                sensor['name'] = $('#name_relay').val();
            sensor['_id'] = $('#mac_relay').val();
            sensor['timeUpdate'] =  Number($('#modalEditRelay #timeUpdate').val());
            if ($('#modalEditRelay #max').val() != '')
                sensor['max'] = $('#modalEditRelay #max').val();
        
            if ($('#modalEditRelay #min').val() != '')
                sensor['min'] = $('#modalEditRelay #min').val();

            if ($('#modalEditRelay #calib1').val() != '')
                sensor['paramA'] = $('#modalEditRelay #calib1').val();
            
            if ($('#modalEditRelay #calib2').val() != '')
                sensor['paramB'] = $('#modalEditRelay #calib2').val();
            
            if ($('#modalEditRelay #calib3').val() != '')
                sensor['paramC'] = $('#modalEditRelay #calib3').val();

            $("#modalEditRelay").modal("hide");
            if (Object.keys(sensor).length <= 1){
                $('#modalEditRelay').modal("hide");
                showAlert("Không có thông tin nào cần thay đổi!","Cập nhật","danger")
            }
            
            else{
                $("#wait-load").modal("show", {backdrop: 'static', keyboard: false});
                
                $.ajax({
                    url: "/manager/sensor",
                    type: "UPDATE",
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(sensor),
                    dataType: 'json',
                    success: function(response) {
                        $("#wait-load").modal("hide");
                        if (response['status']['code'] == 200) {
                            showAlert("Đã cập nhật thông tin cảm biến thành công!","Cập nhật","success")
                        }
                        else{
                            showAlert("Hệ thống đang gặp lỗi, vui lòng thử lại sau","Cập nhật","danger")
                        }

                        setTimeout(function(){
                            window.location.reload();
                        }, 2000)
                    }
                });
            }
        }
    }
});

$("#confirm-delete").click(function(){
    $("#deleteSensor").modal("hide");
    var Id = $('#sensor_mac_delete').val();
    $("#wait-load").modal("show", {backdrop: 'static', keyboard: false});
    
    // $.ajax({
    //     url: "/manager/sensor",
    //     type: "DELETE",
    //     contentType: "application/json;charset=utf-8",
    //     data: JSON.stringify(Id),
    //     dataType: 'json',
    //     success: function(response) {
            
    //         $("#wait-load").modal("hide");
    //         if (response['status'] == true)
    //             showAlert("Đã xóa thành công cảm biến","Xóa thiết bị","success")
    //         else
    //             showAlert(response['msg'],"Xóa thiết bị","danger")

    //         setTimeout(function(){
    //             window.location.reload();
    //         }, 2000)

    //     },
    //     error: function(error) {
    //         $("#wait-load").modal("hide");
    //         console.log(error);
    //     }
    // });
})

$('#update-change2').click(function() {
    $('#model-alert2').modal('hide');
    if ($(this).val() == '1'){
        $("#wait-load").modal("show", {backdrop: 'static', keyboard: false});
        window.location.reload();
    }
    else if($(this).val() == '2'){
        $('#addSensor').modal("show");
    }
    else{
        $('#modalEditRelay').modal("show");
    }
});

