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
    $('#addSensor').modal('show');
};
