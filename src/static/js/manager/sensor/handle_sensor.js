function handleEdit(gateway, name, id, max, min, calib1, calib2, calib3, timeUpdate) {
    $(".modal-footer").css("display", "flex");
    $('#modalEditRelay #mac_relay').val(id);
    $('#modalEditRelay #name_relay').val(name);
    $('#modalEditRelay #name_gateway').val(gateway);
    $('#modalEditRelay #min').val(min);
    $('#modalEditRelay #timeUpdate').val(timeUpdate);
    $('#modalEditRelay #max').val(max);
    $('#modalEditRelay #calib1').val(calib1);
    $('#modalEditRelay #calib2').val(calib2);
    $('#modalEditRelay #calib3').val(calib3);
    $('#modalEditRelay').modal("show");
}
function handleDelete(Id) {
    $('#sensor_mac_delete').val(Id);
}
function addSensor(id) {
    $('#modalCreateSensors').modal("hide");
    $(".modal-footer").css("display", "flex");
    $("#value_sensor").empty();

    // $.ajax({
    //     url: "/manager/sensor",
    //     type: "DETAIL",
    //     contentType: "application/json;charset=utf-8",
    //     data: JSON.stringify(id),
    //     dataType: 'json',
    //     success: function (response) {

    //         let relay = response['data'];
    //         $('#name_temp').val(relay['name'])
    //         $('#id_sensor_detail').val(relay['_id']);
    //         $('#name_greenhouse').text(response['name_greenhouse']);
    //         $("#addSensor #min").val(relay['_min']);
    //         $("#addSensor #max").val(relay['_max']);
    //         $("#addSensor #calib1").val(relay['calib1']);
    //         $("#addSensor #calib2").val(relay['calib2']);
    //         $("#addSensor #calib3").val(relay['calib3']);

    //         if (relay['type_sensor'] == 0) {
    //             $('#type_sensor').text("Nhiệt độ");
    //         }
    //         else if (relay['type_sensor'] == 1) {
    //             $('#type_sensor').text("Độ ẩm không khí");
    //         }
    //         else if (relay['type_sensor'] == 2) {
    //             $('#type_sensor').text("Độ ẩm đất");
    //         }
    //         else if (relay['type_sensor'] == 3) {
    //             $('#type_sensor').text("Ánh sáng");
    //         }
    //         else if (relay['type_sensor'] == 4) {
    //             $('#type_sensor').text("CO2");
    //         }
    //         else {
    //             $('#type_sensor').text("Không xác định");
    //         }

    //     }
    // });
    $('#addSensor').modal('show');
};
// function checkStatusSensor() {
//     $(".sensor-card").each(function () {
//         // console.log($(this).attr('id'));
//         // timeUpdate là chu kì update dữ liệu (ví dụ: 5 phút/1 lần)
//         let cycleUpdate = $(this).find(".timeUpdate").text()
//         // lấy thời gian update gần nhất
//         let timeUpdate = $(this).find(".time_update").text().trim()
//         let dateUpdate = $(this).find(".date_update").text().trim()
//         let [a, b, c] = dateUpdate.split("/")
//         dateUpdate = b + "/" + a + "/" + c
//         let timetamp_current = (new Date()).getTime()
//         let timestamp_Update = (new Date(timeUpdate + " " + dateUpdate)).getTime()
//         // console.log(timetamp_current - timestamp_Update)
//         sensor_status = Math.abs(timetamp_current - timestamp_Update) > (3 * cycleUpdate * 60 * 1000)
//         // console.log(sensor_status)
//         if (sensor_status) {
//             $(this).find(".value").css("color", "#FF0000")
//             $(this).find(".sensor-status").css("color", "#FF0000")
//         } else {
//             $(this).find(".value").css("color", "#14F152")
//             $(this).find(".sensor-status").css("color", "#14F152")
//         }
//         $.ajax({
//             url: "/manager/sensor/status",
//             type: "UPDATE",
//             contentType: "application/json;charset=utf-8",
//             data: JSON.stringify({
//                 'id-sensor':$(this).attr('id'),
//                 'status': sensor_status
//             }),
//             dataType: 'json',
//             success: function (response) {
//                 // console.log(response)
//             },
//             error: function (error) {
//                 console.log(error)
//             }
//         });
//     })
// }
// checkStatusSensor()
// setInterval(function () {
//     checkStatusSensor()
// }, 60 * 1000)

// var socket;
// var href = window.location.href;
// if (href.includes("sensor")) {
//     id_gateway = $('#id_greenhouse').text()
//     socket = io.connect('http://' + document.domain + ':' + location.port + '/listen');
//     //connect
//     socket.on('connect', function () {
//         socket.emit('joined', { "roomId": id_gateway, 'documentType': 'sensor' });
//     });
//     socket.on('status', function (data) {
//         // console.log(data)
//         // data = {
//         //      "greenhouseId": "633298f5852236641310ae62",
//         //      "documentKey": "sensor",
//         //      "operatorKey": "update",
//         //      "data": {
//         //          "active": false,
//         //          "timeUpdate": 5,
//         //          "avatar": "null",
//         //          "_id": "633ab089c2688941670d4d99",
//         //          "name": "Humitttt",
//         //          "greenhouseId": "633298f5852236641310ae62",
//         //          "type": 1,
//         //          "max": 100,
//         //          "min": 0,
//         //          "paramA": 1,
//         //          "paramB": 0,
//         //          "paramC": 0,
//         //          "mac": "c137f25f-ca9c-48c0-9134-e7f2a8868132",
//         //          "battery": 61,
//         //          "curValue": 77,
//         //          "createdAt": "2022-10-03T09:51:05.958Z",
//         //          "updatedAt": "2022-10-05T03:45:01.580Z",
//         //          "id": "633ab089c2688941670d4d99"
//         //      }
//         //  }
//         //  socket.emit('update', data);
//     });
//     socket.on('message', function (data) {
//         //delete sensor
//         // console.log(data);
//         if (data['operatorKey'] == 'delete') {
//             let id_element = data['data']['_id']
//             let el = document.getElementById(id_element);
//             el.remove();
//         }
//         else if(data['operatorKey'] == 'update') {
//             // update sensor
//             let id_element = data['data']['_id']
//             $('#' + id_element).find(".name").text(data['data']['name']);
//             $('#' + id_element).find(".timeUpdate").text(data['data']['timeUpdate']);
//             let updateAt = new Date(data['data']['updatedAt']).toLocaleString("vi-VN").split(",")
//             $('#' + id_element).find(".time_update").text(updateAt[0])
//             $('#' + id_element).find(".date_update").text(updateAt[1])

//             let uom = '';
//             if (data['data']['type'] == 0) {
//                 uom = '°C'
//             }
//             else if (data['data']['type'] == 3) {
//                 uom = 'lux'
//             }
//             else if (data['data']['type'] == 4) {
//                 uom = 'ppm'
//             }
//             else uom = '%'
//             $('#' + id_element).find(".battery-value").text(Math.round(data['data']['battery']) + "%")
//             $('#' + id_element).find(".value").text(data['data']['curValue'] + ' ' + uom);
//             $('#' + id_element).find(".sensor-status").css("color", "#14F152")
//             $('#' + id_element).find(".value").css("color", "#14F152")
//         }
//         else{
//             window.location.reload();
//         }
//     });
// }