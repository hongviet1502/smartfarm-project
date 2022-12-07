import showAlert from "../../alert.js";

// API request change relay status on or off
function changeRelayStatusApi(name, typeRelay, pull) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/manager/relay",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                name: name,
                type: typeRelay,
                pinMode: pull
            }),
            dataType: 'json',
            success: function (response) {
                resolve(response)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}
// get all switch button of device
const switchRelayStatusButtons = document.getElementsByClassName('relay__item__switch-button__input')
for (let switchRelayStatusButton of switchRelayStatusButtons) {
    switchRelayStatusButton.addEventListener('change', async e => {
        try {
            e.target.disabled = true
            // get type relay
            var typeRelay = switchRelayStatusButton.getAttribute('device')
            var nameRelay = switchRelayStatusButton.getAttribute('name')
            if(switchRelayStatusButton.checked == true){
                const response = await changeRelayStatusApi(nameRelay, typeRelay, 1)
                //handle response
                if (response['status'] !== true)
                throw new Error(response.message)
                showAlert('Thay đổi trạng thái thiết bị thất bại', 'Thay đổi trạng thái', 'success')
            e.target.disabled = false
            showAlert('Thay đổi trạng thái thiết bị thành công', 'Thay đổi trạng thái', 'success')
            }   
            else{
                const response = await changeRelayStatusApi(nameRelay, typeRelay, 0)
                //handle response
                if (response['status'] !== true)
                throw new Error(response.message)
                showAlert('Thay đổi trạng thái thiết bị thất bại', 'Thay đổi trạng thái', 'success')
            e.target.disabled = false
            showAlert('Thay đổi trạng thái thiết bị thành công', 'Thay đổi trạng thái', 'success')
            }
        } catch (error) { // handle error
            e.target.disabled = false
            e.target.checked = !e.target.checked
            showAlert(error.message, 'Thay đổi trạng thái thất bại','Thay đổi trạng thái' ,'danger')
        }
    })
} 