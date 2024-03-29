import showAlert from "../../alert.js";
import { createScriptApi,deleteScriptApi,updateScriptApi } from "./api.js";
import { Script, ScriptExecute } from "./model.js";

const script = document.getElementsByClassName('script')[0]
handleAddScript()
handleEditScript()
handleDeleteScript()

function handleAddScript() {
    const addScriptForm = document.getElementById('add-script-form')
    const scriptSlider = document.getElementsByClassName('script__relay-slider__add')[0]
    const addButton = document.getElementsByClassName('script__add__add-button')[0]

    let scriptsExecute = []
    scriptSlider.addEventListener('slideValueChange', e => {
        scriptsExecute = e.detail.all()
        console.log(scriptsExecute);
    })

    addScriptForm.addEventListener(('submit'), async e => {
        e.preventDefault()
        e.stopPropagation()

        const greenhouseId = script.getAttribute('greenhouse-id')
        const scriptName = document.getElementById('script__add__script-name')

        function newScript() {
            const scriptData = new Script('', '', [])
            scriptData.setName(scriptName.value)
            scriptsExecute.forEach(scriptExecute => {
                const newScriptExecute = new ScriptExecute(scriptExecute._id)
                newScriptExecute.setType('Relay')
                if (!scriptExecute.active) {
                    newScriptExecute.setPull(0)
                } else {
                    newScriptExecute.setPull(1)
                }
                scriptData.addExecute(newScriptExecute)
            })
            return scriptData
        }

        try {
            disabledSubmitButton(addButton)
            const response = await createScriptApi(newScript())
            if (response.isSuccess == true) {
                enableSubmitButton(addButton)
                showAlert(response.msg, 'Tạo kịch bản', 'success')
                setTimeout(function(){
                    window.location.reload();
                }, 2000)
            } else {
                throw new Error(response.msg)
            }
        } catch (error) {
            enableSubmitButton(addButton)
            showAlert(error.message, 'Tạo kịch bản')
            return
        }
    })
}

function handleEditScript() {
    const editScriptForm = document.getElementById('edit-script-form')
    const scriptSlider = document.getElementsByClassName('script__relay-slider__edit')[0]
    const editButton = document.getElementsByClassName('script__edit__edit-button')[0]

    let scriptsExecute = []
    scriptSlider.addEventListener('slideValueChange', e => {
        scriptsExecute = e.detail.all()
        console.log(scriptsExecute);
    })

    editScriptForm.addEventListener(('submit'), async e => {
        e.preventDefault()
        e.stopPropagation()
        // scriptModal.getAttribute('_id')
        const scriptModal = document.getElementById('editScript')
        const scriptName = document.getElementById('script__edit__script-name')
        console.log(scriptModal.getAttribute('_id'));
        function newScript() {
            const scriptData = new Script(scriptModal.getAttribute('_id'), '', [])
            scriptData.setName(scriptName.value)
            scriptsExecute.forEach(scriptExecute => {
                const newScriptExecute = new ScriptExecute(scriptExecute._id)
                newScriptExecute.setType('Relay')
                if (!scriptExecute.active) {
                    newScriptExecute.setPull(0)
                } else {
                    newScriptExecute.setPull(1)
                }
                scriptData.addExecute(newScriptExecute)
            })
            return scriptData
        }
        try {
            disabledSubmitButton(editButton)
            const response = await updateScriptApi(newScript())
            if((response['status']) == true){
                showAlert(response.msg, 'Cập nhật kịch bản', 'success')
                enableSubmitButton(editButton)
            }
            else{
                showAlert(response.msg, 'Cập nhật kịch bản', 'danger')
            }

            setTimeout(function(){
                window.location.reload();
            }, 2000)
            enableSubmitButton(editButton)
        } catch (error) {
            enableSubmitButton(editButton)
            showAlert(error.message, 'Cập nhật kịch bản')
            return
        }
    })
}

function handleDeleteScript() {
    const deleteScriptForm = document.getElementById('deleteScript')
    const deleteScriptButton = document.getElementsByClassName('script__delete__delete-button')[0]
    deleteScriptButton.addEventListener(('click'), async e => {
        e.preventDefault()
        e.stopPropagation()

        var idDelete = $('#id-delete-script').text();
    
        try {
            disabledSubmitButton(deleteScriptButton)
            const response = await deleteScriptApi(idDelete)
            if((response['status']) == true){
                showAlert(response.msg, 'Xoá kịch bản', 'success')
                enableSubmitButton(deleteScriptButton)
            }
            else{
                showAlert(response.msg, 'Xoá kịch bản', 'danger')
            }

            setTimeout(function(){
                window.location.reload();
            }, 2000)

        } catch (error) {
            enableSubmitButton(deleteScriptButton)
            showAlert(error.message, 'Xóa kịch bản')
            return
        }
    })
}

function disabledSubmitButton(button) {
    button.disabled = true
}

function enableSubmitButton(button) {
    button.disabled = false
}

$('.script__item__status__switch').click(function(){
    let id = $('#statusScriptId').attr('value');
    let url = '/setting/script';
    $.ajax({
        type: "UPDATE",
        url: url,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            id: id
        }),
        dataType: 'json',
        success: function(response) {
            console.log(response);
            if(response['status'] == 0){
                showAlert(response['msg'],'Điều khiển luật', 'success');
            }
            else{
                showAlert(response['msg'],'Điều khiển luật', 'danger');
            }
            setTimeout(function(){
                window.location.reload();
            }, 2000)
        },
        error: function(error) {
            console.log(error);
        }
    });
})

//socket
