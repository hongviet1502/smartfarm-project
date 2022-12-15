import showAlert from "../../alert.js";
import { changeRelayStatusApi,createRelayApi, updateRelayApi,deleteRelayApi } from "./api.js";
import Relay from "./model.js";
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

// add Relay
const relay = document.getElementsByClassName('relay')[0]

const addRelayForm = document.getElementById('add-relay-form')
addRelayForm.addEventListener('submit', async (e) => {
    const addButton = document.getElementsByClassName('relay__add__add-button')[0]
    const addRelayName = document.getElementById('relay__add__relay-name')
    const addRelayPin = document.getElementById('relay__add__relay-pin')

    e.preventDefault()
    e.stopPropagation()

    function disabledSubmitButton() {
        addButton.disabled = true
    }

    function enableSubmitButton() {
        addButton.disabled = false
    }

    function newRelay() {
        const newRelay = new Relay('')
        newRelay.setName(addRelayName.value)
        newRelay.setPin(parseInt(addRelayPin.value))
        if (addRelayPin.value === 'not-selected')
            throw new Error('Chưa chọn pin')
        return newRelay
    }
    console.log(newRelay());
    try {
        disabledSubmitButton()
        const response = await createRelayApi(newRelay())
        enableSubmitButton()
        // console.log(response)
        if (response.code == 200)
            // throw new Error(response.message)
            showAlert('Thêm thiết bị thành công', 'Thêm thiết bị', 'success')
        else{
            showAlert('Thêm thiết bị thất bại', 'Thêm thiết bị', 'danger')
        }
        setTimeout(function(){
            window.location.reload();
        }, 2000)
    } catch (error) {
        enableSubmitButton()
        showAlert(error.message, 'Thêm thiết bị', 'danger')
    }
})

// edit relay
const editRelayForm = document.getElementById('edit-relay-form')
editRelayForm.addEventListener('submit', async e => {
    const editButton = document.getElementsByClassName('relay__edit__edit-button')[0]
    const editRelay = document.getElementById('editRelay')
    const editRelayName = document.getElementById('relay__edit__relay-name')

    e.preventDefault()
    e.stopPropagation()

    function disabledSubmitButton() {
        editButton.disabled = true
    }

    function enableSubmitButton() {
        editButton.disabled = false
    }

    function newRelay() {
        const newRelay = new Relay(editRelay.getAttribute('_id'))
        newRelay.setName(editRelayName.value)
        return newRelay
    }
    console.log(newRelay());
    try {
        disabledSubmitButton()
        const response = await updateRelayApi(newRelay())
        enableSubmitButton()
        if (response.code == 200){
            // throw new Error(response.message)
            showAlert('Sửa thiết bị thành công', 'Sửa thiết bị', 'success')
        }
        else{
            showAlert('Sửa thiết bị thất bại', 'Sửa thiết bị', 'danger')
        }
        setTimeout(function(){
            window.location.reload();
        }, 2000)
    } catch (error) {
        enableSubmitButton()
        showAlert(error.message, 'Sửa thiết bị')
    }
})

// delete relay
const deleteRelayButton = document.getElementsByClassName('relay__delete__delete-button')[0]
deleteRelayButton.addEventListener('click', async e => {
    const deleteRelay = document.getElementById('deleteRelay')

    e.preventDefault()
    e.stopPropagation()

    function disabledSubmitButton() {
        deleteRelayButton.disabled = true
    }

    function enableSubmitButton() {
        deleteRelayButton.disabled = false
    }

    const relayToDelete = new Relay(deleteRelay.getAttribute('_id'), '')
    console.log(relayToDelete);
    try {
        disabledSubmitButton()
        const response = await deleteRelayApi(relayToDelete)
        enableSubmitButton()
        // console.log(response)
        if (response.code == 200){
            // throw new Error(response.message)
            showAlert('Xóa thiết bị thành công', 'Xóa thiết bị', 'success')
        }
        else{
            showAlert('Xóa thiết bị thất bại', 'Xóa thiết bị', 'danger')
        }
        setTimeout(function(){
            window.location.reload();
        }, 2000)
    } catch (error) {
        enableSubmitButton()
        showAlert(error.message, 'Xóa thiết bị', 'danger')
    }
})