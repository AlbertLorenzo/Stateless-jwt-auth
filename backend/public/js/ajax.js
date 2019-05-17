// Await / Async
function ajaxRequest(data, method, action) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(`${method}`, `${action}`)
        xhr.onload = () => { resolve(xhr.responseText) }
        xhr.onerror = () => { reject(new Error(xhr.responseText)) }
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(data)
    })
}

// OOP
const HttpClient = function () {
    this.get = (aUrl, aToken, aCallback) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', aUrl)
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                aCallback(this.responseText)
            }
        }
        xhr.setRequestHeader('Authorization', `Bearer ${aToken}`)
        xhr.send(null)
    }

    this.post = (data, method, action, aCallback) => {
        const xhr = new XMLHttpRequest()
        xhr.open(`${method}`, `${action}`)
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                aCallback(this.responseText)
            }
        }
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        xhr.send(data)
    }
}

const serializeForm = (form) => {
    const json = {}
    const formData = new FormData(form)
    formData.forEach((e, i) => {
        json[i] = e
    })
    return JSON.stringify(json)
}

const client = new HttpClient()

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault()
    const serializedForm = serializeForm(this)
    const method = this.getAttribute('method')
    const action = this.getAttribute('action')
    client.post(serializedForm, method, action, (response) => {
        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', response)
        } else {
            console.log('El usuario ya está identificado.')
        }
    })
})

document.getElementById('protected').addEventListener('click', function(e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    client.get(this.getAttribute('href'), token, (response) => {
        console.log(response)
    })
})

