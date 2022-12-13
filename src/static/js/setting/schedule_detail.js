import showAlert from '../alert.js'

//change color button
$('.schedule__device__item__plus-circle').click(function () {
    if ($(this).attr('value') == 1) {
        $(this).removeClass('used');
        $(this).addClass('not-used');
        $(this).attr('value', '0');
    }
    else {
        $(this).removeClass('not-used');
        $(this).addClass('used');
        $(this).attr('value', '1');
    }
});

$('.schedule__device').click(function () {

    if ($(this).find('.schedule__device__item__plus-circle').attr('value') == '0') {
        //  disable all select & input 
        $(this).find('select').prop('disabled', true);
        // $("#inputID").prop('disabled', true); //disable 
        // $("#inputID").prop('disabled', false); //enable
        $(this).find('input').prop('disabled', true);
        $(this).removeClass('used-schedule');
        $(this).addClass('not-used-schedule');
    }

    else if ($(this).find('.schedule__relay__switch').attr('value') == '0') {
        $(this).find('input').prop('disabled', false);
        $(".form__control-dim-cct").prop('disabled', true);
        $(this).removeClass('not-used-schedule');
        $(this).addClass('used-schedule');
    }
    else {
        // able all select & input 
        $(this).find('select').prop('disabled', false);
        // $("#inputID").prop('disabled', true); //disable 
        // $("#inputID").prop('disabled', false); //enable
        $(this).find('input').prop('disabled', false);
        $(this).removeClass('not-used-schedule');
        $(this).addClass('used-schedule');
    }
})

$('.schedule__device-update').click(function () {

    if ($(this).find('.schedule__device__item__plus-circle').attr('value') == '0') {
        //  disable all select & input 
        $(this).find('select').prop('disabled', true);
        // $("#inputID").prop('disabled', true); //disable 
        // $("#inputID").prop('disabled', false); //enable
        $(this).find('input').prop('disabled', true);
        $(this).removeClass('used-schedule-update');
        $(this).addClass('not-used-schedule-update');

    }

    else if ($(this).find('.schedule__relay__switch').attr('value') == '0') {
        $(this).find('input').prop('disabled', false);
        $(".form__control-dim-cct").prop('disabled', true);
        $(this).removeClass('not-used-schedule-update');
        $(this).addClass('used-schedule-update');
    }
    else {
        // able all select & input 
        $(this).find('select').prop('disabled', false);
        // $("#inputID").prop('disabled', true); //disable 
        // $("#inputID").prop('disabled', false); //enable
        $(this).find('input').prop('disabled', false);
        $(this).removeClass('not-used-schedule-update');
        $(this).addClass('used-schedule-update');
    }
})

$('.schedule__relay__switch').click(function () {
    if ($(this).attr('value') == 1) {
        $(this).attr('value', '0');
    }
    else {
        $(this).attr('value', '1');
    }
})

function check_valid_value(value, min, max) {

    if (value < min || value > max) {
        showAlert('Giá trị không hợp lệ. Kiểm tra giá trị âm, hoặc giá trị tối đa.', 'Cài đặt giá trị ', 'danger');
        return 0;
    }
    return 1;
}

$(document).ready(function () {

    $('.day').click(function () {

        let val = $(this).val();
        if (val == '0') {
            $(this).val('1');
            $(this).css('background-color', '#0066ff');
            $(this).css('color', 'white');
        }
        else {
            $(this).val('0');
            $(this).css('background-color', 'white');
            $(this).css('color', 'black');
        }
    });

    $('.day-update').click(function () {

        let val = $(this).val();
        if (val == '0') {
            $(this).val('1');
            $(this).css('background-color', '#0066ff');
            $(this).css('color', 'white');
        }
        else {
            $(this).val('0');
            $(this).css('background-color', 'white');
            $(this).css('color', 'black');
        }
    });
    // -------------------------------- CREATE NEW SCHEDULE JS PROCESS  --------------------------------
    $('#create-schedule').click(function () {
        $("#addSchedule").modal('hide');
        let data = {};

        if ($(".schedule__add__schedule-name").val() == '') {
            showAlert('Tên lịch không được bỏ trống và không trùng với các lịch khác.', 'Thêm lịch', 'danger');
        }
        data['name'] = $(".schedule__add__schedule-name").val()
        data['time'] = $(".apptStart").val()
        data['execute'] = []
        $('.schedule__device').each(function () {

            if ($(this).find('.schedule__device__item__plus-circle').attr('value') == '1') {
                let obj = {};
                obj['type'] = 'Relay';
                obj['ID'] = $(this).find('.schedule__device__item__plus-circle').attr('_id');
                obj['pull'] = $(this).find('.schedule__relay__switch').val();
                data['execute'].push(obj);
            }
        });
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/setting/schedule",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (response) {
                if (response['isSuccess'] == true) {
                    showAlert(response['msg'], 'Thêm lịch', 'success');
                }
                else {
                    showAlert(response['msg'], 'Thêm lịch', 'danger');
                }
                setTimeout(function () {
                    window.location.reload();
                }, 2000)
            },
            error: function (error) {
                console.log(error);
            }
        });

    });

    // --------------------------------DELETE SCHEDULE---------------------------------------------------
    $('#confirmDeleteSchedule').click(function () {
        let data = {};
        data['id'] = $('#deleteScheduleId').val();

        const path = location.pathname.split("/");
        let url = '/' + path[1] + '/' + path[2] + '/delete/' + data['id'];

        $.ajax({
            type: "DELETE",
            url: url,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (response) {
                if (response['status'] == true) {
                    $('#deleteSchedule').modal('hide');
                    showAlert(response['msg'], 'Thêm lịch', 'success');
                }
                else {
                    $('#deleteSchedule').modal('hide');
                    showAlert(response['msg'], 'Thêm lịch', 'danger');
                }
                setTimeout(function () {
                    window.location.reload();
                }, 2000)
            },
            error: function (error) {
                $("#wait-load").modal("hide");
                console.log(error);
            }
        });
    });

    $('#update-schedule').click(function () {
        var id = $('#scheduleId').val();
        var flagSend = false;
        record = recordTimeEdit();
        flagSend = checkValueRecord(record);

        $("#editSchedule").modal('hide');
        let data = {};
        if ($(".schedule__update__schedule-name").val() == '') {
            showAlert('Tên lịch không được bỏ trống và không trùng với các lịch khác.', 'Thêm lịch', 'danger');
        }
        if ((record[0]['timeStart'].length == 0) || (record[0]['timeStop'].length == 0)) {
            showAlert('Lịch được tạo cần thiết lập thời gian hoạt động.', 'Thêm lịch', 'danger');
        }
        // else{
        //     for(var i = 0; i < (record[0]['timeStart'].length); i++){
        //         if(record[0]['timeStart'][i] > record[0]['timeStop'][i]){
        //             flagSend = false;
        //             showAlert('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc!','Thêm lịch', 'danger');
        //             break;
        //         }
        //         else{
        //             flagSend = true;
        //         }
        //     };
        // }
        if ($(".schedule__update__schedule-name").val() != '' && (record[0]['timeStart'].length != 0) && (record[0]['timeStop'].length != 0) && (flagSend == true)) {
            data['name'] = $(".schedule__update__schedule-name").val();

            data['greenhouseId'] = $('.schedule__container').attr("id");
            if (data['greenhouseId'] == null) {
                data['greenhouseId'] = $('.schedule__item__add__plus').attr("id");
            }
            // Input
            data['input'] = {};
            data['input']['loop'] = {};
            data['input']['schedule'] = {};

            data['input']['schedule'] = record[0];

            let keys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            let values = [];
            $(".day-update").each(function () {
                if ($(this).val() == '0')
                    values.push(false);
                else values.push(true);
            });
            for (let i = 0; i < keys.length; i++) {
                data['input']['loop'][keys[i]] = values[i];
            }

            // Execute
            data['execute'] = []

            $('.schedule__device-update').each(function () {

                if ($(this).find('.schedule__device__item__plus-circle').attr('value') == '1') {
                    let obj = {};

                    obj['type'] = 'Relay';
                    obj['ID'] = $(this).find('.schedule__device__item__plus-circle').attr('_id');
                    obj['pull'] = $(this).find('.schedule__relay__switch').val();
                    if ($(this).find('.schedule__light').length) {
                        obj['DIM'] = Number($(this).find('.DIM').val());
                        check_valid_value(obj['DIM'], 0, 100);
                        obj['CCT'] = Number($(this).find('.CCT').val());
                        check_valid_value(obj['CCT'], 0, 100);
                    }
                    if ($(this).find('.schedule__dim').length) {
                        obj['DIM'] = Number($(this).find('.DIM').val());
                        check_valid_value(obj['DIM'], 0, 100);
                    }
                    data['execute'].push(obj);
                }
            });

            console.log(data)

            const path = location.pathname.split("/");
            let url = '/' + path[1] + '/' + path[2] + '/edit/' + id;

            $.ajax({
                type: "UPDATE",
                url: url,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (response) {
                    if (response['status'] == true) {
                        showAlert(response['msg'], 'Sửa lịch', 'success');
                    }
                    else {
                        showAlert(response['msg'], 'Sửa lịch', 'danger');
                    }
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000)
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });

    $('.schedule__item__status__switch').click(function () {
        var data = {}
        if ($(this).checked == true) {
            data['active'] = 0
        }
        else {
            data['active'] = 1
        }
        let id = $(this).attr('value');
        data['id'] = id
        let url = '/setting/schedule';
        $.ajax({
            type: "PATCH",
            url: url,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (response) {

                if (response['status'] == true) {
                    showAlert(response['msg'], 'Điều khiển lịch', 'success');
                }
                else {
                    showAlert(response['msg'], 'Điều khiển lịch', 'danger');
                }

                setTimeout(function () {
                    window.location.reload();
                }, 2000)
            },
            error: function (error) {
                console.log(error);
            }
        });
    })
});