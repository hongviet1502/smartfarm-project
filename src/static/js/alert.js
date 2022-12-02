const toastLive = document.getElementById('liveToast')
const toast = new bootstrap.Toast(toastLive, {
    delay: 2000
})
const toastIcon = document.getElementsByClassName('toast-icon')[0]
const toastType = document.getElementsByClassName('toast-type')[0]
const toastMessage = document.getElementById('toast-message')
const toastSubMessage = document.getElementById('toast-sub-message')

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

export default function showAlert(message, subMessage, type) {
    toastMessage.innerText = message
    toastSubMessage.innerHTML = subMessage  
    setBootstrapClass(toastIcon, type)
    setFontAwesomeClass(toastIcon, type)
    setBootstrapClass(toastType, type)
    setToastBackgroundClass(toastLive, type)
    setTypeText(toastType, type)
    toast.show()
} 

function setBootstrapClass(element, type) {
    if (!(type in textBootstrapClass) && type !== 'undefined')
        type = 'danger'
    removeBootstrapClass(element)
    element.classList.add(textBootstrapClass[type])
}

function setFontAwesomeClass(element, type) {
    if (!(type in fontAwesomeClass) && type !== 'undefined')
        type = 'danger'
    removeFontAwesomeClass(element)
    element.classList.add(fontAwesomeClass[type])
}

function setToastBackgroundClass(element, type) {
    if (!(type in toastBackgroundClass) && type !== 'undefined')
        type = 'danger'
    removeBackgroundClass(element)
    element.classList.add(toastBackgroundClass[type])
}

function setTypeText(element, type) {
    if (!(type in toastTypeText) && type !== 'undefined')
        type = 'danger'
    element.innerText = toastTypeText[type]
}

function removeBootstrapClass(element) {
    element.classList.remove(textBootstrapClass['danger'])
    element.classList.remove(textBootstrapClass['success'])
    element.classList.remove(textBootstrapClass['warning'])
    element.classList.remove(textBootstrapClass['info'])
}

function removeFontAwesomeClass(element) {
    element.classList.remove(fontAwesomeClass['danger'])
    element.classList.remove(fontAwesomeClass['success'])
    element.classList.remove(fontAwesomeClass['warning'])
    element.classList.remove(fontAwesomeClass['info'])
}

function removeBackgroundClass(element) {
    element.classList.remove(toastBackgroundClass['danger'])
    element.classList.remove(toastBackgroundClass['success'])
    element.classList.remove(toastBackgroundClass['warning'])
    element.classList.remove(toastBackgroundClass['info'])
}
