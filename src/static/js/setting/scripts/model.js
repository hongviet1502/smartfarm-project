class ScriptExecute {
    #ID
    #type
    #pull
    constructor(ID) {
        this.validateID(ID)
        this.#ID = ID
    }

    validateID(ID) {
        if (typeof ID !== 'string')
            throw new Error('ID phải là string')
        return true
    }

    validateType(type) {
        if (!['Script', 'Relay'].includes(type))
            throw new Error('Type phải là Script hoặc Relay')
        return true
    }


    getID() {
        return this.#ID
    }
    getType() {
        return this.#type
    }
    getPull() {
        return this.#pull
    }
    setPull(pull) {
        this.#pull = pull
    }
    setType(type) {
        this.validateType(type)
        this.#type = type
    }

}

class Script {
    #id
    #name
    #executes
    constructor(id, name, executes) {
        this.validateId(id)
        this.#id = id
        this.#name = name
        this.#executes = executes
    }

    validateId(id) {
        if (typeof id !== 'string')
            throw new Error('Id phải là string')
        return true
    }

    validateName(name) {
        if (typeof name !== 'string')
            throw new Error('Tên kịch bản phải là chuỗi ký tự')
        if (name.length == 0)
            throw new Error('Tên kịch bản không được để trống')
        if (name.length > 30)
            throw new Error('Tên kịch bản quá dài')
        return true
    }
    validateExecutes(executes) {
        if (!(executes instanceof Array))
            throw new Error('Execute phải là array')
        executes.forEach(execute => {
            if (!(execute instanceof ScriptExecute))
                throw new Error('Execute phải là array các ScriptExecute')
        })
        return true
    }

    getId() {
        return this.#id
    }

    getName() {
        return this.#name
    }

    getExecutes() {
        return this.#executes
    }

    setName(name) {
        this.validateName(name)
        this.#name = name
    }

    setExecutes(executes) {
        this.validateExecute(executes)
        this.#executes = executes
    }

    addExecute(execute) {
        this.validateExecutes([execute])
        this.#executes.push(execute)
    }
}

export {
    Script,
    ScriptExecute   
}