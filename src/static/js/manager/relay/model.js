export default class Relay {
    #_id
    #name
    #pin
    #status
    constructor(id) {
        this.#_id = id
        this.#name = ''
        this.#pin = 0
        this.#status = 0
    }

    validateName(name) {
        if (typeof name !== 'string')
            throw new Error('Tên phải là string')
        if (name.length == 0)
            throw new Error('Không có tên')
        if (name.length > 30)
            throw new Error('Độ dài của tên phải nhỏ hơn 30')
        return true
    }

    getId() {
        return this.#_id
    }
    getStatus() {
        return this.#status
    }

    getName() {
        return this.#name
    }

    getPin() {
        return this.#pin
    }

    setName(name) {
        this.validateName(name)
        this.#name = name
    }

    setPin(pin) {
        this.#pin = pin
    }
} 