import { Script, ScriptExecute } from './model.js'

function createScriptApi(script) {
    if (!(script instanceof Script))
        throw new Error('Data must be an instance of Script')
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/setting/script/creation",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                name: script.getName(),
                execute: script.getExecutes().map(execute => ({
                    ID: execute.getID(),
                    type: execute.getType(),
                    pull: execute.getPull(),
                }))
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

// function updateScriptApi(script) {
//     if (!(script instanceof Script))
//         throw new Error('Data must be an instance of Script')
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: "/setting/script/edit/" + script.getId(),
//             type: "POST",
//             contentType: "application/json;charset=utf-8",
//             data: JSON.stringify({
//                 name: script.getName(),
//                 execute: script.getExecutes().map(execute => ({
//                     ID: execute.getID(),
//                     delay: execute.getDelay(),
//                     during: execute.getDuring(),
//                     type: execute.getType(),
//                     pull: execute.getPull(),
//                     DIM: execute.getDIM(),
//                     CCT: execute.getCCT(),
//                 }))
//             }),
//             dataType: 'json',
//             success: function (res) {
//                 resolve(res)
//             },
//             error: function (err) {
//                 reject(err)
//             }
//         })
//     })
// }

// function deleteScriptApt(script) {
//     if (!(script instanceof Script))
//         throw new Error('Data must be an instance of Script')
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: "/setting/script/" + script.getId(),
//             type: "DELETE",
//             contentType: "application/json;charset=utf-8",
//             data: JSON.stringify({
//                 id: script.getId()
//             }),
//             dataType: 'json',
//             success: function (res) {
//                 resolve(res)
//             },
//             error: function (err) {
//                 reject(err)
//             }
//         })  
//     })
// }

export {
    createScriptApi,
    // updateScriptApi,
    // deleteScriptApt
}