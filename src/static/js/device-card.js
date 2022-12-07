$(document).ready(function () {
    //update status device
    const switchRelayStatusButtons = document.getElementsByClassName('relay__item__switch-button__input')
    for (let switchRelayStatusButton of switchRelayStatusButtons) {
        switchRelayStatusButton.addEventListener('change', async e => {
            try {
                e.target.disabled = true
                // get type relay
                var typeRelay = switchRelayStatusButton.getAttribute('device')
                var nameRelay = switchRelayStatusButton.getAttribute('name')
                if (switchRelayStatusButton.checked == true) {
                    const response = await changeRelayStatusApi(nameRelay, typeRelay, 1)
                    //handle response
                    if (response['status'] !== true)
                        throw new Error(response.message)
                    showToast('Thay đổi trạng thái thiết bị thất bại', 'Thay đổi trạng thái', 'success')
                    e.target.disabled = false
                    showToast('Thay đổi trạng thái thiết bị thành công', 'Thay đổi trạng thái', 'success')
                }
                else {
                    const response = await changeRelayStatusApi(nameRelay, typeRelay, 0)
                    //handle response
                    if (response['status'] !== true)
                        throw new Error(response.message)
                    showToast('Thay đổi trạng thái thiết bị thất bại', 'Thay đổi trạng thái', 'success')
                    e.target.disabled = false
                    showToast('Thay đổi trạng thái thiết bị thành công', 'Thay đổi trạng thái', 'success')
                }
            } catch (error) { // handle error
                e.target.disabled = false
                e.target.checked = !e.target.checked
                showToast(error.message, 'Thay đổi trạng thái thất bại', 'Thay đổi trạng thái', 'danger')
            }
        })
    }

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
    const textBootstrapClass = {
        danger: 'text-danger',
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-info'
    }
    const fontAwesomeClass = {
        danger: 'fa-circle-xmark',
        success: 'fa-circle-check',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    }
    const toastTypeText = {
        danger: 'Lỗi',
        success: 'Thành công',
        warning: 'Cảnh báo',
        info: 'Thông tin'
    }
    const toastBackgroundClass = {
        danger: 'text-bg-danger',
        success: 'text-bg-success',
        warning: 'text-bg-warning',
        info: 'text-bg-info'
    }
    function remove__class(element, group) {
        for (let type in group) {
            element.removeClass(group[type])
        }
    }
    function showToast(message, subMessage, type) {
        let toastMessage = $("#toast__home")
        let icon = $("#toast__home .toast-icon")
        let toastType = $("#toast__home .toast-type")
        let toastSubMessage = $("#toast__home .toast-sub-message")
        let toastBody = $("#toast__home .toast-body")


        remove__class(toastMessage, toastBackgroundClass)
        remove__class(icon, textBootstrapClass)
        remove__class(icon, fontAwesomeClass)
        remove__class(toastType, toastTypeText)


        toastMessage.addClass(toastBackgroundClass[type])
        icon.addClass(textBootstrapClass[type])
        icon.addClass(fontAwesomeClass[type])

        toastType.text(toastTypeText[type])
        toastSubMessage.text(subMessage)
        toastBody.text(message)

        toastMessage.toast("show")
    }
}) 