import Relay from './model.js'

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

function createRelayApi(data) {
    if (!(data instanceof Relay))
        throw new Error('Data must be an instance of Relay')
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/manager/relay/create",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                name: data.getName(),
                pin: data.getPin(),
                status: data.getStatus()
            }),
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

function updateRelayApi(data) {
    if (!(data instanceof Relay))
        throw new Error('Data must be an instance of Relay')
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/manager/relay",
            type: "UPDATE",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                _id: data.getId(),
                name: data.getName(),
            }),
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

function deleteRelayApi(data) {
    if (!(data instanceof Relay))
        throw new Error('Data must be an instance of Relay')
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/manager/relay",
            type: "DELETE",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data.getId()),
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

export {
    changeRelayStatusApi,
    createRelayApi,
    updateRelayApi,
    deleteRelayApi
} 